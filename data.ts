import { FitnessClass, Trainer, MembershipPlan, Testimonial } from './types';

export const TRAINERS: Trainer[] = [
  {
    id: "trainer-1",
    name: "Gopi Kapse",
    role: "Founder & Chief Master Trainer",
    bio: "Certified BOSS Master Trainer with 10+ years of bodybuilding and elite fitness coaching experience. Gopi specializes in biomechanics, custom transformation blueprints, and contest preparation.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600",
    specialties: ["Advanced Bodybuilding", "Contest Prep (BICP)", "Fat Loss & Recomp", "Biomechanics Training"],
    certs: [
      "BICP Master Trainer Level 1 - Practical",
      "Advanced Bodybuilding Training Techniques Certified",
      "KPT (Kettlebell Personal Training) Specialist",
      "Nutrition & Contest Prep Coach"
    ],
    quote: "Your body is a reflection of your commitment. Be disciplined, train smart, and the results will follow."
  },
  {
    id: "trainer-2",
    name: "Arjun Gowda",
    role: "Strength & Conditioning Coach",
    bio: "Arjun brings extreme focus to the gym floor, specializing in heavy compound mechanics, powerbuilding, and sports performance coaching. He helps clients build a bulletproof core and functional power.",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600",
    specialties: ["Powerbuilding", "Olympic Lifting Mechanics", "Core Hardening", "Joint Longevity"],
    certs: [
      "NASM Certified Personal Trainer",
      "Strength Coach Federation Certified",
      "First Aid & CPR Specialist"
    ],
    quote: "True strength isn't just what you lift; it's the posture, form, and grit you build along the way."
  },
  {
    id: "trainer-3",
    name: "Priya Sharma",
    role: "HIIT & Female Transformation Specialist",
    bio: "Priya specializes in metabolic conditioning, high-intensity intervals, and sustainable lifestyle modifications. She has coached over 500+ successful body transformations in Nagpur.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600",
    specialties: ["HIIT & Metcon", "Female Physique Sculpting", "Sustainable Diet Planning", "Mobility & Agility"],
    certs: [
      "ISSA Personal Trainer Certification",
      "Certified Fitness Nutrition Specialist",
      "Active HIIT Academy Director"
    ],
    quote: "Fitness is a lifelong journey. Find joy in consistency and celebrate your small wins every day."
  }
];

