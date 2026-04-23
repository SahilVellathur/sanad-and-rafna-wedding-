import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Volume2, VolumeX } from 'lucide-react';

const WEDDING_DATE = new Date('2026-05-10T16:00:00');

// --- Countdown Logic ---
const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

// --- Animation Components ---

const FallingPetals = () => {
  const [petalCount, setPetalCount] = useState(12);

  useEffect(() => {
    if (window.innerWidth < 768) setPetalCount(10);
  }, []);

  const petals = Array.from({ length: petalCount });
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            top: -20, 
            left: `${Math.random() * 100}%`, 
            opacity: 0,
            rotate: 0,
            scale: 0.5 + Math.random()
          }}
          animate={{ 
            top: '110vh', 
            left: `${(Math.random() * 100) + (Math.sin(i) * 20)}%`,
            opacity: [0, 0.4, 0.4, 0],
            rotate: [0, 180, 360, 540]
          }}
          transition={{ 
            duration: 15 + Math.random() * 15, 
            repeat: Infinity, 
            delay: Math.random() * 20,
            ease: "linear"
          }}
          className="absolute"
          style={{ 
            width: '8px', 
            height: '12px', 
            borderRadius: '100% 0% 100% 0%',
            backgroundColor: i % 2 === 0 ? '#F5F5DC' : '#BC987E',
            boxShadow: '0 0 5px rgba(188,152,126,0.1)'
          }}
        />
      ))}
    </div>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      staggerChildren: 0.2
    } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.5, ease: "easeIn" } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

// --- Components ---

const GlassCard = ({ children, className = "" }) => (
  <motion.div 
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(12px)' }}
    className={`border border-[#BC987E]/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl w-[92%] max-w-[380px] mx-4 flex flex-col items-center justify-center min-h-[500px] text-center z-10 my-8 ${className}`}
  >
    {children}
  </motion.div>
);

