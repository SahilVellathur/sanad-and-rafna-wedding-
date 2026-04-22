import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Check, Volume2, VolumeX } from 'lucide-react';
import './App.css';

// --- CONFIG ---
const WEDDING_DATE = new Date('2026-05-10T16:00:00');

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.2
    }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// --- COMPONENTS ---

const FallingPetals = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPetals(prev => {
        if (prev.length < 15) {
          return [
            ...prev,
            {
              id: Math.random(),
              left: Math.random() * 100,
              duration: Math.random() * 5 + 5,
              size: Math.random() * 15 + 10,
              delay: Math.random() * 2
            }
          ];
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="petals-overlay">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animation: `fall ${petal.duration}s linear ${petal.delay}s forwards`
          }}
          onAnimationEnd={() => setPetals(prev => prev.filter(p => p.id !== petal.id))}
        />
      ))}
    </div>
  );
};

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
    <div className="glass-card">
      <motion.h2 variants={itemVariants} className="script-text" style={{ fontSize: '5.5rem', marginBottom: '1rem' }}>S & R</motion.h2>
      <motion.h1 variants={itemVariants} style={{ fontSize: '2.8rem' }}>SANAD</motion.h1>
      <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', margin: '0.5rem 0', opacity: 0.8, fontStyle: 'italic' }}>and</motion.p>
      <motion.h1 variants={itemVariants} style={{ fontSize: '2.8rem' }}>RAFNA</motion.h1>
      
      <motion.div variants={itemVariants} style={{ margin: '2.5rem 0', borderTop: '1px solid var(--royal-gold)', paddingTop: '1.5rem', opacity: 0.6 }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '8px', fontSize: '0.85rem', fontWeight: '400' }}>Wedding Reception</p>
      </motion.div>

      <Countdown />

      <motion.button variants={itemVariants} className="btn-primary" onClick={onNext}>
        Open Invitation
      </motion.button>
    </div>
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
      <motion.h2 variants={itemVariants} className="script-text" style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--royal-gold)' }}>With Love & Blessings</motion.h2>
      
      <motion.div variants={itemVariants} className="family-section">
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Groom</h3>
        <p className="script-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Mohamed Sanad</p>
        <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Son of Mr. Shamsudheen Vellathur</p>
        <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>& Mrs. Jemsheera C.P</p>
      </motion.div>

      <motion.div variants={itemVariants} style={{ margin: '1.5rem 0', opacity: 0.6, fontSize: '1.5rem' }}>✧</motion.div>

      <motion.div variants={itemVariants} className="family-section">
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>Bride</h3>
        <p className="script-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Rafna Shani</p>
        <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Daughter of Mr. Ismail</p>
        <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>& Mrs. Fathima</p>
      </motion.div>

      <motion.button variants={itemVariants} className="btn-primary" onClick={onNext}>
        Next
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
      <motion.h2 variants={itemVariants} style={{ marginBottom: '2.5rem', fontSize: '2.2rem' }}>The Celebration</motion.h2>
      
      <motion.div variants={itemVariants} className="detail-item">
        <Calendar size={22} color="var(--royal-gold)" />
        <p style={{ fontSize: '1.2rem' }}>Sunday, 10 May 2026</p>
      </motion.div>
      
      <motion.div variants={itemVariants} className="detail-item">
        <Clock size={22} color="var(--royal-gold)" />
        <p style={{ fontSize: '1.2rem' }}>4:00 PM – 8:00 PM</p>
      </motion.div>

      <motion.div variants={itemVariants} className="detail-item" style={{ alignItems: 'flex-start' }}>
        <MapPin size={22} color="var(--royal-gold)" style={{ marginTop: '5px' }} />
        <p style={{ fontSize: '1.2rem' }}>Kunhimmu Auditorium<br/><span style={{ fontSize: '0.9rem', opacity: 0.7 }}>P.C. Padi, Ezhur, Tirur</span></p>
      </motion.div>

      <motion.div variants={itemVariants} className="map-placeholder">
        <iframe 
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.634853456071!2d75.93502167504386!3d10.91533048924203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b185abdf736b%3A0xbbdee7e267492d35!2sKUNHIMMU%20AUDITORIUM!5e0!3m2!1sen!2sin" 
          width="100%" 
          height="180" 
          style={{ border: 0, borderRadius: '20px' }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </motion.div>

      <motion.button variants={itemVariants} className="btn-primary" onClick={onNext}>
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
            <div className="success-icon" style={{ background: 'var(--royal-gold)' }}><Check size={40} color="white" /></div>
            <h2 className="script-text" style={{ fontSize: '3.5rem', color: 'var(--royal-gold)' }}>{choice === 'yes' ? 'Great!' : 'Thank You'}</h2>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{choice === 'yes' ? 'We are so happy to hear that! 💖' : 'Thank you for letting us know 💕'}</p>
            <div style={{ marginTop: '3.5rem', fontSize: '1.1rem', opacity: 0.8, fontStyle: 'italic' }}>
               With love, Vellathur Family
            </div>
          </motion.div>
        ) : (
          <>
            <motion.h2 variants={itemVariants} style={{ marginBottom: '2.5rem', fontSize: '2.5rem' }}>Will you join us?</motion.h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <motion.button 
                variants={itemVariants} 
                className="btn-rsvp yes" 
                onClick={() => handleRSVP('yes')}
              >
                💖 Yes, I will attend
              </motion.button>
              <motion.button 
                variants={itemVariants} 
                className="btn-rsvp no" 
                onClick={() => handleRSVP('no')}
              >
                🌿 Sorry, I can’t attend
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
      <FallingPetals />
      
      <button className="mute-toggle" onClick={toggleMute}>
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
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
