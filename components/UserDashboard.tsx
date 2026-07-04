import React, { useState, useEffect } from 'react';
import { ClassBooking, TrainerConsultation, UserProgressLog } from '../types';
import { Barcode, Calendar, Trash2, Dumbbell, Coffee, Award, Flame, Plus, CheckCircle, Smile, RefreshCw, Sparkles, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserDashboardProps {
  bookedClasses: ClassBooking[];
  bookedConsultations: TrainerConsultation[];
  onCancelClass: (id: string) => void;
  onCancelConsultation: (id: string) => void;
  membership: { planName: string; memberId: string } | null;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  bookedClasses,
  bookedConsultations,
  onCancelClass,
  onCancelConsultation,
  membership
}) => {
  // Interactive workout log state
  const [logs, setLogs] = useState<UserProgressLog[]>([]);
  const [showAddLog, setShowAddLog] = useState(false);
  const [newLog, setNewLog] = useState({
    waterIntake: 1000, // ml
    workoutDuration: 45, // mins
    workoutType: 'Strength & Weights',
    mood: 'Great' as "Great" | "Good" | "Tired" | "Sore" | "Lazy",
  });

  const [toastMessage, setToastMessage] = useState<string>('');

  // Hydrate workout logs from localStorage on load
  useEffect(() => {
    const savedLogs = localStorage.getItem('gk_workout_logs');
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (e) {
        console.error("Failed to parse logs", e);
      }
    } else {
      // Seed some nice default historical progress
      const initialLogs: UserProgressLog[] = [
        {
          id: 'log-1',
          date: '02/07/2026',
          waterIntake: 2000,
          workoutDuration: 60,
          workoutType: 'Metabolic Conditioning',
          mood: 'Good'
        },
        {
          id: 'log-2',
          date: '01/07/2026',
          waterIntake: 2500,
          workoutDuration: 75,
          workoutType: 'Hypertrophy Strength',
          mood: 'Great'
        }
      ];
      setLogs(initialLogs);
      localStorage.setItem('gk_workout_logs', JSON.stringify(initialLogs));
    }
  }, []);

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    const log: UserProgressLog = {
      id: `log-${Date.now()}`,
      date: new Date().toLocaleDateString('fr-FR'), // Standard clean format
      waterIntake: newLog.waterIntake,
      workoutDuration: newLog.workoutDuration,
      workoutType: newLog.workoutType,
      mood: newLog.mood
    };

    const updated = [log, ...logs];
    setLogs(updated);
    localStorage.setItem('gk_workout_logs', JSON.stringify(updated));
    setShowAddLog(false);

    setToastMessage("Daily training progress logged successfully!");
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleClearLogs = () => {
    setLogs([]);
    localStorage.removeItem('gk_workout_logs');
    setToastMessage("Progress history cleared.");
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Calculate stats
  const totalWorkouts = logs.length;
  const totalWater = logs.reduce((acc, log) => acc + log.waterIntake, 0);
  const avgWater = totalWorkouts > 0 ? Math.round(totalWater / totalWorkouts) : 0;
  const totalDuration = logs.reduce((acc, log) => acc + log.workoutDuration, 0);

  // Calculate streak (consecutive days of logs, simplified to mock nice counts)
  const streakCount = totalWorkouts > 0 ? totalWorkouts + 1 : 0;

  return (
    <section id="dashboard" className="py-24 bg-stone-900 text-white relative">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-500 block mb-3">MY CG2 WORKSPACE</span>
          <h2 className="font-sans text-4xl sm:text-5xl font-black tracking-tight text-white">
            YOUR TRAINING <span className="italic font-light text-stone-200">PORTAL</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-400 font-light">
            Manage your memberships, review scheduled classes, book private trainer consultations, and log your daily progress metrics in real-time.
          </p>
        </div>

        {/* Floating Success Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed bottom-10 right-10 z-50 flex items-center gap-2.5 bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-2xl border border-emerald-400"
            >
              <CheckCircle size={16} />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Membership card, Stats, Quick Bookings list (Lg: col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Membership Details */}
            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-850 shadow-xl relative overflow-hidden">
              <h3 className="text-sm font-black uppercase tracking-wider text-amber-500 mb-4 flex items-center gap-1.5">
                <Award size={16} /> Active Membership Pass
              </h3>

              {membership ? (
                <div className="bg-gradient-to-r from-stone-900 to-stone-950 p-5 rounded-xl border border-amber-500/20 text-left relative overflow-hidden shadow-inner">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/[0.03] rounded-full blur-xl"></div>
                  
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <div className="font-sans font-black text-sm tracking-tighter text-white">CHALLENGER<span className="text-amber-500 font-medium"> GYM 2</span></div>
                      <div className="text-[7px] text-stone-500 uppercase tracking-widest font-bold">ACTIVE DIGITAL CODE</div>
                    </div>
                    <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded text-[8px] font-black uppercase text-amber-400">
                      {membership.planName}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4 text-xs">
                    <div>
                      <div className="text-[8px] text-stone-500 uppercase font-bold">MEMBER NAME</div>
                      <div className="font-bold text-white">Amit Kumar (You)</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-[8px] text-stone-500 uppercase font-bold">MEMBER ID</div>
                        <div className="font-mono text-stone-300 font-bold">{membership.memberId}</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-stone-500 uppercase font-bold">PASS STATUS</div>
                        <div className="text-green-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Authorized
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-2 rounded flex flex-col items-center">
                    <Barcode className="text-stone-900 w-full h-7 stroke-[1.2]" />
                    <span className="text-[8px] font-mono text-stone-600 mt-1 tracking-widest font-bold">
                      {membership.memberId}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 border border-dashed border-stone-800 rounded-xl space-y-4">
                  <p className="text-xs text-stone-400 font-light max-w-xs mx-auto">
                    You do not currently possess an active physical pass. Acquire a trial or membership plan to generate a digital entry pass.
                  </p>
                  <a
                    href="#memberships"
                    className="inline-block px-4 py-2 bg-amber-500 text-black text-xs font-black uppercase tracking-wider rounded-lg shadow-lg hover:bg-amber-400"
                  >
                    Select Plan
                  </a>
                </div>
              )}
            </div>

            {/* Live Progress Logs Metrics */}
            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-850 shadow-xl relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                  <Flame size={16} /> Bio Tracker Stats
                </h3>
                {logs.length > 0 && (
                  <button onClick={handleClearLogs} className="text-[10px] text-stone-500 hover:text-red-400 transition-colors cursor-pointer">
                    Clear Logs
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-stone-900/60 p-3 rounded-lg border border-stone-800/40 text-center">
                  <div className="text-[8px] text-stone-500 uppercase tracking-widest font-bold">Active Streak</div>
                  <div className="text-xl font-sans font-black text-white mt-1 flex items-center justify-center gap-1">
                    <Flame size={16} className="text-amber-500 fill-amber-500/20" />
                    <span>{streakCount} d</span>
                  </div>
                </div>
                <div className="bg-stone-900/60 p-3 rounded-lg border border-stone-800/40 text-center">
                  <div className="text-[8px] text-stone-500 uppercase tracking-widest font-bold">Logs Entered</div>
                  <div className="text-xl font-sans font-black text-white mt-1">{totalWorkouts}</div>
                </div>
                <div className="bg-stone-900/60 p-3 rounded-lg border border-stone-800/40 text-center">
                  <div className="text-[8px] text-stone-500 uppercase tracking-widest font-bold">Avg Hydration</div>
                  <div className="text-xl font-sans font-black text-white mt-1 font-mono">{avgWater} ml</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-850/60">
                {logs.length > 0 ? (
                  <div className="flex items-center gap-2 text-xs text-stone-400 font-light">
                    <Sparkles size={14} className="text-amber-500 shrink-0" />
                    <span>
                      Total energy spent: <strong className="text-white font-medium">{totalDuration} minutes</strong> of explosive conditioning!
                    </span>
                  </div>
                ) : (
                  <p className="text-[11px] text-stone-500 text-center font-light py-2">
                    Start logging water, workout sessions, and mood metrics to populate statistics.
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Bookings list & Interactive progress log logger (Lg: col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Class Bookings List */}
            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-850 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-amber-500 mb-4 flex items-center gap-1.5">
                <Calendar size={16} /> My Scheduled Bookings
              </h3>

              {bookedClasses.length === 0 && bookedConsultations.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-stone-800 rounded-xl">
                  <p className="text-xs text-stone-400 font-light max-w-xs mx-auto">
                    You have no active class reservations or trainer consultations scheduled for this week.
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">Explore the schedule above to reserve a spot.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  
                  {/* Classes */}
                  {bookedClasses.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 bg-stone-900/40 border border-stone-850 hover:border-stone-800 transition-all rounded-xl flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> CLASS PASS
                        </div>
                        <h4 className="text-sm font-bold text-white">{booking.className}</h4>
                        <p className="text-[11px] text-stone-400">
                          {booking.classDay} &bull; <span className="font-mono text-stone-200">{booking.classTime}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => onCancelClass(booking.id)}
                        className="p-2 bg-stone-950 hover:bg-stone-800 rounded-lg border border-stone-800 text-stone-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Cancel Booking"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}

                  {/* Consultations */}
                  {bookedConsultations.map((consult) => (
                    <div
                      key={consult.id}
                      className="p-4 bg-stone-900/40 border border-stone-850 hover:border-stone-800 transition-all rounded-xl flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-black uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> COACH CONSULTATION
                        </div>
                        <h4 className="text-sm font-bold text-white">With {consult.trainerName}</h4>
                        <p className="text-[11px] text-stone-400">
                          {consult.date} &bull; <span className="font-mono text-stone-200">{consult.time}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => onCancelConsultation(consult.id)}
                        className="p-2 bg-stone-950 hover:bg-stone-800 rounded-lg border border-stone-800 text-stone-400 hover:text-red-400 transition-colors cursor-pointer"
                        title="Cancel Consultation"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}

                </div>
              )}
            </div>

            {/* Daily Training Log (Interactive Tracker module) */}
            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-850 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                    <Dumbbell size={16} /> Daily Workout Progress Logs
                  </h3>
                  <p className="text-[10px] text-stone-500 mt-0.5 font-light">Input your active daily metrics to build your streak and stay accountable.</p>
                </div>
                
                <button
                  onClick={() => setShowAddLog(!showAddLog)}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[10px] uppercase tracking-widest rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-lg shadow-amber-500/10"
                >
                  <Plus size={12} />
                  <span>Log Entry</span>
                </button>
              </div>

              {/* Collapsible Log Entry Form */}
              <AnimatePresence>
                {showAddLog && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-6 bg-stone-900/40 p-4 sm:p-5 rounded-xl border border-stone-850"
                  >
                    <form onSubmit={handleSaveLog} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Workout Duration slider */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400">Workout Duration</label>
                          <div className="flex justify-between items-center">
                            <input
                              type="range"
                              min="10"
                              max="180"
                              step="5"
                              value={newLog.workoutDuration}
                              onChange={(e) => setNewLog({ ...newLog, workoutDuration: parseInt(e.target.value) })}
                              className="w-2/3 accent-amber-500 bg-stone-950 h-1 rounded cursor-pointer"
                            />
                            <span className="font-mono text-xs font-bold text-amber-400">{newLog.workoutDuration} mins</span>
                          </div>
                        </div>

                        {/* Water intake slider */}
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400">Water Hydration</label>
                          <div className="flex justify-between items-center">
                            <input
                              type="range"
                              min="250"
                              max="4000"
                              step="250"
                              value={newLog.waterIntake}
                              onChange={(e) => setNewLog({ ...newLog, waterIntake: parseInt(e.target.value) })}
                              className="w-2/3 accent-amber-500 bg-stone-950 h-1 rounded cursor-pointer"
                            />
                            <span className="font-mono text-xs font-bold text-amber-400">{newLog.waterIntake} ml</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Workout Type */}
                        <div>
                          <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Activity Type</label>
                          <select
                            value={newLog.workoutType}
                            onChange={(e) => setNewLog({ ...newLog, workoutType: e.target.value })}
                            className="w-full bg-stone-950 border border-stone-850 rounded px-2.5 py-2 text-xs text-white focus:outline-none"
                          >
                            <option value="Strength &amp; Weights">Strength &amp; Weights</option>
                            <option value="Metabolic Conditioning (HIIT)">Metabolic Conditioning (HIIT)</option>
                            <option value="Restorative Flow Yoga">Restorative Flow Yoga</option>
                            <option value="Bodyweight Gymnastics">Bodyweight Gymnastics</option>
                            <option value="Cardio Running / Cycling">Cardio Running / Cycling</option>
                            <option value="Rest / Active Recovery">Rest / Active Recovery</option>
                          </select>
                        </div>

                        {/* Mood selector */}
                        <div>
                          <label className="block text-[10px] font-black tracking-wider uppercase text-stone-400 mb-1">Body Feeling</label>
                          <div className="flex gap-2">
                            {(["Great", "Good", "Tired", "Sore", "Lazy"] as const).map((md) => (
                              <button
                                key={md}
                                type="button"
                                onClick={() => setNewLog({ ...newLog, mood: md })}
                                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded border transition-colors cursor-pointer ${
                                  newLog.mood === md
                                    ? 'bg-amber-500 border-amber-500 text-black font-extrabold'
                                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                                }`}
                              >
                                {md}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-stone-800 hover:bg-stone-750 border border-stone-700 hover:border-amber-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
                      >
                        Commit Daily Log
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress logs list */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3.5 bg-stone-900/20 border border-stone-850/80 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 h-9 h-9 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-amber-500">
                        <Check size={14} />
                      </div>
                      <div>
                        <div className="font-extrabold text-white">{log.workoutType}</div>
                        <div className="text-[10px] text-stone-500">
                          {log.date} &bull; Spent {log.workoutDuration} mins &bull; Drank {log.waterIntake}ml water
                        </div>
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                      log.mood === 'Great' ? 'bg-emerald-500/10 text-emerald-400' :
                      log.mood === 'Good' ? 'bg-blue-500/10 text-blue-400' :
                      log.mood === 'Tired' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {log.mood}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
