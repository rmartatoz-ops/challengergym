import React, { useState } from 'react';
import { TRAINERS } from '../data';
import { Trainer, TrainerConsultation } from '../types';
import { Star, Shield, Award, Calendar, Clock, BookOpen, ChevronRight, CheckCircle, Mail, Goal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrainerProfilesProps {
  onBookConsultation: (consult: TrainerConsultation) => void;
  bookedTrainerConsultations: string[]; // trainerIds currently booked
}

export const TrainerProfiles: React.FC<TrainerProfilesProps> = ({ onBookConsultation, bookedTrainerConsultations }) => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', date: '2026-07-06', time: '10:00 AM', notes: '' });
  const [showSuccess, setShowSuccess] = useState<TrainerConsultation | null>(null);

  const timeSlots = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"];

  const handleOpenBooking = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setFormData({
      name: '',
      email: '',
      date: '2026-07-06',
      time: '10:00 AM',
      notes: ''
    });
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrainer) return;

    const consultation: TrainerConsultation = {
      id: `consult-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      trainerId: selectedTrainer.id,
      trainerName: selectedTrainer.name,
      userName: formData.name,
      userEmail: formData.email,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      bookedAt: new Date().toLocaleDateString()
    };

    onBookConsultation(consultation);
    setSelectedTrainer(null);
    setShowSuccess(consultation);
  };

  return (
    <section id="trainers" className="py-24 bg-stone-900 text-white relative">
      <div className="absolute inset-0 bg-radial-gradient from-stone-950 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-500 block mb-3">EXPERT COACHES</span>
          <h2 className="font-sans text-4xl sm:text-5xl font-black tracking-tight text-white">
            MASTER COACHING &bull; <span className="italic font-light text-stone-200">RAW SKILLS</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-400 font-light">
            Train with elite champions, physical coaches, and bodybuilding specialists. Every Challenger Gym 2 coach is dedicated to optimizing your body transformation and structural lifting mechanics.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          {TRAINERS.map((trainer) => {
            const hasConsultation = bookedTrainerConsultations.includes(trainer.id);
            return (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="bg-stone-950/70 border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 group shadow-xl"
              >
                {/* Visual / Image section */}
                <div className="relative h-72 sm:h-80 overflow-hidden shrink-0 bg-stone-900">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 brightness-90 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/10 to-transparent"></div>
                  
                  {/* Floating role badge */}
                  <span className="absolute bottom-4 left-6 px-3 py-1 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest rounded shadow-lg">
                    {trainer.role}
                  </span>
                </div>

                {/* Content body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-sans text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                      {trainer.name}
                    </h3>
                    
                    <p className="text-stone-300 text-xs font-light leading-relaxed">
                      {trainer.bio}
                    </p>

                    {/* Quote */}
                    <div className="border-l-2 border-amber-500 pl-4 py-1 italic text-stone-400 text-xs font-light">
                      &ldquo;{trainer.quote}&rdquo;
                    </div>

                    {/* Specialties */}
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-stone-500 block mb-2">SPECIALIZATION</span>
                      <div className="flex flex-wrap gap-1.5">
                        {trainer.specialties.map((spec, i) => (
                          <span key={i} className="px-2 py-1 bg-stone-900 rounded text-[10px] text-stone-300 font-semibold border border-stone-800/80">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-stone-500 block mb-2">CREDENTIALS</span>
                      <div className="space-y-1.5">
                        {trainer.certs.map((cert, i) => (
                          <div key={i} className="flex items-center gap-2 text-[10px] text-stone-400 font-light">
                            <Award size={10} className="text-amber-500 shrink-0" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                      {trainer.id === 'trainer-1' && (
                        <a
                          href="/images/gopi-kapse-certificate.jpg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 underline underline-offset-2"
                        >
                          View BICP Certificate
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-stone-900">
                    <button
                      onClick={() => handleOpenBooking(trainer)}
                      className={`w-full py-3.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        hasConsultation
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                          : 'bg-stone-900 hover:bg-stone-800 text-white border border-stone-800 hover:border-amber-500/30'
                      }`}
                    >
                      {hasConsultation ? (
                        <>
                          <CheckCircle size={14} />
                          <span>Consultation Reserved</span>
                        </>
                      ) : (
                        <span>Schedule Consultation</span>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal: Schedule Consultation Form */}
        <AnimatePresence>
          {selectedTrainer && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTrainer(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              ></motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-stone-900 border border-stone-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-6 text-white"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase block mb-1">COACH ALIGNMENT</span>
                    <h3 className="text-xl font-bold font-sans">Book Consultation</h3>
                    <p className="text-stone-400 text-xs mt-1">with {selectedTrainer.name}</p>
                  </div>
                  <button
                    onClick={() => setSelectedTrainer(null)}
                    className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 transition-colors text-stone-400 hover:text-white cursor-pointer"
                  >
                    &times;
                  </button>
                </div>

                <form onSubmit={handleConsultationSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Your Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Brandon Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. brandon@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Preferred Date</label>
                      <input
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Time Slot</label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        {timeSlots.map((ts) => (
                          <option key={ts} value={ts}>{ts}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Focus Goals &amp; Injury Notes (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Want to focus on posture correction, lower back tightness."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase text-xs tracking-widest rounded-lg transition-all duration-300 shadow-lg"
                  >
                    Confirm Consultation
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Consultation Success */}
        <AnimatePresence>
          {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSuccess(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              ></motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-stone-900 border border-emerald-500/25 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl p-6 text-white text-center"
              >
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-4">
                  <CheckCircle size={24} />
                </div>

                <span className="text-[10px] text-emerald-400 font-black tracking-widest uppercase block mb-1">RESERVATION SECURED</span>
                <h3 className="text-lg font-black font-sans mb-1">Consultation Booked!</h3>
                <p className="text-stone-400 text-xs leading-relaxed mb-6">
                  You've booked a session with <strong className="text-white font-medium">{showSuccess.trainerName}</strong>.
                </p>

                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 text-left text-xs space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5 mb-1.5 text-xs text-amber-500">
                    <Calendar size={12} /> Appointment Details
                  </div>
                  <div>Date: <span className="text-stone-300 font-mono">{showSuccess.date}</span></div>
                  <div>Time: <span className="text-stone-300 font-mono">{showSuccess.time}</span></div>
                  {showSuccess.notes && <div className="text-stone-400 italic mt-1 pb-1 border-t border-stone-850/40 font-light">&ldquo;{showSuccess.notes}&rdquo;</div>}
                </div>

                <button
                  onClick={() => setShowSuccess(null)}
                  className="w-full mt-6 py-3 bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Close &bull; Understood
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
