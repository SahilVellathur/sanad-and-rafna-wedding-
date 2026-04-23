import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Check, Volume2, VolumeX, Heart, Info, Send, ChevronRight } from 'lucide-react';

const WEDDING_DATE = new Date('2026-08-14T10:30:00');

// --- Custom Components ---

const Section = ({ children, className = "" }) => (
  <section className={`min-h-screen flex flex-col items-center justify-center p-6 bg-[#FFFDF5] ${className}`}>
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
    className="active:bg-[#002366] active:text-white active:shadow-[0_0_20px_#002366] mt-12 border border-[#C5A059]/40 text-[#C5A059]/60 px-8 py-3 rounded-sm tracking-[4px] text-[10px] font-montserrat hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-500 flex items-center gap-2"
    style={{ WebkitTapHighlightColor: 'transparent' }}
  >
    {text} <ChevronRight size={14} />
  </motion.button>
);

// --- Page Components ---

const StationeryLanding = ({ onOpen }) => (
  <div className="flex flex-col items-center justify-center min-h-screen w-full text-center p-6 bg-[#FFFDF5] font-playfair">
    {/* 1. Bismillah */}
    <div className="text-[#C5A059] text-3xl mb-8 font-serif">﷽</div>
    
    {/* 2. Parents' Names */}
    <div className="text-[#C5A059] text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-8 font-montserrat opacity-70">
      <p className="mb-2">Mr. & Mrs. Shamsudheen</p>
      <p>&</p>
      <p className="mt-2">Mr. & Mrs. Ismail</p>
    </div>
    
    {/* 3. S & R Monogram */}
    <div className="text-[#C5A059] text-3xl md:text-4xl tracking-[0.6em] mb-6 uppercase opacity-90">
      S & R
    </div>
    
    {/* 4. Sanad & Rafna */}
    <h1 className="text-[#C5A059] text-5xl md:text-7xl font-bold mb-12 leading-tight">
      Sanad & Rafna
    </h1>
    
    {/* 5. OPEN INVITATION Button */}
    <button 
      onClick={onOpen}
      className="transition-all duration-100 active:bg-[#002366] active:text-white active:shadow-[0_0_25px_rgba(255,255,255,0.9)] focus:outline-none border border-[#C5A059] text-[#C5A059] px-14 py-4 rounded-full tracking-[5px] text-[10px] font-montserrat uppercase font-bold bg-transparent"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      OPEN INVITATION
    </button>
  </div>
);

const Hero = ({ onNext }) => (
  <Section>
    <div className="text-center">
      <div className="mb-8 text-[#C5A059] text-6xl md:text-8xl font-playfair">S & R</div>
      <AnimatedText text="SAVE THE DATE" className="text-[#C5A059] tracking-[0.5em] text-xs mb-4 font-montserrat" />
      <AnimatedText text="FOR THE WEDDING OF" className="text-[#C5A059]/40 tracking-[0.3em] text-[9px] mb-8 font-montserrat" delay={0.4} />
      <AnimatedText text="Sanad & Rafna" className="font-playfair text-4xl md:text-6xl text-[#C5A059] font-bold tracking-wide mb-8" delay={0.8} />
      <AnimatedText text="AUGUST 14, 2026" className="text-[#C5A059] tracking-[0.2em] font-playfair text-lg" delay={1.2} />
      <NextButton onClick={onNext} />
    </div>
  </Section>
);

const InvitationCard = ({ onNext }) => (
  <Section>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      className="max-w-2xl w-full"
    >
      <div className="relative p-1 border border-[#C5A059]">
        <div className="bg-[#FFFDF5] text-[#C5A059] p-10 md:p-20 text-center border border-[#C5A059]">
          <div className="mb-6 text-[#C5A059] text-2xl">﷽</div>
          <p className="font-playfair italic text-lg mb-8 opacity-80">With the blessings of Almighty Allah, we cordially invite you to celebrate the wedding of our children</p>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] tracking-widest text-[#C5A059] mb-2 uppercase font-montserrat">The Groom</p>
              <h3 className="font-playfair text-3xl font-bold">Mohamed Sanad</h3>
              <p className="text-[10px] mt-1 opacity-60 font-montserrat uppercase tracking-wider">Son of Mr. Shamsudheen & Mrs. Jemsheera</p>
            </div>
            <div className="font-playfair text-2xl italic text-[#C5A059]">&</div>
            <div>
              <p className="text-[10px] tracking-widest text-[#C5A059] mb-2 uppercase font-montserrat">The Bride</p>
              <h3 className="font-playfair text-3xl font-bold">Rafna Shani</h3>
              <p className="text-[10px] mt-1 opacity-60 font-montserrat uppercase tracking-wider">Daughter of Mr. Ismail & Mrs. Fathima</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    <NextButton onClick={onNext} />
  </Section>
);

