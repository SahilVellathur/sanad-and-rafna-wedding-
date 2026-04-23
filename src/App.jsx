import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Check, Volume2, VolumeX, Heart, Info, Send } from 'lucide-react';

const WEDDING_DATE = new Date('2026-08-14T10:30:00');

// --- Custom Components ---

const GoldBorder = ({ children, className = "" }) => (
  <div className={`relative p-1 border border-gold ${className}`}>
    <div className="border border-gold p-6 md:p-12 text-center">
      {children}
    </div>
  </div>
);

const Section = ({ children, className = "" }) => (
  <section className={`min-h-screen flex flex-col items-center justify-center luxury-spacing ${className}`}>
    {children}
  </section>
);

const AnimatedText = ({ text, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, delay, ease: "easeOut" }}
    className={className}
  >
    {text}
  </motion.div>
);

// --- Layout Components ---

const Hero = () => (
  <Section className="bg-imperial-navy">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="text-center"
    >
      <div className="mb-8 gold-embossed text-6xl md:text-8xl">S & R</div>
      <AnimatedText 
        text="SAVE THE DATE" 
        className="text-gold tracking-[0.5em] text-sm md:text-base mb-4 font-inter font-light" 
      />
      <AnimatedText 
        text="FOR THE WEDDING OF" 
        className="text-white/40 tracking-[0.3em] text-[10px] md:text-xs mb-8" 
        delay={0.4}
      />
      <AnimatedText 
        text="Sanad & Rafna" 
        className="font-playfair text-4xl md:text-6xl text-white font-light tracking-wide mb-12" 
        delay={0.8}
      />
      <AnimatedText 
        text="AUGUST 14, 2026" 
        className="text-gold tracking-[0.2em] font-bodoni text-lg md:text-xl" 
        delay={1.2}
      />
    </motion.div>
  </Section>
);

const InvitationCard = () => (
  <Section className="bg-imperial-navy">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="max-w-2xl w-full"
    >
      <div className="relative p-1 border border-gold">
        <div className="bg-parchment text-charcoal p-10 md:p-20 shadow-soft text-center border border-gold">
          <div className="mb-6 text-gold text-2xl">﷽</div>
          <p className="font-playfair italic text-lg mb-8 opacity-80">With the blessings of Almighty Allah, we cordially invite you to celebrate the wedding of our children</p>
          
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-widest text-gold mb-2 uppercase">The Groom</p>
              <h3 className="font-bodoni text-3xl">Mohamed Sanad</h3>
              <p className="text-xs mt-1 opacity-60">Son of Mr. Shamsudheen & Mrs. Jemsheera</p>
            </div>
            
            <div className="font-playfair text-2xl italic text-gold">&</div>
            
            <div>
              <p className="text-xs tracking-widest text-gold mb-2 uppercase">The Bride</p>
              <h3 className="font-bodoni text-3xl">Rafna Shani</h3>
              <p className="text-xs mt-1 opacity-60">Daughter of Mr. Ismail & Mrs. Fathima</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gold/20">
            <p className="text-sm tracking-[0.2em] font-light">FRIDAY, AUGUST 14TH, 2026</p>
          </div>
        </div>
      </div>
    </motion.div>
  </Section>
);

const ItineraryTimeline = () => {
  const events = [
    { time: '10:30 AM', title: 'Nikah Ceremony', desc: 'The Sacred Union', icon: <Heart size={18} /> },
    { time: '12:30 PM', title: 'Traditional Feast', desc: 'A Culinary Celebration', icon: <Info size={18} /> },
    { time: '04:00 PM', title: 'Grand Reception', desc: 'Evening Celebration', icon: <MapPin size={18} /> },
  ];

  return (
    <Section className="bg-imperial-navy">
      <AnimatedText text="THE ITINERARY" className="text-gold tracking-[0.4em] text-xs mb-16" />
      <div className="max-w-md w-full px-4">
        {events.map((event, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
    </Section>
  );
};

const VenueDetails = () => (
  <Section className="bg-imperial-navy">
    <div className="max-w-4xl w-full text-center">
      <AnimatedText text="THE VENUE" className="text-gold tracking-[0.4em] text-xs mb-12" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6 mb-12"
      >
        <h2 className="font-bodoni text-4xl md:text-5xl text-white">Kunhimmu Auditorium</h2>
        <p className="text-white/60 tracking-widest uppercase text-sm">P.C. Padi, Ezhur, Tirur, Kerala</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full h-80 grayscale invert contrast-125 border border-gold/30"
      >
        <iframe 
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.634853456071!2d75.93502167504386!3d10.91533048924203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b185abdf736b%3A0xbbdee7e267492d35!2sKUNHIMMU%20AUDITORIUM!5e0!3m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  </Section>
);

const RSVP = () => {
  const [status, setStatus] = useState('idle'); // idle, attending, declining, submitted

  const handleRSVP = (choice) => {
    setStatus('submitted');
  };

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
            <AnimatedText text="R S V P" className="text-gold tracking-[0.5em] text-xs mb-12" />
            <h2 className="font-playfair text-3xl md:text-4xl text-white mb-12 font-light">Will you join our celebration?</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => handleRSVP('yes')}
                className="group relative px-12 py-4 border border-gold text-gold tracking-[0.2em] text-xs transition-all duration-500 hover:text-imperial-navy overflow-hidden"
              >
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10">I WILL ATTEND</span>
              </button>
              <button 
                onClick={() => handleRSVP('no')}
                className="px-12 py-4 text-white/30 tracking-[0.2em] text-xs hover:text-white/60 transition-colors"
              >
                REGRETFULLY DECLINE
              </button>
            </div>
          </>
        )}
      </div>
      
      <footer className="mt-auto py-12 text-center opacity-30">
        <p className="text-[10px] tracking-[0.4em] uppercase">Vellathur Family</p>
      </footer>
    </Section>
  );
};

const StationeryLanding = ({ onOpen }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-royal">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      className="glass-card flex flex-col justify-around items-center h-[80vh] p-8 text-center"
    >
      {/* 1. Bismillah */}
      <div className="text-gold text-2xl font-serif">﷽</div>

      {/* 2. S & R Monogram */}
      <div className="font-bodoni text-gold text-6xl md:text-7xl tracking-tighter">S & R</div>

      {/* 3. Sanad & Rafna */}
      <div className="font-bodoni text-charcoal text-4xl md:text-5xl leading-tight">
        Sanad <br /> & <br /> Rafna
      </div>

      {/* 4. Wedding Invitation */}
      <div className="font-montserrat text-gold text-[10px] md:text-xs tracking-[3px] uppercase">
        Wedding Invitation
      </div>

      {/* 5. Open Invitation Button */}
      <button 
        onClick={onOpen}
        className="bg-gold text-white px-10 py-3 rounded-full tracking-[2px] text-[10px] md:text-xs font-montserrat shadow-lg shadow-gold/20 hover:shadow-white/50 active:shadow-white/50 transition-all duration-300"
      >
        OPEN INVITATION
      </button>
    </motion.div>
  </div>
);

export default function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="bg-imperial-navy selection:bg-gold/30">
      {!hasStarted ? (
        <StationeryLanding onOpen={() => setHasStarted(true)} />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Background Audio Placeholder */}
          <button 
            onClick={toggleMute}
            className="fixed top-8 right-8 z-40 text-gold/50 hover:text-gold transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <Hero />
          <InvitationCard />
          <ItineraryTimeline />
          <VenueDetails />
          <RSVP />
        </motion.div>
      )}
    </div>
  );
}
