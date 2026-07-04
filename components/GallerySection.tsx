import React, { useState } from 'react';
import { Image as ImageIcon, Maximize2, ShieldCheck, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Strength' | 'Recovery' | 'Yoga' | 'Smoothie';
  image: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Heavy Strength Zone',
    category: 'Strength',
    image: '/images/gym-interior.jpg',
    description: 'Our Dighori Naka training floor: multi-grip lat pulldowns, leg press, heavy-duty leg extensions, and free-weight zones.'
  },
  {
    id: 'gal-2',
    title: 'Real Member Transformation',
    category: 'Recovery',
    image: '/images/transformation-before-after.jpg',
    description: 'A real Challenger Gym 2 member transformation — visible results from consistent training and coaching under Gopi Kapse.'
  },
  {
    id: 'gal-3',
    title: 'Transformation & Posing Zone',
    category: 'Yoga', // Maps to the Yoga filter tab (which we will rename to Posing/Recovery)
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
    description: 'Dimmable ambient warm LED tray-lit area with full-length mirrors to check posture, symmetry and muscle definition.'
  },
  {
    id: 'gal-4',
    title: 'Challenger Nutrition & Supplement Bar',
    category: 'Smoothie', // Maps to Smoothie filter tab (which we will rename to Nutrition)
    image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&q=80&w=800',
    description: 'Stocked with high-quality certified whey isolates, essential amino acids, and professional contest diet materials.'
  },
  {
    id: 'gal-5',
    title: 'Heavyweight Dumbbell Bay',
    category: 'Strength',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800',
    description: 'Perfect for progressive hypertrophy. Premium dumbbells ranging from 2.5 kg to 50 kg arranged for quick access.'
  },
  {
    id: 'gal-6',
    title: 'Mobility & Posture Alignment Hub',
    category: 'Recovery',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    description: 'Personal analysis zone where Coach Gopi and team review physical posture, lifting form, and joint safety mechanics.'
  }
];

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Strength', 'Recovery', 'Yoga', 'Smoothie'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 bg-[#070707] border-t border-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
            <ImageIcon size={12} className="text-amber-500" />
            <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-amber-500">Visual Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-white uppercase">
            Challenger Gym 2 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Arena</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            Step inside Challenger Gym 2 in Dighori Naka, Nagpur. Equipped with imported Jerai Fitness strength machinery, active warm LED lighting, and personalized transformation decks.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/15 font-black'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white hover:border-stone-700'
              }`}
            >
              {cat === 'Yoga' ? 'Posing Deck' : cat === 'Smoothie' ? 'Nutrition Bar' : cat}
            </button>
          ))}
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative h-80 rounded-2xl overflow-hidden border border-stone-900 bg-stone-900/40 hover:border-amber-500/30 cursor-pointer transition-all duration-300"
            >
              {/* Image Overlay with lazy loading referral policy */}
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-6">
                <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest mb-1.5">
                  {item.category} Module
                </span>
                <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-stone-400 font-light leading-relaxed mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-stone-400 font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 size={10} className="text-amber-500" />
                  <span>Enlarge Venue Tour</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            ></motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-3xl w-full bg-stone-900 rounded-3xl border border-stone-850 overflow-hidden shadow-2xl z-10"
            >
              <div className="aspect-video relative">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm rounded-xl border border-white/10 text-white hover:bg-black transition-colors cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <div className="p-6 space-y-3 bg-stone-950">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">
                    {activeItem.category} Arena
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-stone-500 uppercase tracking-wider font-extrabold">
                    <ShieldCheck size={11} className="text-emerald-500" />
                    <span>Real Sanctuary Photography</span>
                  </div>
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {activeItem.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
