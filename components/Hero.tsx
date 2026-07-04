import React, { useState, useEffect } from 'react';
import { Play, TrendingUp, Shield, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onCtaclick: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaclick }) => {
  const [gymCapacity, setGymCapacity] = useState(42);
  const [activeTrainers, setActiveTrainers] = useState(3);

  // Simulate a live gym counter that periodically shifts slightly to feel real and organic!
  useEffect(() => {
    const interval = setInterval(() => {
      setGymCapacity((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return Math.max(25, Math.min(85, next));
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden pt-16">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/gym-interior.jpg"
          alt="Challenger Gym 2 interior in Dighori, Nagpur"
          className="w-full h-full object-cover object-center opacity-30 scale-105 filter contrast-125 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/35"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
      </div>

      {/* Hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-20 text-center md:text-left w-full">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-12 items-center">
          
          {/* Main Hero text */}
          <div className="xl:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs tracking-[0.25em] uppercase font-bold rounded-full mb-6"
            >
              <Award size={12} className="text-amber-400" />
              <span>ELITE BODY TRANSFORMATION & STRENGTH ARENA</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="inline-flex items-center gap-1.5 text-xs text-stone-300 font-semibold mb-4"
            >
              <span className="text-amber-400 tracking-widest">★★★★★</span>
              <span>4.8/5 &bull; 106+ Reviews on Justdial</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans text-5xl sm:text-6xl lg:text-7xl font-black leading-none text-white tracking-tighter text-left"
            >
              TRANSFORM YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">BODY</span> <br />
              FORGE YOUR <span className="italic font-light text-stone-200">STRENGTH</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-stone-300 max-w-xl font-light leading-relaxed text-left"
            >
              Step into Challenger Gym 2 — Nagpur's premier bodybuilding and lifestyle transformation hub in Dighori. Equipped with premium Jerai Fitness machinery, atmospheric LED ambient styling, and results-driven training blueprints designed by Master Trainer Gopi Kapse.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => onCtaclick('memberships')}
                className="px-8 py-4 bg-amber-500 text-black font-extrabold uppercase text-xs tracking-widest rounded-lg hover:bg-amber-400 hover:scale-[1.03] transition-all duration-300 shadow-xl shadow-amber-500/20 text-center cursor-pointer"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => onCtaclick('classes')}
                className="px-8 py-4 bg-stone-900 text-white border border-stone-800 font-extrabold uppercase text-xs tracking-widest rounded-lg hover:border-amber-500 hover:bg-stone-800 transition-all duration-300 text-center cursor-pointer"
              >
                Explore Classes
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-stone-800/60 w-full max-w-md text-left"
            >
              <div>
                <div className="font-sans font-black text-2xl text-white">Jerai Pro</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Premium Setup</div>
              </div>
              <div>
                <div className="font-sans font-black text-2xl text-white">Level 1</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">BICP Certified</div>
              </div>
              <div>
                <div className="font-sans font-black text-2xl text-white">500+</div>
                <div className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Transformations</div>
              </div>
            </motion.div>
          </div>

          {/* Side Panel: Interactive Live Tracker & Features Widget */}
          <div className="xl:col-span-5 flex flex-col gap-6 w-full max-w-xl mx-auto md:mx-0">
            {/* Live occupancy status */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 bg-stone-900/85 backdrop-blur-md rounded-xl border border-stone-800/80 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-400">LIVE STATUS</span>
                </div>
                <span className="text-xs text-amber-400 font-bold tracking-wider">CHALLENGER GYM 2</span>
              </div>

              <div className="grid grid-cols-2 gap-4 my-2">
                <div className="bg-stone-950/60 p-4 rounded-lg border border-stone-800/40">
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Active Members</div>
                  <div className="font-sans text-3xl font-black text-white mt-1">{gymCapacity}</div>
                  <div className="text-[9px] text-green-400 font-bold mt-1">Comfortable Capacity</div>
                </div>
                <div className="bg-stone-950/60 p-4 rounded-lg border border-stone-800/40">
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">Coaches Active</div>
                  <div className="font-sans text-3xl font-black text-white mt-1">{activeTrainers}</div>
                  <div className="text-[9px] text-stone-400 font-bold mt-1">On duty right now</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/40 flex justify-between items-center text-xs text-stone-400">
                <span>Peak Hours: 6:00 AM – 9:00 AM &amp; 5:00 PM – 9:00 PM</span>
                <span className="text-amber-500 hover:underline cursor-pointer" onClick={() => onCtaclick('contact')}>Get Directions</span>
              </div>
            </motion.div>

            {/* Quick Pillars Widget */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="p-4 bg-stone-950/80 border border-stone-900 rounded-lg hover:border-amber-500/40 hover:bg-stone-900/40 transition-all duration-300 flex gap-3">
                <div className="p-2 h-10 w-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">Challenger Strength</h4>
                  <p className="text-[11px] text-stone-400 mt-1">Premium dumbbells, olympic barbells, Jerai plates.</p>
                </div>
              </div>

              <div className="p-4 bg-stone-950/80 border border-stone-900 rounded-lg hover:border-amber-500/40 hover:bg-stone-900/40 transition-all duration-300 flex gap-3">
                <div className="p-2 h-10 w-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 shrink-0">
                  <Shield size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">Heavy Machines</h4>
                  <p className="text-[11px] text-stone-400 mt-1">Leg extensions, hack squats, lat pull-downs.</p>
                </div>
              </div>

              <div className="p-4 bg-stone-950/80 border border-stone-900 rounded-lg hover:border-amber-500/40 hover:bg-stone-900/40 transition-all duration-300 flex gap-3">
                <div className="p-2 h-10 w-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">Master Coach</h4>
                  <p className="text-[11px] text-stone-400 mt-1">BICP Certified Master Trainer Gopi Kapse.</p>
                </div>
              </div>

              <div className="p-4 bg-stone-950/80 border border-stone-900 rounded-lg hover:border-amber-500/40 hover:bg-stone-900/40 transition-all duration-300 flex gap-3">
                <div className="p-2 h-10 w-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-400 shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">Posture &amp; Form</h4>
                  <p className="text-[11px] text-stone-400 mt-1">Biomechanics alignment &amp; injury prevention guides.</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
