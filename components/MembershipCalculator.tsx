import React, { useState } from 'react';
import { MEMBERSHIP_PLANS } from '../data';
import { MembershipPlan } from '../types';
import { Check, Shield, HelpCircle, Award, Sparkles, AlertCircle, Barcode, Calendar, Heart, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MembershipCalculatorProps {
  onJoinSuccess: (planName: string, memberId: string) => void;
}

export const MembershipCalculator: React.FC<MembershipCalculatorProps> = ({ onJoinSuccess }) => {
  // Calculator state
  const [trainingFrequency, setTrainingFrequency] = useState<number>(3); // 1 to 7 times/week
  const [needsRecovery, setNeedsRecovery] = useState<boolean>(true); // saunas, etc.
  const [needsCoaching, setNeedsCoaching] = useState<boolean>(false); // 1-on-1 PT

  // Booking states
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '' });
  const [createdMembership, setCreatedMembership] = useState<{ id: string; name: string; planName: string; date: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine recommended plan based on slider and options
  const getRecommendedPlanId = (): string => {
    if (needsCoaching || trainingFrequency >= 5) {
      return "plan-elite"; // Needs elite because of weekly coaching or heavy volume
    }
    if (needsRecovery || trainingFrequency >= 3) {
      return "plan-premium"; // Premium has saunas & unlimited classes
    }
    return "plan-essential"; // Minimal
  };

  const recommendedId = getRecommendedPlanId();

  const handleOpenSignup = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const memberId = `CG2-${Math.floor(100000 + Math.random() * 900000)}`;
    const planName = selectedPlan?.name || "Premium Plan";
    const planPrice = selectedPlan?.price || 1799;
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const payload = {
      id: memberId,
      name: signupForm.name,
      planName: planName,
      date: dateStr
    };

    // Construct the WhatsApp message with details to send to owner
    const whatsappMessage = `*NEW MEMBER REGISTRATION - CHALLENGER GYM 2*\n----------------------------------------\n👤 *Name:* ${signupForm.name}\n📱 *Phone:* ${signupForm.phone}\n✉️ *Email:* ${signupForm.email}\n\n💳 *Plan Selected:* ${planName}\n💰 *Price:* ₹${planPrice}/month\n🆔 *Generated Member ID:* ${memberId}\n📅 *Date:* ${dateStr}\n----------------------------------------\nPlease activate my membership and guide me for the next steps!`;

    const whatsappUrl = `https://wa.me/919901567890?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      setCreatedMembership(payload);
      onJoinSuccess(payload.planName, payload.id);
      setIsSubmitting(false);
      setSelectedPlan(null);

      // Open WhatsApp link to send details to gym owner
      window.open(whatsappUrl, '_blank');
    }, 1000);
  };

  return (
    <section id="memberships" className="py-24 bg-[#0e0e0e] text-white relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-500 block mb-3">MEMBERSHIPS</span>
          <h2 className="font-sans text-4xl sm:text-5xl font-black tracking-tight text-white">
            INVEST IN <span className="italic font-light text-stone-200">YOURSELF</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-400 font-light">
            Flexible monthly plans built with absolute transparency. Zero hidden sign-up fees. Free cancellation anytime.
          </p>
        </div>

        {/* Interactive Fit Finder / Calculator */}
        <div className="mb-16 bg-stone-900/40 p-6 sm:p-8 rounded-2xl border border-stone-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Configurations */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Heart size={16} /> CG2 FIT-FINDER
                  </h3>
                  <span className="text-xs text-stone-400">Configure your fitness goals</span>
                </div>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  Adjust the options below to find the exact membership level optimized for your frequency and style.
                </p>
              </div>

              {/* Slider 1: Training Frequency */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-stone-300 uppercase">
                  <span>How many times do you plan to train?</span>
                  <span className="text-amber-500 font-mono text-sm">{trainingFrequency}x / week</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={trainingFrequency}
                  onChange={(e) => setTrainingFrequency(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-950 h-2 rounded-lg cursor-pointer border border-stone-800"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-medium">
                  <span>1-2 Days (Casual)</span>
                  <span>3-4 Days (Dedicated)</span>
                  <span>5-7 Days (Extreme Athlete)</span>
                </div>
              </div>

              {/* Toggle 2: Recovery Zones */}
              <div className="flex items-center justify-between p-4 bg-stone-950/60 rounded-xl border border-stone-800/40">
                <div>
                  <h4 className="text-xs font-bold uppercase text-white tracking-wider">Infrared Sauna &amp; Recovery Access</h4>
                  <p className="text-[10px] text-stone-400 mt-0.5">Crucial for joint longevity, cellular repair, and mental decompression.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNeedsRecovery(!needsRecovery)}
                  className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none shrink-0 cursor-pointer ${
                    needsRecovery ? 'bg-amber-500' : 'bg-stone-800'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 bg-black w-4 h-4 rounded-full transition-transform ${
                      needsRecovery ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>

              {/* Toggle 3: Personal Training consultations */}
              <div className="flex items-center justify-between p-4 bg-stone-950/60 rounded-xl border border-stone-800/40">
                <div>
                  <h4 className="text-xs font-bold uppercase text-white tracking-wider">Weekly 1-on-1 Personal Coaching</h4>
                  <p className="text-[10px] text-stone-400 mt-0.5">Custom training logs, technique adjustments, and direct goal tracking.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNeedsCoaching(!needsCoaching)}
                  className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none shrink-0 cursor-pointer ${
                    needsCoaching ? 'bg-amber-500' : 'bg-stone-800'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 bg-black w-4 h-4 rounded-full transition-transform ${
                      needsCoaching ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>
            </div>

            {/* Right Col: Recommendation Output */}
            <div className="lg:col-span-5 bg-gradient-to-br from-stone-950 to-stone-900 p-6 rounded-xl border border-stone-800 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/[0.04] rounded-full blur-xl"></div>
              
              <div>
                <span className="inline-block px-2 py-0.5 bg-amber-500 text-black text-[9px] font-black tracking-widest uppercase rounded mb-3">
                  RECOMMENDED FOR YOU
                </span>
                
                {recommendedId === 'plan-essential' && (
                  <>
                    <h3 className="font-sans text-2xl font-black text-white">Basic Plan</h3>
                    <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                      Perfect for budget-focused fitness enthusiasts who want top-tier equipment access with maximum freedom.
                    </p>
                    <div className="text-3xl font-black text-white mt-4">₹999<span className="text-stone-400 text-xs font-normal"> / month</span></div>
                  </>
                )}

                {recommendedId === 'plan-premium' && (
                  <>
                    <h3 className="font-sans text-2xl font-black text-white">Premium Plan</h3>
                    <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                      Our most sought-after plan. Grants unlimited class access, customized diet sheets, and a monthly personal transformation review.
                    </p>
                    <div className="text-3xl font-black text-amber-400 mt-4">₹1,799<span className="text-stone-400 text-xs font-normal"> / month</span></div>
                  </>
                )}

                {recommendedId === 'plan-elite' && (
                  <>
                    <h3 className="font-sans text-2xl font-black text-white">Elite Plan</h3>
                    <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                      The absolute gold standard. Includes 1-on-1 personal coaching with Gopi Kapse, custom nutrition, and 24/7 WhatsApp guidance.
                    </p>
                    <div className="text-3xl font-black text-white mt-4">₹2,999<span className="text-stone-400 text-xs font-normal"> / month</span></div>
                  </>
                )}
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    const plan = MEMBERSHIP_PLANS.find(p => p.id === recommendedId);
                    if (plan) handleOpenSignup(plan);
                  }}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-widest rounded-lg shadow-lg shadow-amber-500/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
                  Select recommended plan
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isRec = plan.id === recommendedId;
            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 flex flex-col justify-between border relative transition-all duration-300 ${
                  plan.popular || isRec
                    ? 'bg-stone-900 border-amber-500/55 shadow-2xl shadow-amber-500/5'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700'
                }`}
              >
                {/* Popular Badge */}
                {(plan.popular || isRec) && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-amber-500 text-black text-[9px] font-black tracking-widest uppercase rounded-full shadow-lg">
                    {plan.popular && isRec ? "Best Choice" : isRec ? "Recommended" : "Most Popular"}
                  </span>
                )}

                <div>
                  <h3 className="font-sans text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-sans font-black text-white">₹{plan.price}</span>
                    <span className="text-stone-400 text-xs">{plan.billing}</span>
                  </div>

                  <div className="h-[1px] bg-stone-800/80 mb-6"></div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-300 font-light">
                        <Check size={14} className="text-amber-500 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleOpenSignup(plan)}
                    className={`w-full py-3.5 rounded-lg text-xs font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                      plan.popular || isRec
                        ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/15'
                        : 'bg-stone-800 hover:bg-stone-700 text-white border border-stone-700'
                    }`}
                  >
                    Get {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Secure signup form */}
        <AnimatePresence>
          {selectedPlan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPlan(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              ></motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-stone-900 border border-stone-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl text-white max-h-[90vh] flex flex-col"
              >
                {/* Header */}
                <div className="p-6 border-b border-stone-800 flex justify-between items-center shrink-0">
                  <div>
                    <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase block mb-0.5">SECURE SIGN UP</span>
                    <h3 className="text-lg font-bold font-sans">Join {selectedPlan.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 transition-colors text-stone-400 hover:text-white cursor-pointer"
                  >
                    &times;
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto space-y-6">
                  
                  {/* Summary Box */}
                  <div className="p-4 bg-stone-950 rounded-xl border border-stone-800/80 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-extrabold text-white">{selectedPlan.name} Membership</div>
                      <div className="text-stone-500 mt-0.5">Standard monthly contract. Cancel anytime.</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-amber-400">₹{selectedPlan.price}</div>
                      <div className="text-stone-500 text-[10px]">per month</div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Your Full Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Amit Kumar"
                          value={signupForm.name}
                          onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Email Address</label>
                        <input
                          required
                          type="email"
                          placeholder="amit@example.com"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Phone Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                      />
                    </div>

                    <div className="h-[1px] bg-stone-800 my-4"></div>

                    <div className="pt-4 shrink-0">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-400 text-black font-extrabold uppercase text-xs tracking-widest rounded-lg shadow-lg shadow-amber-500/10 transition-colors cursor-pointer"
                      >
                        {isSubmitting ? "Generating member pass..." : `Register & Send Details to WhatsApp • ₹${selectedPlan.price}`}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Sign Up Success Digital Pass */}
        <AnimatePresence>
          {createdMembership && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setCreatedMembership(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              ></motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/30 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl p-6 text-white text-center"
              >
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 mx-auto mb-4">
                  <Sparkles size={24} />
                </div>

                <span className="text-[9px] text-amber-500 font-black tracking-widest uppercase block mb-1">TRANSACTION COMPLETE</span>
                <h3 className="text-xl font-black font-sans mb-1">Welcome to Challenger Gym 2, {createdMembership.name.split(' ')[0]}!</h3>
                <p className="text-stone-400 text-[11px] leading-relaxed mb-6">
                  Your digital pass has been activated. Access the gym floor anytime using your member card barcode below.
                </p>

                {/* Digital Membership Card design */}
                <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 text-left relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.02] rounded-full blur-xl"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="font-sans font-black text-sm tracking-tighter text-white">CHALLENGER<span className="text-amber-500 font-medium"> GYM 2</span></div>
                      <div className="text-[8px] text-stone-500 uppercase tracking-widest font-bold">DIGITAL MEMBER CARD</div>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-500/15 border border-amber-500/20 rounded text-[8px] font-black uppercase text-amber-400">
                      {createdMembership.planName}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="text-[8px] text-stone-500 uppercase font-bold">CARDHOLDER</div>
                      <div className="text-xs font-bold text-white">{createdMembership.name}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-[8px] text-stone-500 uppercase font-bold">ISSUED DATE</div>
                        <div className="text-xs font-medium text-stone-300">{createdMembership.date}</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-stone-500 uppercase font-bold">MEMBER ID</div>
                        <div className="text-xs font-mono font-bold text-stone-300">{createdMembership.id}</div>
                      </div>
                    </div>
                  </div>

                  {/* Barcode design */}
                  <div className="bg-white p-3 rounded flex flex-col items-center">
                    <Barcode className="text-stone-900 w-full h-8 stroke-[1.2]" />
                    <span className="text-[9px] font-mono text-stone-600 mt-1 tracking-widest font-bold">
                      {createdMembership.id}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/919901567890?text=${encodeURIComponent(
                      `*NEW MEMBER REGISTRATION - CHALLENGER GYM 2*\n----------------------------------------\n👤 *Name:* ${createdMembership.name}\n💳 *Plan Selected:* ${createdMembership.planName}\n🆔 *Member ID:* ${createdMembership.id}\n📅 *Date:* ${createdMembership.date}\n----------------------------------------\nPlease activate my account!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    Send to WhatsApp
                  </a>
                  <button
                    onClick={() => setCreatedMembership(null)}
                    className="w-full py-3 bg-stone-850 hover:bg-stone-800 text-stone-300 font-extrabold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
                  >
                    Enter My Gym Space
                  </button>
                  <p className="text-[9px] text-stone-500 leading-normal">
                    This digital card is always saved and viewable in your "My Space" tab at the top of the screen.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
