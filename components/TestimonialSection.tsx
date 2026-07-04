import React, { useState } from 'react';
import { Testimonial } from '../types';
import { Star, Quote, ChevronLeft, ChevronRight, User, PlusCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  onAddTestimonial: (newTest: Testimonial) => void;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials, onAddTestimonial }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', role: 'Basic Plan Member', review: '', rating: 5 });

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.review) return;

    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      name: reviewForm.name,
      role: reviewForm.role,
      review: reviewForm.review,
      rating: reviewForm.rating,
      date: "Today"
    };

    onAddTestimonial(newTestimonial);
    setShowReviewForm(false);
    setReviewForm({ name: '', role: 'Basic Plan Member', review: '', rating: 5 });
    
    // Auto shift to the newly added review (which is usually added to the start or end, let's assume it is added)
    setActiveIndex(0);
  };

  const currentTest = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-500 block mb-3">TESTIMONIALS</span>
            <h2 className="font-sans text-4xl sm:text-5xl font-black tracking-tight text-white">
              TRIUMPHS OF <span className="italic font-light text-stone-200">REAL PEOPLE</span>
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-stone-400 font-light">
              See how physical consistency and professional guidance translated into measurable strength and body transformations for our elite members.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-stone-300 font-semibold">
              <span className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                ))}
              </span>
              <span>4.8/5 average &bull; 106+ verified reviews on Justdial</span>
            </div>
          </div>

          <button
            onClick={() => setShowReviewForm(true)}
            className="px-5 py-3 border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500 hover:text-black transition-all duration-300 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0 shadow-lg shadow-amber-500/5"
          >
            <PlusCircle size={14} />
            <span>Add Your Review</span>
          </button>
        </div>

        {/* Carousel / Slider */}
        {currentTest && (
          <div className="max-w-4xl mx-auto bg-stone-900/40 border border-stone-850 p-8 sm:p-12 rounded-2xl relative shadow-2xl">
            <Quote className="absolute top-8 left-8 text-stone-800 h-16 w-16 stroke-[1.2]" />
            
            <div className="relative z-10">
              {/* Rating stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < currentTest.rating ? "fill-amber-500 text-amber-500" : "text-stone-700"}
                  />
                ))}
              </div>

              {/* Review text */}
              <blockquote className="text-base sm:text-lg text-stone-200 leading-relaxed font-light italic mb-8">
                &ldquo;{currentTest.review}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 border-t border-stone-850 pt-6">
                {currentTest.image ? (
                  <img
                    src={currentTest.image}
                    alt={currentTest.name}
                    className="w-12 h-12 rounded-full object-cover border border-amber-500/30"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center border border-amber-500/25 text-amber-400 font-black">
                    <User size={20} />
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-white">{currentTest.name}</div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">{currentTest.role}</div>
                </div>

                {currentTest.results && (
                  <div className="ml-auto bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                    <span className="text-[9px] text-amber-400 font-black tracking-wider uppercase block">RESULTS METRIC</span>
                    <span className="text-[11px] font-mono font-bold text-white block">{currentTest.results}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Carousel navigation controls */}
            <div className="absolute -bottom-6 right-8 flex gap-2">
              <button
                onClick={handlePrev}
                className="w-12 h-12 bg-stone-900 border border-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:border-amber-500 transition-all cursor-pointer shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 bg-stone-900 border border-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:border-amber-500 transition-all cursor-pointer shadow-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Modal: Write Testimonial Form */}
        <AnimatePresence>
          {showReviewForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowReviewForm(false)}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              ></motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-stone-900 border border-stone-850 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-6 text-white"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase block mb-1">MEMBER VOICE</span>
                    <h3 className="text-xl font-bold font-sans">Share Your Journey</h3>
                    <p className="text-stone-400 text-xs mt-1">Inspire others with your real progress logs.</p>
                  </div>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="p-1 rounded bg-stone-800 hover:bg-stone-700 transition-colors text-stone-400 hover:text-white cursor-pointer"
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rajesh Gowda"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Membership / Role</label>
                    <select
                      value={reviewForm.role}
                      onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Basic Plan Member">Basic Plan Member</option>
                      <option value="Premium Plan Member">Premium Plan Member</option>
                      <option value="Elite Plan Member">Elite Plan Member</option>
                      <option value="Challenger Gym 2 Athlete">Challenger Gym 2 Athlete</option>
                    </select>
                  </div>

                  {/* Rating selector */}
                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1.5">Rating</label>
                    <div className="flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => setReviewForm({ ...reviewForm, rating: i + 1 })}
                          className="p-1 focus:outline-none cursor-pointer"
                        >
                          <Star
                            size={20}
                            className={i < reviewForm.rating ? "fill-amber-500 text-amber-500" : "text-stone-700 hover:text-amber-500/50"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Your Story &amp; Experience</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="e.g. The staff is incredible. The workout plans optimized my muscle gains in 3 months..."
                      value={reviewForm.review}
                      onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase text-xs tracking-widest rounded-lg transition-all duration-300 shadow-lg"
                  >
                    Publish Testimonial
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
