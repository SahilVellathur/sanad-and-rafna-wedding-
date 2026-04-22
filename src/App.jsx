import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Volume2, VolumeX } from 'lucide-react';
import './App.css';

// --- CONFIG ---
const WEDDING_DATE = new Date('2026-05-10T16:00:00');

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
        <div key={label} className="countdown-item">
          <span className="countdown-value">{String(value).padStart(2, '0')}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
};

// --- PAGES ---

const Page1 = ({ onNext }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="page-container"
  >
    <div className="floral-frame">
      <h2 className="cursive" style={{ fontSize: '5rem', marginBottom: '1rem' }}>S & R</h2>
      <h1 style={{ fontSize: '2rem', letterSpacing: '2px', fontWeight: '400' }}>MOHAMED SANAD</h1>
      <p style={{ margin: '0.5rem 0', fontStyle: 'italic', opacity: 0.8 }}>&</p>
      <h1 style={{ fontSize: '2rem', letterSpacing: '2px', fontWeight: '400' }}>RAFNA SHANI</h1>
      
      <div style={{ margin: '2rem 0', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1rem' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>Wedding Reception</p>
      </div>

      <Countdown />

      <button className="btn-primary" onClick={onNext}>
        💕 Open Invitation
      </button>
    </div>
  </motion.div>
);

const Page2 = ({ onNext }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    className="page-container"
  >
    <div className="glass-card">
      <h2 className="cursive" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>With Love & Blessings</h2>
      
      <div className="family-section">
        <h3 style={{ color: 'var(--accent-pink)', marginBottom: '0.2rem' }}>Groom</h3>
        <p style={{ fontSize: '1.4rem', fontWeight: '500', marginBottom: '0.5rem' }}>MOHAMED SANAD</p>
        <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Son of Mr. Shamsudheen Vellathur</p>
        <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>& Mrs. Jemsheera C.P</p>
      </div>

      <div style={{ margin: '1.5rem 0', opacity: 0.3 }}>🌸</div>

      <div className="family-section">
        <h3 style={{ color: 'var(--accent-pink)', marginBottom: '0.2rem' }}>Bride</h3>
        <p style={{ fontSize: '1.4rem', fontWeight: '500', marginBottom: '0.5rem' }}>RAFNA SHANI</p>
        <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Daughter of Mr. Ismail</p>
        <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>& Mrs. Fathima</p>
      </div>

      <button className="btn-primary" onClick={onNext}>
        👉 Next
      </button>
    </div>
  </motion.div>
);

const Page3 = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="page-container"
  >
    <div className="glass-card">
      <h2 style={{ marginBottom: '1.5rem', fontWeight: '400' }}>Wedding Details</h2>
      
      <div className="detail-item">
        <Calendar size={20} color="var(--accent-pink)" />
        <p>Sunday, 10 May 2026</p>
      </div>
      
      <div className="detail-item">
        <Clock size={20} color="var(--accent-pink)" />
        <p>4:00 PM – 8:00 PM</p>
      </div>

      <div className="detail-item" style={{ alignItems: 'flex-start' }}>
        <MapPin size={20} color="var(--accent-pink)" style={{ marginTop: '5px' }} />
        <p>Kunhimmu Auditorium<br/>P.C. Padi, Ezhur, Tirur</p>
      </div>

      <div className="map-placeholder">
        <iframe 
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.634853456071!2d75.93502167504386!3d10.91533048924203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b185abdf736b%3A0xbbdee7e267492d35!2sKUNHIMMU%20AUDITORIUM!5e0!3m2!1sen!2sin!4v1776501324162!5m2!1sen!2sin" 
          width="100%" 
          height="150" 
          style={{ border: 0, borderRadius: '15px' }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.6 }}>
        Thank you for your love and blessings!<br/>
        With love, Vellathur Family
      </div>
    </div>
  </motion.div>
);

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
        {page === 3 && <Page3 key="page3" />}
      </AnimatePresence>
      <div className="page-indicator">
        {[1, 2, 3].map(p => (
          <div key={p} className={`indicator-dot ${page === p ? 'active' : ''}`} onClick={() => setPage(p)} />
        ))}
      </div>
    </div>
  );
}
