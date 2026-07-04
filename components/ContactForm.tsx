import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', category: 'General Inquiry', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending form payload
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      setFormData({ name: '', email: '', category: 'General Inquiry', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-stone-950 text-white relative">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/[0.02] rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-500 block mb-3">GET IN TOUCH</span>
          <h2 className="font-sans text-4xl sm:text-5xl font-black tracking-tight text-white">
            CHOOSE TO <span className="italic font-light text-stone-200">BEGIN NOW</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-400 font-light">
            Questions regarding our elite programs, coaching certifications, or membership pauses? Drop us a line below and we'll reply in under 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Col: Map mockup and location indicators */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-sans text-2xl font-black text-white">Challenger Gym 2 Location</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Our fitness arena is located near Dighori Naka on Umred Road, Nagpur, featuring heavy-duty Jerai machines, premium squat sections, and expert bodybuilding mentoring under Coach Gopi Kapse.
              </p>

              {/* Physical details list */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-stone-900 border border-stone-800 rounded-lg flex items-center justify-center text-amber-500 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">ADDRESS</div>
                    <div className="text-xs font-semibold text-stone-200 mt-0.5">Challenger Gym 2, Plot No. 06, Motilal Nagar, Dighori Naka No. 7, Umred Road, Nagpur, Maharashtra 440034</div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-stone-900 border border-stone-800 rounded-lg flex items-center justify-center text-amber-500 shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">CONTACT NUMBERS</div>
                    <div className="text-xs font-semibold text-stone-200 mt-0.5">+91 XXXXX XXXXX</div>
                    <div className="text-[11px] text-stone-400">Email: info@challengergym2.in</div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-stone-900 border border-stone-800 rounded-lg flex items-center justify-center text-amber-500 shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500 uppercase tracking-wider font-bold">WORKING HOURS</div>
                    <div className="text-xs font-semibold text-stone-200 mt-0.5">Mon – Sat: 06:00 AM – 10:00 PM</div>
                    <div className="text-xs font-semibold text-stone-200">Sunday: 06:00 AM – 12:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real embedded Google Map */}
            <a
              href="https://maps.app.goo.gl/C1SXhbDZUNrRHAjZ7?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-56 bg-stone-900/60 rounded-xl border border-stone-850 overflow-hidden relative group"
            >
              <iframe
                title="Challenger Gym 2 Location Map"
                src="https://www.google.com/maps?q=Challenger+Gym+2,+Plot+No.+06,+Motilal+Nagar,+Dighori+Naka+No.+7,+Umred+Road,+Nagpur,+Maharashtra+440034&output=embed"
                className="w-full h-full grayscale contrast-125 opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <div className="absolute bottom-4 left-4 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded text-[10px] text-stone-300 font-bold flex items-center gap-1.5 shadow-xl">
                <MapPin size={10} className="text-amber-500" />
                <span>Challenger Gym 2</span>
              </div>

              <span className="absolute top-4 right-4 bg-amber-500 text-black font-mono font-black text-[9px] px-2 py-0.5 rounded shadow">
                NAGPUR
              </span>

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                  Open in Google Maps
                </span>
              </div>
            </a>

          </div>

          {/* Right Col: High performance Contact Form */}
          <div className="lg:col-span-7 bg-stone-900/40 border border-stone-850 p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/[0.02] rounded-full blur-xl"></div>

            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="font-sans text-xl font-bold text-white mb-6">Dispatch Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Your Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Amit Kumar"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Your Email</label>
                        <input
                          required
                          type="email"
                          placeholder="amit@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Enquiry Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Personal Coaching Options">Personal Coaching Options</option>
                        <option value="Membership Upgrades &amp; Pauses">Membership Upgrades &amp; Pauses</option>
                        <option value="Careers &amp; Certifications">Careers &amp; Certifications</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Detailed Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Type your question or goal description here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-all resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase text-xs tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer disabled:bg-stone-700 disabled:text-stone-400"
                    >
                      <Send size={12} />
                      <span>{loading ? "Transmitting..." : "Send Secure Message"}</span>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-view"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  
                  <div>
                    <span className="text-[10px] text-emerald-400 font-black tracking-widest uppercase block mb-1">MESSAGE DELIVERED</span>
                    <h3 className="text-2xl font-black font-sans text-white">We've Received It!</h3>
                    <p className="text-stone-400 text-xs max-w-sm mx-auto mt-2 leading-relaxed">
                      Thank you for contacting Challenger Gym 2. Gopi Kapse or one of our trainers will touch base at your email address within the next 2 hours.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSent(false)}
                    className="px-6 py-3 bg-stone-800 hover:bg-stone-750 border border-stone-700 hover:border-amber-500/30 rounded-lg text-xs font-bold uppercase text-white transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
