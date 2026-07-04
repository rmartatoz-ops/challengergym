# Challenger Gym 2 — Website

Official website for **Challenger Gym 2**, a premium bodybuilding, strength &
transformation gym located in Dighori Naka, Umred Road, Nagpur, led by
BICP-certified Master Trainer Gopi Kapse. Rated 4.8/5 (106+ reviews on Justdial).

## Tech Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS (via CDN)
- Framer Motion for animation

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. Build for production:
   `npm run build`

## Project Structure
- `App.tsx` — page layout & state management (bookings, membership, testimonials)
- `components/` — Header, Hero, Class Scheduler, Membership Calculator, Trainer
  Profiles, Gallery, Testimonials, FAQ, Contact Form, User Dashboard
- `data.ts` — trainers, class schedule, membership plans, testimonials
- `public/images/` — real gym photography

## Before Going Live
Update the following placeholders with your real business details:
- Phone number & email in `components/ContactForm.tsx` and `components/FloatingWidgets.tsx`
- WhatsApp number link in `components/FloatingWidgets.tsx` and `components/MembershipCalculator.tsx`
- Instagram/Facebook links in `App.tsx` footer
- Production domain in `index.html`, `sitemap.xml`, `robots.txt` (currently placeholder `challengergym2.in`)
- The testimonials in `data.ts` are illustrative placeholders styled after the gym's real 4.8/5 (106 reviews) Justdial rating — swap in actual member reviews/photos once collected
- Verify postal code: Google Maps/PinPointly list 440034, Justdial lists 440024 for the same address — confirm the correct one with local authorities
