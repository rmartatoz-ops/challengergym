import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ClassScheduler } from './components/ClassScheduler';
import { MembershipCalculator } from './components/MembershipCalculator';
import { TrainerProfiles } from './components/TrainerProfiles';
import { TestimonialSection } from './components/TestimonialSection';
import { ContactForm } from './components/ContactForm';
import { UserDashboard } from './components/UserDashboard';
import { ClassBooking, TrainerConsultation, Testimonial } from './types';
import { BASE_TESTIMONIALS } from './data';
import { Dumbbell, Instagram, Facebook, MapPin as MapPinIcon, Shield, Heart, ArrowUp } from 'lucide-react';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { GallerySection } from './components/GallerySection';
import { FaqAccordion } from './components/FaqAccordion';
import { FloatingWidgets } from './components/FloatingWidgets';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [bookedClasses, setBookedClasses] = useState<ClassBooking[]>([]);
  const [bookedConsultations, setBookedConsultations] = useState<TrainerConsultation[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [membership, setMembership] = useState<{ planName: string; memberId: string } | null>(null);
  const [selectedLegalDoc, setSelectedLegalDoc] = useState<LegalDocType | null>(null);

  // Hydrate states from LocalStorage on load
  useEffect(() => {
    // 1. Classes
    const savedClasses = localStorage.getItem('gk_booked_classes');
    if (savedClasses) {
      try {
        setBookedClasses(JSON.parse(savedClasses));
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Consultations
    const savedConsults = localStorage.getItem('gk_booked_consultations');
    if (savedConsults) {
      try {
        setBookedConsultations(JSON.parse(savedConsults));
      } catch (e) {
        console.error(e);
      }
    }

    // 3. Testimonials
    const savedTestimonials = localStorage.getItem('gk_user_testimonials');
    if (savedTestimonials) {
      try {
        setTestimonials(JSON.parse(savedTestimonials));
      } catch (e) {
        console.error(e);
      }
    } else {
      setTestimonials(BASE_TESTIMONIALS);
      localStorage.setItem('gk_user_testimonials', JSON.stringify(BASE_TESTIMONIALS));
    }

    // 4. Membership
    const savedMembership = localStorage.getItem('gk_user_membership');
    if (savedMembership) {
      try {
        setMembership(JSON.parse(savedMembership));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync scroll positions to active header tabs
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'classes', 'memberships', 'trainers', 'gallery', 'testimonials', 'faq', 'contact', 'dashboard'];
      const scrollPosition = window.scrollY + 180;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Class booking callbacks
  const handleBookClass = (booking: ClassBooking) => {
    const updated = [...bookedClasses, booking];
    setBookedClasses(updated);
    localStorage.setItem('gk_booked_classes', JSON.stringify(updated));
  };

  const handleCancelClass = (id: string) => {
    const updated = bookedClasses.filter((b) => b.id !== id);
    setBookedClasses(updated);
    localStorage.setItem('gk_booked_classes', JSON.stringify(updated));
  };

  // Trainer consult callbacks
  const handleBookConsultation = (consult: TrainerConsultation) => {
    const updated = [...bookedConsultations, consult];
    setBookedConsultations(updated);
    localStorage.setItem('gk_booked_consultations', JSON.stringify(updated));
  };

  const handleCancelConsultation = (id: string) => {
    const updated = bookedConsultations.filter((c) => c.id !== id);
    setBookedConsultations(updated);
    localStorage.setItem('gk_booked_consultations', JSON.stringify(updated));
  };

  // Join membership callback
  const handleJoinSuccess = (planName: string, memberId: string) => {
    const data = { planName, memberId };
    setMembership(data);
    localStorage.setItem('gk_user_membership', JSON.stringify(data));
  };

  // Add testimonial callback
  const handleAddTestimonial = (newTest: Testimonial) => {
    const updated = [newTest, ...testimonials];
    setTestimonials(updated);
    localStorage.setItem('gk_user_testimonials', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#070707] text-stone-100 selection:bg-amber-500 selection:text-black overflow-x-hidden w-full max-w-full relative">
      
      {/* Header / Nav */}
      <Header
        onNavClick={handleScrollToSection}
        activeSection={activeSection}
        bookedClassesCount={bookedClasses.length}
      />

      {/* Main sections */}
      <main>
        
        {/* Home/Hero */}
        <Hero onCtaclick={handleScrollToSection} />

        {/* Classes & Calendar Schedulers */}
        <ClassScheduler
          onBookClass={handleBookClass}
          bookedClassIds={bookedClasses.map((b) => b.classId)}
        />

        {/* Memberships & fit comparison calculator */}
        <MembershipCalculator onJoinSuccess={handleJoinSuccess} />

        {/* Trainer Profiles & private coach consultations */}
        <TrainerProfiles
          onBookConsultation={handleBookConsultation}
          bookedTrainerConsultations={bookedConsultations.map((c) => c.trainerId)}
        />

        {/* The Athletic Sanctuary Venue Tour Gallery */}
        <GallerySection />

        {/* Testimonials and customer reviews */}
        <TestimonialSection
          testimonials={testimonials}
          onAddTestimonial={handleAddTestimonial}
        />

        {/* FAQ Accordion Helpdesk */}
        <FaqAccordion />

        {/* Contact info, hours, map and contact form */}
        <ContactForm />

        {/* My Workout Space - User Dashboard */}
        <UserDashboard
          bookedClasses={bookedClasses}
          bookedConsultations={bookedConsultations}
          onCancelClass={handleCancelClass}
          onCancelConsultation={handleCancelConsultation}
          membership={membership}
        />

      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-stone-900 py-16 text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-black font-extrabold shadow-md">
                  <Dumbbell size={16} />
                </div>
                <span className="font-sans font-black tracking-tighter text-lg text-white">
                  CHALLENGER<span className="text-amber-500 font-medium"> GYM 2</span>
                </span>
              </div>
              <p className="text-stone-400 font-light leading-relaxed pr-4">
                Nagpur's absolute premier athletic development and bodybuilding arena in Dighori Naka. Guided by Mr. Asia Bronze Medalist Gopi Kapse.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-white tracking-widest">Sitemap</h4>
              <ul className="space-y-2">
                <li><button onClick={() => handleScrollToSection('home')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Home</button></li>
                <li><button onClick={() => handleScrollToSection('classes')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Classes Schedule</button></li>
                <li><button onClick={() => handleScrollToSection('memberships')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Memberships</button></li>
                <li><button onClick={() => handleScrollToSection('trainers')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Coaching Staff</button></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-white tracking-widest">Legal Details</h4>
              <ul className="space-y-2 text-stone-400">
                <li>
                  <button 
                    onClick={() => setSelectedLegalDoc('terms')} 
                    className="hover:text-amber-400 cursor-pointer transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedLegalDoc('privacy')} 
                    className="hover:text-amber-400 cursor-pointer transition-colors text-left"
                  >
                    Privacy Charter
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedLegalDoc('waiver')} 
                    className="hover:text-amber-400 cursor-pointer transition-colors text-left"
                  >
                    Liability Waiver
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedLegalDoc('cookies')} 
                    className="hover:text-amber-400 cursor-pointer transition-colors text-left"
                  >
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-white tracking-widest">Stay Connected</h4>
              <p className="text-stone-400 leading-relaxed font-light">Join our email list to receive exclusive recipes, workout tips, and private clinic listings.</p>
              
              {/* Social mock buttons */}
              <div className="flex gap-3 pt-2">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-stone-900 border border-stone-800 flex items-center justify-center hover:border-amber-500 text-stone-400 hover:text-white transition-all">
                  <Instagram size={14} />
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-stone-900 border border-stone-800 flex items-center justify-center hover:border-amber-500 text-stone-400 hover:text-white transition-all">
                  <Facebook size={14} />
                </a>
                <a href="https://maps.app.goo.gl/C1SXhbDZUNrRHAjZ7?g_st=ac" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-stone-900 border border-stone-800 flex items-center justify-center hover:border-amber-500 text-stone-400 hover:text-white transition-all">
                  <MapPinIcon size={14} />
                </a>
              </div>
            </div>

          </div>

          <div className="h-[1px] bg-stone-900 my-8"></div>

          {/* Copyright line */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-stone-600">
            <div>
              &copy; {new Date().getFullYear()} Challenger Gym 2. All Rights Reserved.
            </div>
            <div className="flex items-center gap-1.5 font-sans uppercase text-[10px] tracking-widest font-bold">
              <Shield size={11} className="text-amber-500" />
              <span>Secure Encrypted Connection</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top float button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-amber-500 hover:bg-amber-400 text-black rounded-lg flex items-center justify-center shadow-lg cursor-pointer transition-all hover:scale-105"
        title="Scroll to Top"
      >
        <ArrowUp size={16} className="stroke-[2.5]" />
      </button>

      {/* Legal Dialog Modal */}
      <LegalModal
        isOpen={selectedLegalDoc !== null}
        docType={selectedLegalDoc}
        onClose={() => setSelectedLegalDoc(null)}
      />

      {/* Floating Call & WhatsApp Action Widgets */}
      <FloatingWidgets />

    </div>
  );
};

export default App;
