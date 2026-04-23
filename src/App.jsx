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

export default function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FAF9F6] p-4 selection:bg-[#C5A059]/30">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="bg-white/70 backdrop-blur-md border border-[#C5A059] rounded-3xl p-8 shadow-2xl max-w-md w-full flex flex-col items-center gap-6 text-center"
      >
        {/* 1. Bismillah */}
        <div className="text-[#C5A059] text-3xl font-serif">﷽</div>
        
        {/* 2. Parents' Names */}
        <div className="text-[#C5A059] text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-playfair font-medium opacity-80 space-y-1">
          <p>Mr. & Mrs. Shamsudheen</p>
          <p className="text-[8px] opacity-60">&</p>
          <p>Mr. & Mrs. Ismail</p>
        </div>
        
        {/* 3. The Couple */}
        <h1 className="text-[#C5A059] text-5xl md:text-6xl font-bold font-playfair leading-tight">
          Sanad & Rafna
        </h1>
        
        {/* 4. The Event */}
        <div className="space-y-2">
          <p className="text-[#C5A059] text-[11px] md:text-xs tracking-[0.5em] uppercase font-montserrat font-bold">
            GRAND RECEPTION
          </p>
          <p className="text-[#C5A059]/60 text-[10px] font-montserrat tracking-[0.2em] uppercase">
            August 14, 2026
          </p>
        </div>

        {/* 5. Live Countdown */}
        <div className="w-full h-[1px] bg-[#C5A059]/20 my-2"></div>
        <CountdownTimer targetDate={WEDDING_DATE} />
        <div className="w-full h-[1px] bg-[#C5A059]/20 my-2"></div>
        
        {/* 6. The Button */}
        <button 
          className="transition-all duration-150 active:bg-[#002366] active:text-white active:shadow-[0_0_25px_rgba(255,255,255,0.9)] focus:outline-none border border-[#C5A059] text-[#C5A059] px-12 py-4 rounded-full tracking-[4px] text-[10px] font-montserrat uppercase font-bold bg-transparent"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          OPEN INVITATION
        </button>
      </motion.div>
    </div>
  );
}
