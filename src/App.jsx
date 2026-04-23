import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Check, Volume2, VolumeX, Heart, Info, Send, ChevronRight } from 'lucide-react';

const WEDDING_DATE = new Date('2026-08-14T10:30:00');

// --- Custom Components ---

const Section = ({ children, className = "" }) => (
  <section className={`min-h-screen flex flex-col items-center justify-center p-6 ${className}`}>
    {children}
  </section>
);

const AnimatedText = ({ text, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay, ease: "easeOut" }}
    className={className}
  >
    {text}
  </motion.div>
);

const NextButton = ({ onClick, text = "NEXT" }) => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.5 }}
    onClick={onClick}
    className="royal-btn-feedback mt-12 border border-gold/40 text-gold/60 px-8 py-3 rounded-sm tracking-[4px] text-[10px] font-montserrat hover:border-gold hover:text-gold transition-all duration-500 flex items-center gap-2"
  >
    {text} <ChevronRight size={14} />
  </motion.button>
);

// --- Page Components ---

const StationeryLanding = ({ onOpen }) => (
  <div className="flex flex-col items-center justify-center min-h-screen w-full text-center p-6 bg-[#FAF9F6] font-playfair">
    {/* 1. Bismillah */}
    <div className="text-[#D4AF37] text-4xl mb-10 font-serif">﷽</div>
    
    {/* 2. S & R Monogram */}
    <div className="text-[#D4AF37] text-xl tracking-[0.6em] mb-4 uppercase opacity-80">
      S & R
    </div>
    
    {/* 3. Sanad & Rafna */}
    <h1 className="text-[#D4AF37] text-5xl md:text-7xl font-bold mb-8 leading-tight">
      Sanad & Rafna
    </h1>
    
    {/* 4. Wedding Invitation */}
    <p className="text-[#D4AF37]/70 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-20 font-montserrat">
      Wedding Invitation
    </p>
    
    {/* 5. OPEN INVITATION Button */}
    <button 
      onClick={onOpen}
      className="transition-all duration-100 active:bg-[#002366] active:text-white active:shadow-[0_0_25px_rgba(255,255,255,0.9)] focus:outline-none border border-[#D4AF37] text-[#D4AF37] px-12 py-4 rounded-full tracking-[4px] text-[10px] font-montserrat uppercase font-bold"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      OPEN INVITATION
    </button>
  </div>
);

const Hero = ({ onNext }) => (
  <Section className="bg-imperial-navy">
    <div className="text-center">
      <div className="mb-8 gold-embossed text-6xl md:text-8xl">S & R</div>
      <AnimatedText text="SAVE THE DATE" className="text-gold tracking-[0.5em] text-sm mb-4 font-inter font-light" />
      <AnimatedText text="FOR THE WEDDING OF" className="text-white/40 tracking-[0.3em] text-[10px] mb-8" delay={0.4} />
      <AnimatedText text="Sanad & Rafna" className="font-playfair text-4xl md:text-6xl text-white font-light tracking-wide mb-8" delay={0.8} />
      <AnimatedText text="AUGUST 14, 2026" className="text-gold tracking-[0.2em] font-bodoni text-lg" delay={1.2} />
      <NextButton onClick={onNext} />
    </div>
  </Section>
);

const InvitationCard = ({ onNext }) => (
  <Section className="bg-imperial-navy">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      className="max-w-2xl w-full"
    >
      <div className="relative p-1 border border-gold">
        <div className="bg-parchment text-charcoal p-10 md:p-20 shadow-soft text-center border border-gold">
          <div className="mb-6 text-gold text-2xl">﷽</div>
          <p className="font-playfair italic text-lg mb-8 opacity-80">With the blessings of Almighty Allah, we cordially invite you to celebrate the wedding of our children</p>
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-widest text-gold mb-2 uppercase font-montserrat">The Groom</p>
              <h3 className="font-bodoni text-3xl">Mohamed Sanad</h3>
              <p className="text-xs mt-1 opacity-60">Son of Mr. Shamsudheen & Mrs. Jemsheera</p>
            </div>
            <div className="font-playfair text-2xl italic text-gold">&</div>
            <div>
              <p className="text-xs tracking-widest text-gold mb-2 uppercase font-montserrat">The Bride</p>
              <h3 className="font-bodoni text-3xl">Rafna Shani</h3>
              <p className="text-xs mt-1 opacity-60">Daughter of Mr. Ismail & Mrs. Fathima</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    <NextButton onClick={onNext} />
  </Section>
);