export const FITNESS_CLASSES: FitnessClass[] = [
  // Monday
  {
    id: "class-mon-1",
    name: "Compound Strength Max",
    description: "Focus on squats, deadlifts, and overhead presses under professional supervision. Built for core stability and raw athletic power.",
    duration: "60 min",
    trainer: "Arjun Gowda",
    time: "06:30 AM",
    level: "All Levels",
    spotsTotal: 15,
    spotsRemaining: 4,
    category: "Strength",
    day: "Monday"
  },
  {
    id: "class-mon-2",
    name: "Fat Burn Inferno (HIIT)",
    description: "High-intensity circuits designed to trigger massive sweat, maximize calorie burn, and supercharge your metabolism.",
    duration: "45 min",
    trainer: "Priya Sharma",
    time: "08:30 AM",
    level: "Intermediate",
    spotsTotal: 20,
    spotsRemaining: 12,
    category: "Cardio",
    day: "Monday"
  },
  {
    id: "class-mon-3",
    name: "Advanced Bodybuilding Prep",
    description: "Contest prep mechanics, muscle division training, and high-hypertrophy techniques focusing on posture and peak contractions.",
    duration: "60 min",
    trainer: "Gopi Kapse",
    time: "06:00 PM",
    level: "Advanced",
    spotsTotal: 12,
    spotsRemaining: 5,
    category: "Strength",
    day: "Monday"
  },
  {
    id: "class-mon-4",
    name: "Core Hardening & Mobility",
    description: "Strengthen the deep stabilizers of the spine and core while opening up tight joints for optimal flexibility.",
    duration: "60 min",
    trainer: "Arjun Gowda",
    time: "07:30 PM",
    level: "Beginner",
    spotsTotal: 25,
    spotsRemaining: 15,
    category: "Mind & Body",
    day: "Monday"
  },

  // Tuesday
  {
    id: "class-tue-1",
    name: "Metcon Power Circuit",
    description: "Functional cross-training circuits focusing on metabolic stamina and fat depletion using kettlebells and ropes.",
    duration: "60 min",
    trainer: "Priya Sharma",
    time: "07:00 AM",
    level: "Beginner",
    spotsTotal: 15,
    spotsRemaining: 3,
    category: "Crossfit",
    day: "Tuesday"
  },
  {
    id: "class-tue-2",
    name: "BICP Body Transformation",
    description: "Exclusive transformation blueprint session detailing heavy eccentric contractions, lifting angles, and customized form checks.",
    duration: "60 min",
    trainer: "Gopi Kapse",
    time: "05:30 PM",
    level: "Advanced",
    spotsTotal: 10,
    spotsRemaining: 2,
    category: "Strength",
    day: "Tuesday"
  },
  {
    id: "class-tue-3",
    name: "Athletic Conditioning",
    description: "Explosive plyometrics and rapid agility drills to build quick reflex coordination and functional stamina.",
    duration: "60 min",
    trainer: "Arjun Gowda",
    time: "07:00 PM",
    level: "All Levels",
    spotsTotal: 22,
    spotsRemaining: 18,
    category: "Cardio",
    day: "Tuesday"
  },

  // Wednesday
  {
    id: "class-wed-1",
    name: "Metabolic HIIT Blast",
    description: "Explosive cardiorespiratory circuit designed for rapid fat burn and core activation using dynamic bodyweight motions.",
    duration: "45 min",
    trainer: "Priya Sharma",
    time: "06:30 AM",
    level: "Intermediate",
    spotsTotal: 18,
    spotsRemaining: 5,
    category: "Cardio",
    day: "Wednesday"
  },
  {
    id: "class-wed-2",
    name: "Hypertrophy Workshop",
    description: "High-volume bodybuilding drills designed to target specific muscle groups to achieve ultimate pump and metabolic failure.",
    duration: "60 min",
    trainer: "Gopi Kapse",
    time: "10:30 AM",
    level: "Intermediate",
    spotsTotal: 15,
    spotsRemaining: 9,
    category: "Strength",
    day: "Wednesday"
  },
  {
    id: "class-wed-3",
    name: "Powerbuilding Compound Work",
    description: "Deep dive into back squats, heavy deadlifts, and raw bench-press mechanical efficiency. Maximize lifting safety.",
    duration: "60 min",
    trainer: "Arjun Gowda",
    time: "06:30 PM",
    level: "Advanced",
    spotsTotal: 12,
    spotsRemaining: 7,
    category: "Strength",
    day: "Wednesday"
  },

  // Thursday
  {
    id: "class-thu-1",
    name: "Active Recovery & Mobility",
    description: "Gently decompress the spine, release joint tightness, and promote faster muscle recovery via active stretches.",
    duration: "60 min",
    trainer: "Priya Sharma",
    time: "08:30 AM",
    level: "All Levels",
    spotsTotal: 20,
    spotsRemaining: 14,
    category: "Mind & Body",
    day: "Thursday"
  },
  {
    id: "class-thu-2",
    name: "Contest Prep Masterclass",
    description: "Elite stage posing, body re-composition macros, calorie cycling guides, and contest readiness secrets.",
    duration: "60 min",
    trainer: "Gopi Kapse",
    time: "05:00 PM",
    level: "Advanced",
    spotsTotal: 15,
    spotsRemaining: 11,
    category: "Strength",
    day: "Thursday"
  },

  // Friday
  {
    id: "class-fri-1",
    name: "Full Body Mass Builder",
    description: "Classic high-intensity lifting program targeting major muscle groups for balanced muscle hypertrophy and strength.",
    duration: "60 min",
    trainer: "Arjun Gowda",
    time: "06:30 AM",
    level: "All Levels",
    spotsTotal: 18,
    spotsRemaining: 6,
    category: "Strength",
    day: "Friday"
  },
  {
    id: "class-fri-2",
    name: "HIIT & Cardio Shred",
    description: "Tabata intervals, rope slams, and metabolic ladder drills to shred stubborn body fat and skyrocket stamina.",
    duration: "45 min",
    trainer: "Priya Sharma",
    time: "05:30 PM",
    level: "Advanced",
    spotsTotal: 15,
    spotsRemaining: 4,
    category: "Cardio",
    day: "Friday"
  },
  {
    id: "class-fri-3",
    name: "Transformation Check-In",
    description: "Group consultation. Personalized body fat analysis, diet logs evaluation, and progress reviews by Gopi Kapse.",
    duration: "60 min",
    trainer: "Gopi Kapse",
    time: "07:00 PM",
    level: "All Levels",
    spotsTotal: 30,
    spotsRemaining: 21,
    category: "Mind & Body",
    day: "Friday"
  },

  // Saturday
  {
    id: "class-sat-1",
    name: "Weekend Warrior Shred",
    description: "Fun, team-style high-energy strength and stamina circuit. Push your limits alongside a high-vibing community.",
    duration: "75 min",
    trainer: "Arjun Gowda",
    time: "09:00 AM",
    level: "Intermediate",
    spotsTotal: 25,
    spotsRemaining: 8,
    category: "Crossfit",
    day: "Saturday"
  },
  {
    id: "class-sat-2",
    name: "Functional Stretch & Breathe",
    description: "Gentle recovery breathing, somatic myofascial stretching, and flexibility flows for immediate relief.",
    duration: "60 min",
    trainer: "Priya Sharma",
    time: "11:00 AM",
    level: "Beginner",
    spotsTotal: 25,
    spotsRemaining: 19,
    category: "Mind & Body",
    day: "Saturday"
  },

  // Sunday
  {
    id: "class-sun-1",
    name: "Elite Heavy Power Session",
    description: "Advanced heavy compound lift practice. Learn mental cues for breaking lifting plateaus safely and confidently.",
    duration: "90 min",
    trainer: "Gopi Kapse",
    time: "10:00 AM",
    level: "Advanced",
    spotsTotal: 15,
    spotsRemaining: 3,
    category: "Strength",
    day: "Sunday"
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "plan-essential",
    name: "Basic Plan",
    price: 999,
    billing: "per month",
    features: [
      "Gym Access",
      "Basic Equipment",
      "Locker Room"
    ],
    badge: "Most Affordable"
  },
  {
    id: "plan-premium",
    name: "Premium Plan",
    price: 1799,
    billing: "per month",
    features: [
      "Gym Access",
      "All Group Classes",
      "Personal Trainer (2 Sessions)",
      "Diet Consultation"
    ],
    popular: true,
    badge: "Best Value (Popular)"
  },
  {
    id: "plan-elite",
    name: "Elite Plan",
    price: 2999,
    billing: "per month",
    features: [
      "All Premium Benefits",
      "Personal Trainer (4 Sessions)",
      "Customized Diet Plan",
      "Body Composition Analysis"
    ],
    badge: "Ultimate Transformation"
  }
];