const PaginationDots = ({ current, total }) => (
  <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
    {[...Array(total)].map((_, i) => (
      <div 
        key={i} 
        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i + 1 === current ? 'bg-[#BC987E] w-4' : 'bg-white/30'}`}
      />
    ))}
  </div>
);

const MatteButton = ({ onClick, text, icon: Icon, secondary = false, className = "" }) => (
  <motion.button 
    variants={itemVariants}
    whileTap={{ scale: 0.95 }}
    animate={!secondary ? { 
      boxShadow: ["0 0 0px rgba(188,152,126,0)", "0 0 15px rgba(188,152,126,0.3)", "0 0 0px rgba(188,152,126,0)"]
    } : {}}
    transition={!secondary ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : {}}
    onClick={onClick}
    className={`${secondary ? 'border border-[#BC987E] text-[#BC987E]' : 'bg-[#BC987E] text-white shadow-md'} w-full py-4 rounded-full font-montserrat text-[10px] font-bold tracking-[0.4em] uppercase active:bg-[#FFFDF5] active:text-[#D4AF37] active:shadow-[0_0_20px_#D4AF37] transition-all flex items-center justify-center gap-2 touch-manipulation ${className}`}
    style={{ WebkitTapHighlightColor: 'transparent' }}
  >
    {text} {Icon && <Icon size={14} className={text.includes('Yes') ? 'fill-white' : ''} />}
  </motion.button>
);

export default function App() {
  const [page, setPage] = useState(1);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const timeLeft = useCountdown(WEDDING_DATE);
  const audioRef = useRef(null);

  // Handle visibility change to pause/resume music
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current || !audioStarted) return;

      if (document.hidden) {
        audioRef.current.pause();
      } else {
        // Only resume if it was playing and not muted by user
        if (!isMuted) {
          audioRef.current.play().catch(e => console.log("Resume blocked", e));
        }
      }
    };

    const handlePageShowHide = (e) => {
      if (!audioRef.current || !audioStarted) return;
      if (e.type === 'pagehide') {
        audioRef.current.pause();
      } else if (e.type === 'pageshow' && !document.hidden && !isMuted) {
        audioRef.current.play().catch(e => console.log("Resume blocked", e));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageShowHide);
    window.addEventListener('pageshow', handlePageShowHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageShowHide);
      window.removeEventListener('pageshow', handlePageShowHide);
    };
  }, [audioStarted, isMuted]);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setAudioStarted(true))
        .catch(e => console.log("Audio play blocked", e));
    }
  };

  const next = () => {
    if (page === 1) {
      playMusic();
    }
    setPage(p => Math.min(p + 1, 4));
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (!newMuted) {
        audioRef.current.play().catch(e => console.log("Play blocked", e));
      }
    }
  };

  return (
    <div 
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-cover bg-center p-4 relative overflow-hidden"
      style={{ backgroundImage: 'url(/assets/bg.png)' }}
    >
      <div className="absolute inset-0 bg-black/[0.03] pointer-events-none"></div>
      
      {/* Background Music */}
      <audio 
        ref={audioRef}
        src="/assets/wedding-nasheed.mp3"
        loop
        autoPlay={false}
      />

      {/* Audio Toggle UI */}
      <button 
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/20 backdrop-blur-md border border-[#BC987E]/30 text-[#BC987E] shadow-lg active:bg-[#FFFDF5] active:text-[#D4AF37] active:shadow-[0_0_20px_#D4AF37] active:scale-95 transition-all touch-manipulation"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <FallingPetals />

      <AnimatePresence mode="wait">
        {/* Page 1: Landing */}
        {page === 1 && (
          <GlassCard key="p1" className="gap-y-6">
            <motion.div variants={itemVariants} className="text-[#BC987E] text-xl md:text-2xl font-serif">﷽</motion.div>
            <motion.div variants={itemVariants} className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 flex items-center justify-center shadow-inner border border-[#BC987E]/20">
              <span className="text-[#BC987E] font-playfair text-2xl md:text-3xl font-bold tracking-tighter">S & R</span>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-[#2D2D2D] font-playfair text-2xl md:text-3xl font-bold leading-tight">
                Mohamed Sanad <br/> & <br/> Rafna Shani
              </h1>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-4 text-[#BC987E] font-montserrat font-bold">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hrs', val: timeLeft.hours },
                { label: 'Min', val: timeLeft.minutes },
                { label: 'Sec', val: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center min-w-[40px]">
                  <span className="text-xl md:text-2xl tabular-nums">{String(item.val).padStart(2, '0')}</span>
                  <span className="text-[7px] uppercase tracking-widest opacity-60">{item.label}</span>
                </div>
              ))}
            </motion.div>
            <MatteButton onClick={next} text="Open Invitation" icon={Heart} />
          </GlassCard>
        )}

        {/* Page 2: Family Details */}
        {page === 2 && (
          <GlassCard key="p2" className="gap-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-[#BC987E] font-playfair text-xl md:text-2xl font-bold uppercase tracking-[0.3em]">With Love & Blessings</h2>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6 md:space-y-8 w-full px-4">
              <div className="space-y-1">
                <p className="text-[#BC987E]/60 text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-bold font-montserrat">The Groom Side</p>
                <div className="text-[#2D2D2D] font-playfair">
                  <p className="text-lg md:text-xl font-bold">Mohamed Sanad</p>
                  <p className="text-[10px] md:text-xs font-montserrat opacity-70 mt-1 leading-relaxed">Son of Mr. Shamsudheen Vellathur <br/> & Mrs. Jemsheera C.P</p>
                </div>
              </div>
              <div className="text-[#BC987E] font-dancing text-xl md:text-2xl opacity-40">&</div>
              <div className="space-y-1">
                <p className="text-[#BC987E]/60 text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-bold font-montserrat">The Bride Side</p>
                <div className="text-[#2D2D2D] font-playfair">
                  <p className="text-lg md:text-xl font-bold">Rafna Shani</p>
                  <p className="text-[10px] md:text-xs font-montserrat opacity-70 mt-1 leading-relaxed">Daughter of Mr. Ismail <br/> & Mrs. Fathima</p>
                </div>
              </div>
            </motion.div>
            <MatteButton onClick={next} text="Next 👉" />
          </GlassCard>
        )}

        {/* Page 3: Event Details */}
        {page === 3 && (
          <GlassCard key="p3" className="gap-y-6">
            <motion.div variants={itemVariants} className="mt-2">
              <h2 className="text-[#BC987E] font-playfair text-xl md:text-2xl font-bold uppercase tracking-[0.3em]">Wedding Details</h2>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-5 w-full px-4">
              <div className="bg-white/10 py-4 px-2 rounded-2xl border border-[#BC987E]/10 shadow-sm mx-auto max-w-[280px]">
                <p className="text-[#2D2D2D] font-bold text-lg md:text-xl font-playfair">Sunday, 10 May 2026</p>
                <p className="text-[9px] md:text-[10px] tracking-[0.3em] opacity-60 text-[#2D2D2D] font-montserrat uppercase mt-1">4:00 PM - 8:00 PM</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#BC987E] font-bold uppercase text-[8px] md:text-[9px] tracking-[0.5em] font-montserrat">Venue</p>
                <p className="font-playfair text-lg md:text-xl text-[#2D2D2D] font-bold">Kunhimmu Auditorium</p>
                <p className="text-xs md:text-[10px] opacity-70 text-[#2D2D2D] font-montserrat uppercase tracking-wider">P.C. Padi, Ezhur, Tirur, Kerala</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="w-[95%] h-[120px] md:h-36 rounded-2xl overflow-hidden border border-[#BC987E]/10 shadow-md">
              <iframe 
                title="Venue" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.634853456071!2d75.93502167504386!3d10.91533048924203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b185abdf736b%3A0xbbdee7e267492d35!2sKUNHIMMU%20AUDITORIUM!5e0!3m2!1sen!2sin" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              ></iframe>
            </motion.div>
            <MatteButton onClick={next} text="Continue" className="mt-4" />
          </GlassCard>
        )}

        {/* Page 4: RSVP */}
        {page === 4 && (
          <GlassCard key="p4" className="gap-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-[#BC987E] font-playfair text-xl md:text-2xl font-bold uppercase tracking-[0.3em]">Will you join us?</h2>
            </motion.div>
            {rsvpStatus ? (
              <motion.div variants={itemVariants} className="space-y-8 w-full px-4">
                <div className="bg-white/10 p-8 rounded-3xl border border-[#BC987E]/10 shadow-md">
                  <Heart className="text-[#BC987E] mx-auto mb-4 opacity-50" size={40} fill="#BC987E" />
                  <p className="text-[#2D2D2D] font-playfair text-lg leading-relaxed font-medium">
                    Thank you for letting us know. <br/>
                    <span className="text-[#BC987E] italic font-bold mt-2 block">With Love, Vellathur Family</span>
                  </p>
                </div>
                <button onClick={() => setPage(1)} className="text-[#BC987E] text-[10px] uppercase tracking-[0.5em] font-bold font-montserrat hover:text-[#2D2D2D] active:bg-[#FFFDF5] active:text-[#D4AF37] active:shadow-[0_0_20px_#D4AF37] transition-colors touch-manipulation" style={{ WebkitTapHighlightColor: 'transparent' }}>Restart</button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-5 w-full px-4">
                <MatteButton onClick={() => { playMusic(); setRsvpStatus('yes'); }} text="Yes, I will attend" icon={Heart} />
                <MatteButton onClick={() => { playMusic(); setRsvpStatus('no'); }} text="Sorry, I can't attend" icon={X} secondary />
              </div>
            )}
          </GlassCard>
        )}
      </AnimatePresence>

      <PaginationDots current={page} total={4} />
    </div>
  );
}
