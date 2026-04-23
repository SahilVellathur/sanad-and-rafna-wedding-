import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ChevronRight } from 'lucide-react';

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

// --- Components ---

const GlassCard = ({ children, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(12px)' }}
    className={`border-2 border-[#E5D9B6] rounded-[2.5rem] p-10 shadow-2xl max-w-md w-[90%] flex flex-col items-center justify-around min-h-[500px] text-center z-10 ${className}`}
  >
    {children}
  </motion.div>
);

const PaginationDots = ({ current, total }) => (
  <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
    {[...Array(total)].map((_, i) => (
      <div 
        key={i} 
        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i + 1 === current ? 'bg-[#D4AF37] w-4' : 'bg-white/30'}`}
      />
    ))}
  </div>
);

const MainButton = ({ onClick, text, icon: Icon }) => (
  <button 
    onClick={onClick}
    className="bg-[#D4AF37] text-white w-full py-4 rounded-full font-montserrat text-[11px] font-bold tracking-[0.3em] uppercase shadow-lg active:bg-[#002366] active:shadow-[0_0_20px_rgba(0,35,102,0.6)] transition-all flex items-center justify-center gap-2"
    style={{ WebkitTapHighlightColor: 'transparent' }}
  >
    {text} {Icon && <Icon size={14} className={text.includes('Yes') ? 'fill-white' : ''} />}
  </button>
);

export default function App() {
  const [page, setPage] = useState(1);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const timeLeft = useCountdown(WEDDING_DATE);

  const next = () => setPage(p => Math.min(p + 1, 4));

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4 relative overflow-hidden"
      style={{ backgroundImage: 'url(/assets/bg.png)' }}
    >
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {/* Page 1: Landing */}
        {page === 1 && (
          <GlassCard key="p1">
            <div className="text-[#D4AF37] text-2xl font-serif">﷽</div>
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center shadow-inner border border-[#E5D9B6]">
              <span className="text-[#D4AF37] font-playfair text-3xl font-bold tracking-tighter">S & R</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-black font-playfair text-3xl md:text-4xl font-bold leading-tight">
                Mohamed Sanad <br/> & <br/> Rafna Shani
              </h1>
            </div>
            <div className="flex gap-4 text-[#D4AF37] font-montserrat font-bold">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hrs', val: timeLeft.hours },
                { label: 'Min', val: timeLeft.minutes },
                { label: 'Sec', val: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center min-w-[45px]">
                  <span className="text-2xl tabular-nums">{String(item.val).padStart(2, '0')}</span>
                  <span className="text-[7px] uppercase tracking-widest opacity-60">{item.label}</span>
                </div>
              ))}
            </div>
            <MainButton onClick={next} text="Open Invitation" icon={Heart} />
          </GlassCard>
        )}

        {/* Page 2: Family Details */}
        {page === 2 && (
          <GlassCard key="p2">
            <h2 className="text-[#D4AF37] font-playfair text-3xl font-bold uppercase tracking-widest">With Love & Blessings</h2>
            <div className="space-y-8 w-full px-4">
              <div className="space-y-1">
                <p className="text-[#D4AF37]/60 text-[9px] uppercase tracking-[0.3em] font-bold font-montserrat">The Groom Side</p>
                <div className="text-black font-playfair">
                  <p className="text-xl font-bold">Mohamed Sanad</p>
                  <p className="text-xs font-montserrat opacity-70 mt-1">Son of Mr. Shamsudheen Vellathur <br/> & Mrs. Jemsheera C.P</p>
                </div>
              </div>
              <div className="text-[#D4AF37] font-dancing text-2xl">&</div>
              <div className="space-y-1">
                <p className="text-[#D4AF37]/60 text-[9px] uppercase tracking-[0.3em] font-bold font-montserrat">The Bride Side</p>
                <div className="text-black font-playfair">
                  <p className="text-xl font-bold">Rafna Shani</p>
                  <p className="text-xs font-montserrat opacity-70 mt-1">Daughter of Mr. Ismail <br/> & Mrs. Fathima</p>
                </div>
              </div>
            </div>
            <MainButton onClick={next} text="Next 👉" />
          </GlassCard>
        )}

        {/* Page 3: Event Details */}
        {page === 3 && (
          <GlassCard key="p3">
            <h2 className="text-[#D4AF37] font-playfair text-3xl font-bold uppercase tracking-widest">Wedding Details</h2>
            <div className="space-y-6 w-full px-4">
              <div className="bg-white/30 p-5 rounded-2xl border border-[#E5D9B6] shadow-sm">
                <p className="text-black font-bold text-xl font-playfair">Sunday, 10 May 2026</p>
                <p className="text-[10px] tracking-[0.2em] opacity-70 text-black font-montserrat uppercase mt-1">4:00 PM - 8:00 PM</p>
              </div>
              <div className="space-y-1">
                <p className="text-[#D4AF37] font-bold uppercase text-[9px] tracking-[0.4em] font-montserrat">Venue</p>
                <p className="font-playfair text-xl text-black font-bold">Kunhimmu Auditorium</p>
                <p className="text-[10px] opacity-70 text-black font-montserrat uppercase tracking-wider">P.C. Padi, Ezhur, Tirur, Kerala</p>
              </div>
            </div>
            <div className="w-[95%] h-40 rounded-2xl overflow-hidden border border-[#E5D9B6]/50 shadow-md">
              <iframe 
                title="Venue" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.634853456071!2d75.93502167504386!3d10.91533048924203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b185abdf736b%3A0xbbdee7e267492d35!2sKUNHIMMU%20AUDITORIUM!5e0!3m2!1sen!2sin" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              ></iframe>
            </div>
            <MainButton onClick={next} text="Continue" />
          </GlassCard>
        )}

        {/* Page 4: RSVP */}
        {page === 4 && (
          <GlassCard key="p4">
            <h2 className="text-[#D4AF37] font-playfair text-3xl font-bold uppercase tracking-widest">Will you join us?</h2>
            {rsvpStatus ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 w-full px-4">
                <div className="bg-white/30 p-8 rounded-3xl border border-[#E5D9B6] shadow-md">
                  <Heart className="text-[#D4AF37] mx-auto mb-4" size={40} fill="#D4AF37" />
                  <p className="text-black font-playfair text-lg leading-relaxed font-medium">
                    Thank you for letting us know. <br/>
                    <span className="text-[#D4AF37] italic font-bold">With Love, Vellathur Family</span>
                  </p>
                </div>
                <button onClick={() => setPage(1)} className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] font-bold font-montserrat hover:text-black transition-colors">Restart</button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-5 w-full px-4">
                <MainButton onClick={() => setRsvpStatus('yes')} text="Yes, I will attend" icon={Heart} />
                <button 
                  onClick={() => setRsvpStatus('no')}
                  className="w-full py-4 border-2 border-[#E5D9B6] text-[#D4AF37] rounded-full font-montserrat text-[11px] font-bold tracking-[0.3em] uppercase active:bg-[#002366] active:text-white transition-all flex items-center justify-center gap-2"
                >
                  Sorry, I can't attend <X size={14} />
                </button>
              </div>
            )}
          </GlassCard>
        )}
      </AnimatePresence>

      <PaginationDots current={page} total={4} />
    </div>
  );
}