const ReceptionDetails = ({ onNext }) => (
  <Section>
    <div className="max-w-4xl w-full text-center">
      <AnimatedText text="GRAND RECEPTION" className="text-[#C5A059] tracking-[0.5em] text-xs mb-12 font-montserrat font-bold" />
      <div className="space-y-6 mb-12">
        <h2 className="font-playfair text-4xl md:text-5xl text-[#C5A059] font-bold">Kunhimmu Auditorium</h2>
        <p className="text-[#C5A059]/70 tracking-[0.2em] uppercase text-[10px] md:text-xs font-montserrat">Friday, August 14, 2026</p>
        <p className="text-[#C5A059]/60 tracking-widest uppercase text-[9px] font-montserrat">P.C. Padi, Ezhur, Tirur, Kerala</p>
      </div>
      <div className="w-full h-64 grayscale contrast-125 border border-[#C5A059]/30 overflow-hidden">
        <iframe title="Venue" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.634853456071!2d75.93502167504386!3d10.91533048924203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b185abdf736b%3A0xbbdee7e267492d35!2sKUNHIMMU%20AUDITORIUM!5e0!3m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
      </div>
    </div>
    <NextButton onClick={onNext} />
  </Section>
);

const RSVP = () => {
  const [status, setStatus] = useState('idle');
  return (
    <Section>
      <div className="max-w-xl w-full text-center">
        {status === 'submitted' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Check className="mx-auto text-[#C5A059] mb-6" size={48} />
            <h2 className="font-playfair text-3xl text-[#C5A059] mb-4">Thank You</h2>
            <p className="text-[#C5A059]/60 font-playfair italic">Your response has been received with gratitude.</p>
          </motion.div>
        ) : (
          <>
            <AnimatedText text="R S V P" className="text-[#C5A059] tracking-[0.5em] text-xs mb-12 font-montserrat font-bold" />
            <h2 className="font-playfair text-3xl text-[#C5A059] mb-12 font-light">Will you join our celebration?</h2>
            <div className="flex flex-col gap-6 justify-center items-center w-full max-w-xs mx-auto">
              <button 
                onClick={() => setStatus('submitted')}
                className="w-full py-4 border border-[#C5A059] text-[#C5A059] tracking-[0.2em] text-[10px] font-montserrat font-bold transition-all duration-500 hover:bg-[#C5A059] hover:text-[#FFFDF5] active:bg-[#002366] active:text-white active:shadow-[0_0_20px_#002366]"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                I WILL ATTEND
              </button>
              <button 
                onClick={() => setStatus('submitted')}
                className="w-full py-4 text-[#C5A059]/40 tracking-[0.2em] text-[10px] font-montserrat hover:text-[#C5A059]/80 transition-colors"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                REGRETFULLY DECLINE
              </button>
            </div>
          </>
        )}
      </div>
      <footer className="mt-24 opacity-30 text-center">
        <p className="text-[9px] tracking-[0.4em] uppercase font-montserrat text-[#C5A059]">Vellathur Family</p>
      </footer>
    </Section>
  );
};

export default function App() {
  const [page, setPage] = useState(0); // 0: Landing, 1: Hero, 2: Card, 3: Reception, 4: RSVP
  const [isMuted, setIsMuted] = useState(false);

  const handleNext = () => setPage(prev => prev + 1);

  return (
    <div className="bg-[#FFFDF5] selection:bg-[#C5A059]/30 min-h-screen">
      <AnimatePresence mode="wait">
        {page === 0 && <StationeryLanding key="p0" onOpen={handleNext} />}
        {page === 1 && <Hero key="p1" onNext={handleNext} />}
        {page === 2 && <InvitationCard key="p2" onNext={handleNext} />}
        {page === 3 && <ReceptionDetails key="p3" onNext={handleNext} />}
        {page === 4 && <RSVP key="p4" />}
      </AnimatePresence>

      {page > 0 && (
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="fixed top-8 right-8 z-40 text-[#C5A059]/50 hover:text-[#C5A059] transition-colors"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
    </div>
  );
}
