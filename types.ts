export interface FitnessClass {
  id: string;
  name: string;
  description: string;
  duration: string; // e.g. "60 min"
  trainer: string;
  time: string; // e.g. "08:00 AM"
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  spotsTotal: number;
  spotsRemaining: number;
  category: "Strength" | "Cardio" | "Mind & Body" | "Combat" | "Crossfit";
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string; // URL
  specialties: string[];
  certs: string[];
  quote: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  billing: string; // e.g. "per month", "per year"
  features: string[];
  badge?: string;
  popular?: boolean;
}

export interface ClassBooking {
  id: string;
  classId: string;
  className: string;
  classTime: string;
  classDay: string;
  userName: string;
  userEmail: string;
  bookedAt: string;
}

export interface TrainerConsultation {
  id: string;
  trainerId: string;
  trainerName: string;
  userName: string;
  userEmail: string;
  date: string;
  time: string;
  notes?: string;
  bookedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  results?: string; // e.g. "Lost 20 lbs", "Built 12 lbs muscle"
  image?: string;
  date: string;
}

export interface UserProgressLog {
  id: string;
  date: string;
  waterIntake: number; // in ml
  weight?: number; // in kg or lbs
  workoutDuration: number; // in mins
  workoutType: string;
  mood: "Great" | "Good" | "Tired" | "Sore" | "Lazy";
}
