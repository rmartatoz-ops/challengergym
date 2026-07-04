import React from 'react';
import { Phone, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export const FloatingWidgets: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/91XXXXXXXXXX?text=Hello%20Challenger%20Gym%202!%20I%20am%20interested%20in%20joining.%20Can%20I%20book%20a%20VIP%20Day%20Pass?"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="w-12 h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all duration-300 group relative border border-emerald-500/20"
      >
        <MessageSquare size={20} className="stroke-[2.2]" />
        
        {/* Tooltip */}
        <span className="absolute left-14 bg-stone-900 border border-stone-800 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl">
          WhatsApp Coach
        </span>

        {/* Pulse effect */}
        <span className="absolute -inset-[3px] bg-emerald-500/20 rounded-full animate-ping pointer-events-none -z-10"></span>
      </a>

      {/* Call Button */}
      <a
        href="tel:+91XXXXXXXXXX"
        title="Call Front Desk"
        className="w-12 h-12 bg-stone-900 hover:bg-stone-800 text-amber-500 hover:text-amber-400 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 group relative border border-stone-800 hover:border-stone-700"
      >
        <Phone size={18} className="stroke-[2.2]" />
        
        {/* Tooltip */}
        <span className="absolute left-14 bg-stone-900 border border-stone-800 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-xl">
          Call Front Desk
        </span>
      </a>
    </div>
  );
};