const ItineraryTimeline = ({ onNext }) => {
  const events = [
    { time: '10:30 AM', title: 'Nikah Ceremony', desc: 'The Sacred Union', icon: <Heart size={18} /> },
    { time: '12:30 PM', title: 'Traditional Feast', desc: 'A Culinary Celebration', icon: <Info size={18} /> },
    { time: '04:00 PM', title: 'Grand Reception', desc: 'Evening Celebration', icon: <MapPin size={18} /> },
  ];

  return (
    <Section className="bg-imperial-navy">
      <AnimatedText text="THE ITINERARY" className="text-gold tracking-[0.4em] text-xs mb-16 font-montserrat" />
      <div className="max-w-md w-full px-4">
        {events.map((event, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.3 }}
            className="flex gap-8 mb-12 last:mb-0 relative"
          >
            {idx !== events.length - 1 && (
              <div className="absolute left-[17px] top-10 bottom-[-40px] w-[1px] bg-gold/30"></div>
            )}
            <div className="flex-shrink-0 w-9 h-9 rounded-full border border-gold flex items-center justify-center text-gold bg-imperial-navy z-10">
              {event.icon}
            </div>
            <div>
              <p className="text-gold font-bodoni text-sm tracking-widest mb-1">{event.time}</p>
              <h4 className="font-playfair text-xl text-white mb-1">{event.title}</h4>
              <p className="text-white/40 text-xs tracking-wide">{event.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <NextButton onClick={onNext} />
    </Section>
  );
};

const VenueDetails = ({ onNext }) => (
  <Section className="bg-imperial-navy">
    <div className="max-w-4xl w-full text-center">
      <AnimatedText text="THE VENUE" className="text-gold tracking-[0.4em] text-xs mb-12 font-montserrat" />
      <div className="space-y-6 mb-12">
        <h2 className="font-bodoni text-4xl text-white">Kunhimmu Auditorium</h2>
        <p className="text-white/60 tracking-widest uppercase text-xs font-montserrat">P.C. Padi, Ezhur, Tirur, Kerala</p>
      </div>
      <div className="w-full h-64 grayscale invert contrast-125 border border-gold/30 overflow-hidden">
        <iframe title="Venue" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.634853456071!2d75.93502167504386!3d10.91533048924203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b185abdf736b%3A0xbbdee7e267492d35!2sKUNHIMMU%20AUDITORIUM!5e0!3m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
      </div>
    </div>
    <NextButton onClick={onNext} />
  </Section>
);

const RSVP = () => {
  const [status, setStatus] = useState('idle');
  return (
    <Section className="bg-imperial-navy">
      <div className="max-w-xl w-full text-center">
        {status === 'submitted' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Check className="mx-auto text-gold mb-6" size={48} />
            <h2 className="font-bodoni text-3xl text-white mb-4">Thank You</h2>
            <p className="text-white/60 font-playfair italic">Your response has been received with gratitude.</p>
          </motion.div>
        ) : (
          <>
            <AnimatedText text="R S V P" className="text-gold tracking-[0.5em] text-xs mb-12 font-montserrat" />
            <h2 className="font-playfair text-3xl text-white mb-12 font-light">Will you join our celebration?</h2>
            <div className="flex flex-col gap-6 justify-center items-center w-full max-w-xs mx-auto">
              <button 
                onClick={() => setStatus('submitted')}
                className="royal-btn-feedback w-full py-4 border border-gold text-gold tracking-[0.2em] text-xs transition-all duration-500 hover:bg-gold hover:text-[#002366]"
              >
                I WILL ATTEND
              </button>
              <button 
                onClick={() => setStatus('submitted')}
                className="royal-btn-feedback w-full py-4 text-white/30 tracking-[0.2em] text-xs hover:text-white/60 transition-colors"
              >
                REGRETFULLY DECLINE
              </button>
            </div>
          </>
        )}
      </div>
      <footer className="mt-24 opacity-30 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase font-montserrat">Vellathur Family</p>
      </footer>
    </Section>
  );
};

export default function App() {
  const [page, setPage] = useState(0); // 0: Landing, 1: Hero, 2: Card, 3: Itinerary, 4: Venue, 5: RSVP
  const [isMuted, setIsMuted] = useState(false);

  const handleNext = () => setPage(prev => prev + 1);

  return (
    <div className="bg-imperial-navy selection:bg-gold/30">
      <AnimatePresence mode="wait">
        {page === 0 && <StationeryLanding key="p0" onOpen={handleNext} />}
        {page === 1 && <Hero key="p1" onNext={handleNext} />}
        {page === 2 && <InvitationCard key="p2" onNext={handleNext} />}
        {page === 3 && <ItineraryTimeline key="p3" onNext={handleNext} />}
        {page === 4 && <VenueDetails key="p4" onNext={handleNext} />}
        {page === 5 && <RSVP key="p5" />}
      </AnimatePresence>

      {page > 0 && (
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="fixed top-8 right-8 z-40 text-gold/50 hover:text-gold transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </div>
  );
}
