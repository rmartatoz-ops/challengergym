import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, User } from 'lucide-react';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
  bookedClassesCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onNavClick, activeSection, bookedClassesCount }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Classes', id: 'classes' },
    { label: 'Memberships', id: 'memberships' },
    { label: 'Trainers', id: 'trainers' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f0f0f]/95 backdrop-blur-md border-b border-stone-800 shadow-xl py-3'
          : 'bg-stone-950/95 backdrop-blur-md border-b border-stone-900 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-500 rounded-lg flex items-center justify-center text-black font-extrabold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Dumbbell size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="font-sans font-black tracking-tighter text-lg sm:text-xl text-white whitespace-nowrap">
                CHALLENGER<span className="text-amber-500 font-medium"> GYM 2</span>
              </span>
              <span className="block text-[8px] sm:text-[9px] text-stone-400 tracking-[0.2em] sm:tracking-[0.25em] uppercase font-bold -mt-1 whitespace-nowrap">
                Dighori, Nagpur
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`whitespace-nowrap text-[11px] xl:text-xs tracking-wide xl:tracking-widest uppercase font-semibold transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-amber-400 font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4 shrink-0">
            <button
              onClick={() => handleItemClick('dashboard')}
              className={`relative flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg border text-[10px] xl:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeSection === 'dashboard'
                  ? 'bg-amber-500 text-black border-amber-500 shadow-md shadow-amber-500/20'
                  : 'bg-transparent text-white border-stone-700 hover:border-amber-500 hover:bg-stone-900'
              }`}
            >
              <User size={14} />
              <span className="hidden xl:inline">My Space</span>
              {bookedClassesCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-extrabold animate-pulse">
                  {bookedClassesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleItemClick('memberships')}
              className="px-4 xl:px-5 py-2.5 bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-all duration-200 font-bold text-[10px] xl:text-xs uppercase tracking-wider whitespace-nowrap shadow-lg shadow-amber-500/20 hover:scale-105"
            >
              Join Now
            </button>
          </div>

          {/* Mobile / Tablet Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Quick dashboard shortcut on mobile */}
            <button
              onClick={() => handleItemClick('dashboard')}
              className="relative p-2 text-stone-300 hover:text-white"
            >
              <User size={20} />
              {bookedClassesCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold">
                  {bookedClassesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-900 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed top-[70px] left-0 right-0 border-b border-stone-800 py-6 px-6 shadow-2xl flex flex-col gap-5 animate-fade-in z-[110] max-h-[calc(100vh-80px)] overflow-y-auto"
          style={{ backgroundColor: '#070707', opacity: 1 }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`text-left text-base tracking-widest uppercase font-bold py-2 transition-colors ${
                activeSection === item.id ? 'text-amber-400' : 'text-stone-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-[1px] bg-stone-800 my-2"></div>
          <button
            onClick={() => handleItemClick('dashboard')}
            className="flex items-center justify-center gap-2 py-3 bg-stone-900 border border-stone-700 text-white rounded-lg font-bold text-sm uppercase tracking-wider"
          >
            <User size={16} />
            <span>My Workout Space</span>
            {bookedClassesCount > 0 && (
              <span className="bg-amber-500 text-black text-xs font-black px-2 py-0.5 rounded-full">
                {bookedClassesCount}
              </span>
            )}
          </button>
          <button
            onClick={() => handleItemClick('memberships')}
            className="py-3 bg-amber-500 text-black rounded-lg font-bold text-sm uppercase tracking-wider text-center shadow-lg"
          >
            Join Now &bull; Free Pass
          </button>
        </div>
      )}
    </header>
  );
};
