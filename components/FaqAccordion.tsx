import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  question: string;
  answer: string;
  category: 'Membership' | 'Training' | 'Facilities' | 'Policies';
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Membership',
    question: 'How do I cancel my subscription or change my plan?',
    answer: 'We believe in full contractual freedom. You can instantly upgrade, downgrade, or request cancellation of your monthly membership directly from your member dashboard ("My Workout Space"). Cancellations must be registered 48 hours prior to your monthly renewal date.'
  },
  {
    category: 'Training',
    question: 'Are personal training sessions included in my monthly pass?',
    answer: 'Transformation Gold includes custom diet sheet alignment to audit your form and progressive overload. Elite VIP Coaching includes weekly 1-on-1 private coaching sessions with Chief Master Trainer Gopi Kapse. For Essential Gym Access members, 1-on-1 coaching can be booked separately.'
  },
  {
    category: 'Facilities',
    question: 'What premium equipment is available at the Nagpur center?',
    answer: 'Our physical fitness center features premium Jerai Fitness strength machines, professional squat racks, custom bodybuilding plates, metabolic conditioning equipment, premium changing locker rooms, certified personal coaches, and our organic nutrition supplement bar.'
  },
  {
    category: 'Facilities',
    question: 'Can I trial the gym before purchasing a monthly pass?',
    answer: 'Yes! We offer a private 1-Day VIP Experience Pass for ₹250, which can be fully credited toward any monthly subscription plan if you choose to join within 7 days of your visit.'
  },
  {
    category: 'Policies',
    question: 'Is there a minimum contract commitment period?',
    answer: 'No long-term commitments are required. All of our standard memberships are charged on a flexible, month-to-month billing cycle. You are in complete control of your fitness journey.'
  },
  {
    category: 'Policies',
    question: 'What is your class booking and cancellation window?',
    answer: 'To ensure all members get access to their preferred schedules, class bookings open 7 days in advance. If you cannot attend a scheduled session, you must cancel at least 4 hours before the class begins to allow waitlisted members to fill the spot.'
  }
];

export const FaqAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Membership', 'Training', 'Facilities', 'Policies'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(item => item.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#0a0a0a] border-t border-stone-900 relative overflow-hidden">
      {/* Decorative blurred glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <HelpCircle size={12} className="text-amber-500" />
            <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-amber-500">FAQ Helpdesk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-white uppercase">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            Everything you need to know about joining the absolute premier strength, mobility, and physical recovery space.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveIndex(null);
              }}
              className={`px-4 py-1.5 rounded-lg text-[11px] uppercase tracking-wider font-bold transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/15 font-black'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-stone-900/60 border rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-amber-500/40 bg-stone-900' : 'border-stone-850 hover:border-stone-800'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="font-sans font-bold text-sm text-stone-200 hover:text-white transition-colors">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-stone-950 border border-stone-850 text-stone-400 transition-transform duration-300 ${isOpen ? 'rotate-180 border-amber-500/20 text-amber-500' : ''}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs text-stone-400 leading-relaxed font-light border-t border-stone-850/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic Trust Card */}
        <div className="mt-12 p-6 bg-gradient-to-r from-stone-950 to-stone-900 border border-stone-850 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 border border-amber-500/15 shrink-0">
              <MessageCircle size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Have a custom inquiry or special goal?</h4>
              <p className="text-[11px] text-stone-400 font-light mt-1">Our certified performance coaches are ready to help customize your wellness path.</p>
            </div>
          </div>
          <a
            href="https://wa.me/919901567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 shadow-lg shadow-emerald-600/10"
          >
            <Sparkles size={14} />
            <span>Chat with a Coach</span>
          </a>
        </div>

      </div>
    </section>
  );
};
