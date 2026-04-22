import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Check, Volume2, VolumeX } from 'lucide-react';
import './App.css';

// --- CONFIG ---
const WEDDING_DATE = new Date('2026-08-14T10:30:00');

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 1.5, 
      staggerChildren: 0.4
    }
  },
  exit: { opacity: 0, transition: { duration: 0.6 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
};

// --- COMPONENTS ---

const Bismillah = () => (
  <motion.div variants={itemVariants} className="bismillah-wrapper">
    <div className="bismillah-arabic">﷽</div>
    <div className="bismillah-translation">With the blessings of Almighty Allah</div>
  </motion.div>
);

const ArchFrame = () => (
  <div className="arch-frame">
    <svg viewBox="0 0 100 150" className="arch-svg" preserveAspectRatio="none">
      {/* Outer Main Arch */}
      <path d="M0,150 L0,50 Q0,0 50,0 Q100,0 100,50 L100,150" stroke="var(--gold)" strokeWidth="0.5" />
      {/* Decorative Inner Arch */}
      <path d="M10,150 L10,60 Q10,25 50,25 Q90,25 90,60 L90,150" stroke="var(--gold)" strokeWidth="0.3" opacity="0.4" />
      {/* Ornamental Mughal Points */}
      <path d="M48,0 L50,-2 L52,0 M0,48 L-2,50 L0,52 M100,48 L102,50 L100,52" stroke="var(--gold)" strokeWidth="0.5" opacity="0.6" />
      {/* Arabesque / Floral Patterns (Aniconic) */}
      <path d="M45,10 Q50,5 55,10" stroke="var(--gold)" strokeWidth="0.2" opacity="0.3" />
      <circle cx="50" cy="15" r="1.5" fill="var(--gold)" opacity="0.2" />
    </svg>
  </div>
);

const HangingLanterns = () => (
  <div className="lantern-container">
    {[1, 2].map((i) => (
      <div key={i} className="lantern">
        <svg viewBox="0 0 50 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="25" y1="0" x2="25" y2="40" stroke="var(--gold)" strokeWidth="1" />
          <path d="M15 40H35L45 65L25 95L5 65L15 40Z" fill="var(--gold)" fillOpacity="0.1" stroke="var(--gold)" strokeWidth="1" />
          <path d="M15 40L25 65L35 40" stroke="var(--gold)" strokeWidth="0.5" />
          <path d="M5 65L25 95L45 65" stroke="var(--gold)" strokeWidth="0.5" />
          <circle cx="25" cy="65" r="5" fill="var(--gold)" fillOpacity="0.9">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <line x1="25" y1="105" x2="25" y2="120" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" />
        </svg>
      </div>
    ))}
  </div>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = WEDDING_DATE - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      {Object.entries(timeLeft).map(([label, value]) => (
        <motion.div key={label} variants={itemVariants} className="countdown-item">
          <span className="countdown-value">{String(value).padStart(2, '0')}</span>
          <span className="countdown-label">{label}</span>
        </motion.div>
      ))}
    </div>
  );
};

// --- PAGES ---

const Page1 = ({ onNext }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="page-container"
  >
    <Bismillah />
    
    <motion.p variants={itemVariants} className="invitation-text">
      Mr. & Mrs. request the pleasure of your company<br/>
      at the Marriage of their son
    </motion.p>
    
    <motion.h1 variants={itemVariants} className="couple-names">
      Sanad & Rafna
    </motion.h1>
    
    <motion.div variants={itemVariants} style={{ margin: '2.5rem 0' }}>
      <p className="detail-text" style={{ marginBottom: '0.8rem' }}>The Nikah, Insha'Allah, will be solemnized on</p>
      <p className="date-text">FRIDAY | 14 | AUGUST</p>
    </motion.div>

    <Countdown />

    <motion.button 
      variants={itemVariants} 
      className="btn-plaque" 
      onClick={onNext}
    >
      Open Invitation
    </motion.button>
  </motion.div>
);

