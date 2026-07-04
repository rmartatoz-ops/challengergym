import React, { useState } from 'react';
import { FITNESS_CLASSES } from '../data';
import { FitnessClass, ClassBooking } from '../types';
import { Calendar, Clock, User, Sparkles, Filter, CheckCircle2, Ticket, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClassSchedulerProps {
  onBookClass: (booking: ClassBooking) => void;
  bookedClassIds: string[];
}

type DayType = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
type CategoryType = "All" | "Strength" | "Cardio" | "Mind & Body" | "Crossfit";

export const ClassScheduler: React.FC<ClassSchedulerProps> = ({ onBookClass, bookedClassIds }) => {
  const [selectedDay, setSelectedDay] = useState<DayType>("Monday");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  
  // Booking modal state
  const [bookingClass, setBookingClass] = useState<FitnessClass | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [showSuccessModal, setShowSuccessModal] = useState<ClassBooking | null>(null);
  const [bookingError, setBookingError] = useState<string>('');

  const days: DayType[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const categories: CategoryType[] = ["All", "Strength", "Cardio", "Mind & Body", "Crossfit"];

  // Filter classes based on selected Day & Category
  const filteredClasses = FITNESS_CLASSES.filter((cls) => {
    const matchesDay = cls.day === selectedDay;
    const matchesCategory = selectedCategory === "All" || cls.category === selectedCategory;
    return matchesDay && matchesCategory;
  });

  const handleOpenBooking = (cls: FitnessClass) => {
    if (bookedClassIds.includes(cls.id)) {
      setBookingError("You have already reserved a spot in this class!");
      // Briefly auto-clear error
      setTimeout(() => setBookingError(''), 4000);
      return;
    }
    setBookingClass(cls);
    setFormData({ name: '', email: '' });
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setBookingError("Please fill out all fields.");
      return;
    }

    if (!bookingClass) return;

    // Create a real-like reservation
    const booking: ClassBooking = {
      id: `booking-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      classId: bookingClass.id,
      className: bookingClass.name,
      classTime: bookingClass.time,
      classDay: bookingClass.day,
      userName: formData.name,
      userEmail: formData.email,
      bookedAt: new Date().toLocaleDateString()
    };

    onBookClass(booking);
    setBookingClass(null);
    setShowSuccessModal(booking);
  };

  return (
    <section id="classes" className="py-24 bg-stone-950 text-white relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-500 block mb-3">CHALLENGER GYM 2 SCHEDULES</span>
          <h2 className="font-sans text-4xl sm:text-5xl font-black tracking-tight text-white">
            CHOOSE YOUR <span className="italic font-light text-stone-200">CHALLENGE</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-400 font-light">
            Filter by day or category to find your perfect session. Reserve your spot instantly to lock in your strength training slot.
          </p>
        </div>

        {/* Warning Toast */}
        <AnimatePresence>
          {bookingError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-red-500/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-2xl border border-red-400 max-w-md w-full"
            >
              <AlertTriangle className="shrink-0" />
              <p className="text-xs font-bold uppercase tracking-wider">{bookingError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scheduler Controls */}
        <div className="flex flex-col gap-6 bg-stone-900/60 p-6 rounded-2xl border border-stone-800/80 mb-10">
          
          {/* Day of Week Tabs */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-3 block flex items-center gap-1">
              <Calendar size={12} /> SELECT DAY
            </span>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-5 py-3 rounded-xl text-xs uppercase font-extrabold tracking-widest shrink-0 transition-all duration-300 cursor-pointer ${
                    selectedDay === day
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25 scale-[1.03]'
                      : 'bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-stone-800/60"></div>

          {/* Category Filters */}
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-3 block flex items-center gap-1">
              <Filter size={12} /> CATEGORY FILTER
            </span>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider shrink-0 transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-black font-extrabold'
                      : 'bg-stone-950 text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic Class Cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => {
                const isBooked = bookedClassIds.includes(cls.id);
                return (
                  <motion.div
                    key={cls.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-stone-900/40 rounded-xl p-6 border transition-all duration-300 flex flex-col justify-between group ${
                      isBooked 
                        ? 'border-emerald-500/40 bg-emerald-950/10' 
                        : 'border-stone-800/80 hover:border-amber-500/40 hover:bg-stone-900/60'
                    }`}
                  >
                    <div>
                      {/* Header info */}
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
                          cls.category === 'Strength' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          cls.category === 'Cardio' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          cls.category === 'Mind & Body' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {cls.category}
                        </span>
                        
                        <div className="flex items-center gap-1 text-stone-400 text-xs font-semibold">
                          <Clock size={12} />
                          <span>{cls.duration}</span>
                        </div>
                      </div>

                      {/* Class Title */}
                      <h3 className="font-sans text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {cls.name}
                      </h3>
                      
                      <p className="mt-2 text-stone-400 text-xs leading-relaxed font-light line-clamp-2 h-10">
                        {cls.description}
                      </p>

                      {/* Info lines */}
                      <div className="mt-5 space-y-2 bg-stone-950/40 p-3 rounded-lg border border-stone-800/30">
                        <div className="flex items-center gap-2 text-xs text-stone-300">
                          <Clock size={12} className="text-amber-500 shrink-0" />
                          <span className="font-mono font-medium">{cls.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-300">
                          <User size={12} className="text-amber-500 shrink-0" />
                          <span>Coach: {cls.trainer}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-stone-400 pt-1 border-t border-stone-800/40 mt-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider">Level: {cls.level}</span>
                          <span className={`text-[10px] font-extrabold ${cls.spotsRemaining <= 3 ? 'text-red-400 animate-pulse' : 'text-stone-400'}`}>
                            {cls.spotsRemaining} spots left
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Book CTA */}
                    <div className="mt-6">
                      <button
                        onClick={() => handleOpenBooking(cls)}
                        className={`w-full py-3 rounded-lg text-xs uppercase font-extrabold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                          isBooked
                            ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                            : 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/5 group-hover:shadow-amber-500/10'
                        }`}
                      >
                        {isBooked ? (
                          <>
                            <CheckCircle2 size={13} />
                            <span>Spot Booked</span>
                          </>
                        ) : (
                          <span>Book Spot</span>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center text-stone-500 text-xs uppercase tracking-widest bg-stone-900/10 rounded-xl border border-dashed border-stone-800">
                No classes matching filter found on this day.
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Modal: Booking Spot Form */}
        <AnimatePresence>
          {bookingClass && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setBookingClass(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              ></motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-stone-900 border border-stone-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-6 text-white"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] text-amber-500 font-black tracking-widest uppercase block mb-1">SECURE YOUR SPACE</span>
                    <h3 className="text-xl font-bold font-sans">{bookingClass.name}</h3>
                    <p className="text-stone-400 text-xs mt-1">with Coach {bookingClass.trainer}</p>
                  </div>
                  <button
                    onClick={() => setBookingClass(null)}
                    className="p-1 rounded bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer text-stone-400 hover:text-white"
                  >
                    &times;
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleBookSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1.5">Your Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Jean Dupont"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1.5">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. jean@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800/40 text-xs space-y-1.5 text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Day &amp; Time</span>
                      <span className="font-mono text-white">{bookingClass.day} @ {bookingClass.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Duration</span>
                      <span className="text-white">{bookingClass.duration}</span>
                    </div>
                    <div className="flex justify-between border-t border-stone-800/60 pt-2 mt-1">
                      <span className="text-stone-500">Admission Fee</span>
                      <span className="text-green-400 font-bold uppercase">Included with Membership</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold uppercase text-xs tracking-widest rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/10 cursor-pointer"
                  >
                    Confirm Free Booking
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Booking Success */}
        <AnimatePresence>
          {showSuccessModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSuccessModal(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              ></motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-stone-900 border border-emerald-500/25 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-8 text-white text-center"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>

                <span className="text-[10px] text-emerald-400 font-black tracking-widest uppercase block mb-1">REGISTRATION SECURED</span>
                <h3 className="text-2xl font-black font-sans mb-2">You're on the list!</h3>
                <p className="text-stone-400 text-xs max-w-sm mx-auto leading-relaxed">
                  We've reserved a spot for <strong className="text-white font-medium">{showSuccessModal.userName}</strong>. A confirmation pass with instructions has been dispatched to <strong className="text-white font-medium">{showSuccessModal.userEmail}</strong>.
                </p>

                {/* Digital Ticket mock */}
                <div className="my-6 bg-stone-950 p-4 rounded-xl border border-stone-800 relative text-left">
                  <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-stone-900 rounded-full border-r border-stone-800"></div>
                  <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-stone-900 rounded-full border-l border-stone-800"></div>
                  
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-800/80">
                    <Ticket className="text-amber-500" size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">CG2 PASS</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="font-extrabold text-white text-sm">{showSuccessModal.className}</div>
                    <div className="text-stone-400">Day: <span className="text-stone-200">{showSuccessModal.classDay}</span></div>
                    <div className="text-stone-400">Time: <span className="font-mono text-stone-200">{showSuccessModal.classTime}</span></div>
                    <div className="text-[10px] font-mono text-stone-500 pt-2 border-t border-dashed border-stone-800/80 mt-2">
                      REF: {showSuccessModal.id.toUpperCase()}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowSuccessModal(null)}
                  className="w-full py-3.5 bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Close &bull; Got It
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
