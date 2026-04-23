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
    className={`bg-white/70 backdrop-blur-md border border-white/50 rounded-[2.5rem] p-8 shadow-xl max-w-md w-[90%] flex flex-col items-center gap-6 text-center z-10 ${className}`}
  >
    {children}
  </motion.div>
);

const PaginationDots = ({ current, total }) => (
  <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
    {[...Array(total)].map((_, i) => (
      <div 
        key={i} 
        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i + 1 === current ? 'bg-soft-pink w-4' : 'bg-soft-pink/20'}`}
      />
    ))}
  </div>
);

export default function App() {
  const [page, setPage] = useState(1);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const timeLeft = useCountdown(WEDDING_DATE);

  const next = () => setPage(p => Math.min(p + 1, 4));
  const back = () => setPage(p => Math.max(p - 1, 1));

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center p-4 relative overflow-hidden"
      style={{ backgroundImage: 'url(/assets/bg.png)' }}
    >
      <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>

      <AnimatePresence mode="wait">
        {/* Page 1: Landing */}
        {page === 1 && (
          <GlassCard key="p1">
            <div className="text-gold text-2xl font-serif">﷽</div>
            <div className="w-20 h-20 rounded-full bg-soft-pink flex items-center justify-center shadow-lg border-2 border-white/50">
              <span className="text-white font-playfair text-2xl font-bold">S & R</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-black font-playfair text-3xl md:text-4xl font-bold leading-tight">
                Mohamed Sanad <br/> & <br/> Rafna Shani
              </h1>
            </div>
            <div className="flex gap-4 text-gold font-montserrat">
              {[
                { label: 'Days', val: timeLeft.days },
                { label: 'Hrs', val: timeLeft.hours },
                { label: 'Min', val: timeLeft.minutes },
                { label: 'Sec', val: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center min-w-[45px]">
                  <span className="text-xl font-bold tabular-nums">{String(item.val).padStart(2, '0')}</span>
                  <span className="text-[7px] uppercase tracking-widest opacity-60 font-bold">{item.label}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={next}
              className="mt-4 flex items-center gap-2 bg-soft-pink text-white px-8 py-3 rounded-full font-montserrat text-xs font-bold tracking-widest shadow-lg active:bg-[#002366] active:shadow-[0_0_20px_#fff] transition-all"
            >
              OPEN INVITATION <Heart size={14} fill="white" />
            </button>
          </GlassCard>
        )}

        {/* Page 2: Family Details */}
        {page === 2 && (
          <GlassCard key="p2">
            <h2 className="text-soft-pink font-dancing text-4xl mb-4">With Love & Blessings</h2>
            <div className="space-y-8 w-full">
              <div className="space-y-2">
                <p className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">The Groom Side</p>
                <div className="text-black font-playfair text-base">
                  <p className="font-bold">Mohamed Sanad</p>
                  <p className="text-xs opacity-70 italic mt-1">Son of Mr. Shamsudheen Vellathur <br/> & Mrs. Jemsheera C.P</p>
                </div>
              </div>
              <div className="text-soft-pink font-dancing text-2xl">&</div>
              <div className="space-y-2">
                <p className="text-gold text-[10px] uppercase tracking-[0.2em] font-bold">The Bride Side</p>
                <div className="text-black font-playfair text-base">
                  <p className="font-bold">Rafna Shani</p>
                  <p className="text-xs opacity-70 italic mt-1">Daughter of Mr. Ismail <br/> & Mrs. Fathima</p>
                </div>
              </div>
            </div>
            <button 
              onClick={next}
              className="mt-6 flex items-center gap-2 bg-soft-pink text-white px-10 py-3 rounded-full font-montserrat text-xs font-bold tracking-widest shadow-lg active:bg-[#002366] transition-all"
            >
              NEXT 👉
            </button>
          </GlassCard>
        )}

        {/* Page 3: Event Details */}
        {page === 3 && (
          <GlassCard key="p3" className="min-h-[480px] justify-between py-10 px-6">
            <div className="w-full">
              <h2 className="text-gold font-playfair text-2xl font-bold uppercase tracking-[0.2em] mb-8">Wedding Details</h2>
              <div className="space-y-6 w-full">
                <div className="bg-soft-pink/10 p-4 rounded-2xl border border-soft-pink/20">
                  <p className="text-soft-pink font-bold text-xl font-playfair">Sunday, 10 May 2026</p>
                  <p className="text-[10px] tracking-[0.2em] opacity-70 text-black uppercase mt-1">4:00 PM - 8:00 PM</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gold font-bold uppercase text-[10px] tracking-[0.3em]">Venue</p>
                  <p className="font-playfair text-xl text-black font-bold">Kunhimmu Auditorium</p>
                  <p className="text-[9px] opacity-60 text-black font-montserrat uppercase tracking-wider">P.C. Padi, Ezhur, Tirur, Kerala</p>
                </div>
              </div>
            </div>
            
            <div className="w-full h-44 rounded-[15px] overflow-hidden border border-gold/20 shadow-md my-4">
              <iframe 
                title="Venue" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.634853456071!2d75.93502167504386!3d10.91533048924203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b185abdf736b%3A0xbbdee7e267492d35!2sKUNHIMMU%20AUDITORIUM!5e0!3m2!1sen!2sin" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              ></iframe>
            </div>

            <button 
              onClick={next}
              className="bg-soft-pink text-white w-full py-4 rounded-full font-montserrat text-[10px] font-bold tracking-[0.3em] shadow-lg active:bg-[#002366] transition-all"
            >
              CONTINUE
            </button>
          </GlassCard>
        )}

        {/* Page 4: RSVP */}
        {page === 4 && (
          <GlassCard key="p4">
            <h2 className="text-soft-pink font-playfair text-3xl font-bold">Will you join us?</h2>
            {rsvpStatus ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="bg-soft-pink/10 p-6 rounded-3xl border border-soft-pink/20">
                  <Heart className="text-soft-pink mx-auto mb-4" size={40} fill="#E195AB" />
                  <p className="text-black font-playfair text-lg leading-relaxed">
                    Thank you for letting us know. <br/>
                    <span className="text-soft-pink italic font-bold">With Love, Vellathur Family</span>
                  </p>
                </div>
                <button onClick={() => setPage(1)} className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">Restart</button>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4 w-full">
                <button 
                  onClick={() => setRsvpStatus('yes')}
                  className="w-full flex items-center justify-center gap-3 bg-soft-pink text-white py-4 rounded-full font-montserrat text-xs font-bold tracking-widest shadow-lg active:bg-[#002366] transition-all"
                >
                  YES, I WILL ATTEND <Heart size={16} fill="white" />
                </button>
                <button 
                  onClick={() => setRsvpStatus('no')}
                  className="w-full flex items-center justify-center gap-3 border border-soft-pink text-soft-pink py-4 rounded-full font-montserrat text-xs font-bold tracking-widest active:bg-[#002366] active:text-white transition-all"
                >
                  SORRY, I CAN'T ATTEND <X size={16} />
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