const Page2 = ({ onNext }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="page-container"
  >
    <div className="glass-card">
      <motion.h2 variants={itemVariants} style={{ marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '6px' }}>Family Blessings</motion.h2>
      
      <motion.div variants={itemVariants} style={{ marginBottom: '3rem' }}>
        <p className="detail-text" style={{ marginBottom: '0.5rem', opacity: 0.6 }}>The Groom's Parents</p>
        <p style={{ fontSize: '1.8rem', color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>Mr. Shamsudheen & Mrs. Jemsheera</p>
      </motion.div>

      <motion.div variants={itemVariants} style={{ margin: '2rem 0', opacity: 0.2 }}>
        <svg width="100" height="1" viewBox="0 0 100 1">
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="var(--gold)" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <motion.div variants={itemVariants} style={{ marginBottom: '3rem' }}>
        <p className="detail-text" style={{ marginBottom: '0.5rem', opacity: 0.6 }}>The Bride's Parents</p>
        <p style={{ fontSize: '1.8rem', color: 'var(--gold)', fontFamily: 'var(--font-heading)' }}>Mr. Ismail & Mrs. Fathima</p>
      </motion.div>

      <motion.button variants={itemVariants} className="btn-plaque" onClick={onNext}>
        Next Details
      </motion.button>
    </div>
  </motion.div>
);

const Page3 = ({ onNext }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="page-container"
  >
    <div className="glass-card">
      <motion.h2 variants={itemVariants} style={{ marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Wedding Celebration</motion.h2>
      
      <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', textAlign: 'left' }}>
        <Calendar size={24} color="var(--gold)" />
        <div>
          <p className="detail-text" style={{ color: 'var(--gold)', fontWeight: '700' }}>FRIDAY | 14 | AUGUST 2026</p>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', textAlign: 'left' }}>
        <Clock size={24} color="var(--gold)" />
        <div>
          <p className="detail-text">Nikah: 10:30 AM</p>
          <p className="detail-text">Reception: 4:00 PM</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2.5rem', textAlign: 'left' }}>
        <MapPin size={24} color="var(--gold)" style={{ marginTop: '4px' }} />
        <div>
          <p className="detail-text" style={{ color: 'var(--gold)', fontWeight: '700' }}>Kunhimmu Auditorium</p>
          <p className="detail-text" style={{ textTransform: 'none', opacity: 0.7 }}>P.C. Padi, Ezhur, Tirur</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} style={{ width: '100%', height: '180px', border: '1px solid var(--gold)', overflow: 'hidden', marginBottom: '2.5rem' }}>
        <iframe 
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.634853456071!2d75.93502167504386!3d10.91533048924203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b185abdf736b%3A0xbbdee7e267492d35!2sKUNHIMMU%20AUDITORIUM!5e0!3m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(1) invert(1) brightness(0.8)' }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </motion.div>

      <motion.button variants={itemVariants} className="btn-plaque" onClick={onNext}>
        Continue
      </motion.button>
    </div>
  </motion.div>
);

const Page4 = () => {
  const [submitted, setSubmitted] = useState(false);
  const [choice, setChoice] = useState(null);

  const handleRSVP = (attending) => {
    setChoice(attending);
    setSubmitted(true);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="page-container"
    >
      <div className="glass-card">
        {submitted ? (
          <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
              <Check size={48} color="var(--gold)" />
            </div>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '1.5rem' }}>{choice === 'yes' ? 'Alhamdulillah!' : 'Thank You'}</h2>
            <p className="invitation-text" style={{ marginBottom: '3rem' }}>{choice === 'yes' ? 'We look forward to celebrating with you! ✨' : 'Thank you for your response. 🙏'}</p>
            <div style={{ marginTop: '2rem', fontSize: '0.9rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8 }}>
               With love, Vellathur Family
            </div>
          </motion.div>
        ) : (
          <>
            <motion.h2 variants={itemVariants} style={{ marginBottom: '3.5rem', fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Will you join us?</motion.h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', alignItems: 'center' }}>
              <motion.button 
                variants={itemVariants} 
                className="btn-rsvp" 
                onClick={() => handleRSVP('yes')}
              >
                Yes, I will attend
              </motion.button>
              <motion.button 
                variants={itemVariants} 
                className="btn-rsvp" 
                onClick={() => handleRSVP('no')}
                style={{ opacity: 0.6 }}
              >
                Sorry, I can’t attend
              </motion.button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [page, setPage] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleNext = () => {
    if (page === 1) startMusic();
    setPage(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <audio ref={audioRef} src="/wedding-nasheed.mp3" loop />
      
      <ArchFrame />
      <HangingLanterns />
      
      <button className="mute-toggle" onClick={toggleMute}>
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <AnimatePresence mode="wait">
        {page === 1 && <Page1 key="page1" onNext={handleNext} />}
        {page === 2 && <Page2 key="page2" onNext={handleNext} />}
        {page === 3 && <Page3 key="page3" onNext={handleNext} />}
        {page === 4 && <Page4 key="page4" />}
      </AnimatePresence>

      <div className="page-indicator">
        {[1, 2, 3, 4].map(p => (
          <div 
            key={p} 
            className={`indicator-dot ${page === p ? 'active' : ''}`}
            onClick={() => setPage(p)}
          />
        ))}
      </div>
    </div>
  );
}