export const BASE_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Amit Kumar",
    role: "Transformation Gold Member",
    review: "Joining Challenger Gym 2 changed my life. Under Gopi Kapse sir's precise guidance, I dropped 14 kg of fat and built serious muscle. He is a BOSS certified Master Trainer and his knowledge of biomechanics is on another level. Highly recommended gym in Dighori Naka, Nagpur!",
    rating: 5,
    results: "Lost 14 kg, Chest +3 inches",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    date: "May 2026"
  },
  {
    id: "test-2",
    name: "Rohan Deshmukh",
    role: "Elite VIP Member",
    review: "Best transformation center in Nagpur. If you want real results, look no further than Gopi Sir. His contest prep and advanced bodybuilding classes completely transformed my physique. The before-after records in this gym speak for themselves.",
    rating: 5,
    results: "Competed in bodybuilding & gained 8kg lean mass",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    date: "June 2026"
  },
  {
    id: "test-3",
    name: "Sneha Reddy",
    role: "Transformation Gold Member",
    review: "I was super skeptical of personal trainers, but Challenger Gym 2 is awesome. Priya and Arjun are extremely helpful and respectful. The community here is motivating, and Gopi sir ensures everyone lifts with correct posture. I feel so much stronger!",
    rating: 5,
    results: "Dropped 8% Body Fat, Squat PB 80kg",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    date: "April 2026"
  },
  {
    id: "test-4",
    name: "Himanshu Verma",
    role: "Strength Member",
    review: "Clean, well-equipped floor and honestly one of the better-managed gyms on Umred Road. The trainers actually correct your form instead of just standing around, which makes a real difference.",
    rating: 5,
    results: "Consistent 5-day training routine for 6 months",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=200",
    date: "March 2026"
  },
  {
    id: "test-5",
    name: "Manish Thakre",
    role: "Premium Plan Member",
    review: "Good expansion from the original branch — more equipment and more space to train without waiting around during peak hours. Staff is friendly and the diet guidance actually works.",
    rating: 4,
    results: "Improved bench press by 15kg",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=200",
    date: "February 2026"
  }
];
