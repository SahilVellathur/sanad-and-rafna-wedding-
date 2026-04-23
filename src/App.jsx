import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Check, Volume2, VolumeX, Heart, Info, Send, ChevronRight } from 'lucide-react';

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
    className="active:bg-[#002366] active:text-white active:shadow-[0_0_20px_#002366] mt-8 border border-[#C5A059]/40 text-[#C5A059]/60 px-8 py-3 rounded-full tracking-[4px] text-[10px] font-montserrat hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-500 flex items-center gap-2"
    style={{ WebkitTapHighlightColor: 'transparent' }}
  >
    {text} <ChevronRight size={14} />
  </motion.button>
);

// --- Page Components ---

const StationeryLanding = ({ onOpen }) => (
  <Section>
    <div className="glass-card">
      <div className="text-[#C5A059] text-3xl mb-8 font-serif">﷽</div>
      
      <div className="text-[#C5A059] text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-8 font-montserrat opacity-70">
        <p className="mb-2">Mr. & Mrs. Shamsudheen</p>
        <p>&</p>
        <p className="mt-2">Mr. & Mrs. Ismail</p>
      </div>
      
      <h1 className="text-[#C5A059] text-4xl md:text-5xl font-bold mb-6 font-playfair leading-tight">
        Sanad & Rafna
      </h1>
      
      <p className="text-[#C5A059] text-[10px] md:text-xs tracking-[0.6em] uppercase mb-12 font-montserrat font-bold">
        WEDDING RECEPTION
      </p>
      
      <button 
        onClick={onOpen}
        className="transition-all duration-100 active:bg-[#002366] active:text-white active:shadow-[0_0_25px_rgba(255,255,255,0.9)] focus:outline-none border border-[#C5A059] text-[#C5A059] px-10 py-4 rounded-full tracking-[4px] text-[10px] font-montserrat uppercase font-bold bg-transparent"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        OPEN INVITATION
      </button>
    </div>
  </Section>
);

const Hero = ({ onNext }) => (
  <Section>
    <div className="glass-card">
      <div className="mb-8 text-[#C5A059] text-6xl font-playfair">S & R</div>
      <AnimatedText text="SAVE THE DATE" className="text-[#C5A059] tracking-[0.5em] text-xs mb-4 font-montserrat" />
      <AnimatedText text="Sanad & Rafna" className="font-playfair text-3xl md:text-4xl text-[#C5A059] font-bold tracking-wide mb-8" delay={0.4} />
      <AnimatedText text="AUGUST 14, 2026" className="text-[#C5A059] tracking-[0.2em] font-playfair text-lg" delay={0.8} />
      <NextButton onClick={onNext} />
    </div>
  </Section>
);

const InvitationCard = ({ onNext }) => (
  <Section>
    <div className="glass-card">
      <div className="mb-6 text-[#C5A059] text-2xl">﷽</div>
      <p className="font-playfair italic text-base mb-8 text-[#C5A059]/80">With the blessings of Almighty Allah, we cordially invite you to celebrate the wedding of our children</p>
      <div className="space-y-6">
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#C5A059]">Mohamed Sanad</h3>
          <p className="text-[9px] mt-1 opacity-60 text-[#C5A059] font-montserrat uppercase tracking-wider">Son of Mr. Shamsudheen & Mrs. Jemsheera</p>
        </div>
        <div className="font-playfair text-xl italic text-[#C5A059]">&</div>
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#C5A059]">Rafna Shani</h3>
          <p className="text-[9px] mt-1 opacity-60 text-[#C5A059] font-montserrat uppercase tracking-wider">Daughter of Mr. Ismail & Mrs. Fathima</p>
        </div>
      </div>
      <NextButton onClick={onNext} />
    </div>
  </Section>
);

const ReceptionDetails = ({ onNext }) => (
  <Section>
    <div className="glass-card">
      <AnimatedText text="GRAND RECEPTION" className="text-[#C5A059] tracking-[0.5em] text-xs mb-10 font-montserrat font-bold" />
      <div className="space-y-6 mb-10">
        <h2 className="font-playfair text-3xl text-[#C5A059] font-bold">Kunhimmu Auditorium</h2>
        <p className="text-[#C5A059]/70 tracking-[0.2em] uppercase text-[10px] font-montserrat">Friday, August 14, 2026</p>
        <p className="text-[#C5A059]/60 tracking-widest uppercase text-[9px] font-montserrat">P.C. Padi, Ezhur, Tirur, Kerala</p>
      </div>
      <div className="w-full h-48 grayscale contrast-125 border border-[#C5A059]/30 rounded-lg overflow-hidden mb-6">
        <iframe title="Venue" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.634853456071!2d75.93502167504386!3d10.91533048924203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b185abdf736b%3A0xbbdee7e267492d35!2sKUNHIMMU%20AUDITORIUM!5e0!3m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
      </div>
      <NextButton onClick={onNext} />
    </div>
  </Section>
);

const RSVP = () => {
  const [status, setStatus] = useState('idle');
  return (
    <Section>
      <div className="glass-card">
        {status === 'submitted' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Check className="mx-auto text-[#C5A059] mb-6" size={48} />
            <h2 className="font-playfair text-2xl text-[#C5A059] mb-4">Thank You</h2>
            <p className="text-[#C5A059]/60 font-playfair italic">Your response has been received with gratitude.</p>
          </motion.div>
        ) : (
          <>
            <AnimatedText text="R S V P" className="text-[#C5A059] tracking-[0.5em] text-xs mb-10 font-montserrat font-bold" />
            <h2 className="font-playfair text-2xl text-[#C5A059] mb-10 font-light">Will you join our celebration?</h2>
            <div className="flex flex-col gap-4 justify-center items-center w-full">
              <button 
                onClick={() => setStatus('submitted')}
                className="w-full py-4 border border-[#C5A059] text-[#C5A059] tracking-[0.2em] text-[10px] font-montserrat font-bold rounded-full transition-all duration-500 hover:bg-[#C5A059] hover:text-[#FFFDF5] active:bg-[#002366] active:text-white active:shadow-[0_0_20px_#002366]"
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
      <footer className="mt-12 opacity-30 text-center">
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
