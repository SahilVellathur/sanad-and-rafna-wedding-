import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WEDDING_DATE = new Date('2026-08-14T10:30:00');

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

const CountdownTimer = ({ targetDate }) => {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  return (
    <div className="flex gap-4 text-[#C5A059] font-montserrat">
      {[
        { label: 'Days', value: days },
        { label: 'Hours', value: hours },
        { label: 'Mins', value: minutes },
        { label: 'Secs', value: seconds }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center min-w-[50px]">
          <span className="text-2xl font-bold tabular-nums">{String(item.value).padStart(2, '0')}</span>
          <span className="text-[8px] uppercase tracking-widest opacity-60 font-bold">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// --- Shared Components ---

const GlassCard = ({ children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-white/60 backdrop-blur-lg border border-[#C5A059] rounded-3xl p-8 shadow-2xl max-w-md w-[90%] flex flex-col items-center gap-6 text-center z-10"
  >
    {children}
  </motion.div>
);

const ActionButton = ({ onClick, text, secondary = false }) => (
  <button 
    onClick={onClick}
    className={`transition-all duration-150 active:bg-[#002366] active:text-white active:shadow-[0_0_25px_rgba(255,255,255,0.9)] focus:outline-none border border-[#C5A059] px-10 py-4 rounded-full tracking-[4px] text-[10px] font-montserrat uppercase font-bold ${secondary ? 'text-[#C5A059]/60 border-[#C5A059]/30 text-[9px] px-8 py-3' : 'text-[#C5A059] bg-white/20 hover:bg-white/40'}`}
    style={{ WebkitTapHighlightColor: 'transparent' }}
  >
    {text}
  </button>
);

export default function App() {
  const [page, setPage] = useState(1);
  const [rsvpStatus, setRsvpStatus] = useState(null);

  const next = () => setPage(p => p + 1);
  const backToStart = () => {
    setPage(1);
    setRsvpStatus(null);
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4 relative overflow-hidden"
      style={{ backgroundImage: 'url(/assets/bg.png)' }}
    >
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {page === 1 && (
          <GlassCard key="page1">
            <div className="text-[#C5A059] text-3xl font-serif">﷽</div>
            <div className="text-[#C5A059] text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-playfair font-medium opacity-80 space-y-1">
              <p>Mr. & Mrs. Shamsudheen</p>
              <p className="text-[8px] opacity-60">&</p>
              <p>Mr. & Mrs. Ismail</p>
            </div>
            <h1 className="text-[#C5A059] text-4xl md:text-5xl font-bold font-playfair leading-tight">
              Sanad & Rafna
            </h1>
            <div className="w-full h-[1px] bg-[#C5A059]/20 my-2"></div>
            <CountdownTimer targetDate={WEDDING_DATE} />
            <div className="w-full h-[1px] bg-[#C5A059]/20 my-2"></div>
            <ActionButton onClick={next} text="OPEN INVITATION" />
          </GlassCard>
        )}

        {page === 2 && (
          <GlassCard key="page2">
            <h2 className="text-[#C5A059] text-3xl font-playfair font-bold">Grand Reception</h2>
            <div className="space-y-6 text-[#C5A059]">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] font-montserrat font-bold">Venue</p>
                <p className="text-xl font-playfair">Kunhimmu Auditorium</p>
                <p className="text-[10px] uppercase tracking-wider opacity-70">P.C. Padi, Ezhur, Tirur, Kerala</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] font-montserrat font-bold">Date & Time</p>
                <p className="text-xl font-playfair">Friday, August 14, 2026</p>
                <p className="text-sm font-montserrat">10:30 AM Onwards</p>
              </div>
            </div>
            <ActionButton onClick={next} text="RSVP NOW" />
          </GlassCard>
        )}

        {page === 3 && (
          <GlassCard key="page3">
            <h2 className="text-[#C5A059] text-3xl font-playfair font-bold">Will You Join Us?</h2>
            {rsvpStatus ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <p className="text-[#C5A059] font-playfair italic">Thank you for your response!</p>
                <ActionButton onClick={next} text="VIEW LOCATION" />
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <ActionButton onClick={() => setRsvpStatus('yes')} text="Yes, I will be there" />
                <ActionButton onClick={() => setRsvpStatus('no')} text="Sorry, I can't make it" secondary />
                <div className="mt-4">
                  <ActionButton onClick={next} text="SKIP TO LOCATION" secondary />
                </div>
              </div>
            )}
          </GlassCard>
        )}

        {page === 4 && (
          <GlassCard key="page4">
            <h2 className="text-[#C5A059] text-3xl font-playfair font-bold">Location Details</h2>
            <div className="w-full h-48 grayscale contrast-125 border border-[#C5A059]/30 rounded-2xl overflow-hidden mb-4">
              <iframe title="Venue" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.634853456071!2d75.93502167504386!3d10.91533048924203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b185abdf736b%3A0xbbdee7e267492d35!2sKUNHIMMU%20AUDITORIUM!5e0!3m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <a 
                href="https://maps.app.goo.gl/B4673p7R591p7uS8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <ActionButton onClick={() => {}} text="Open in Google Maps" />
              </a>
              <ActionButton onClick={() => window.location.href = 'tel:+910000000000'} text="Contact Us" secondary />
            </div>
            <button 
              onClick={backToStart}
              className="mt-6 text-[#C5A059]/60 text-[9px] uppercase tracking-[0.3em] font-montserrat hover:text-[#C5A059] transition-colors"
            >
              Back to Start
            </button>
          </GlassCard>
        )}
      </AnimatePresence>
    </div>
  );
}
