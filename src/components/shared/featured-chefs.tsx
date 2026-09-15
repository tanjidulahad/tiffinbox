"use client";

import { ChevronRight, Heart, Star } from "lucide-react";
import {motion, Variants} from "framer-motion"


const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function FeaturedChefs() {
  return (
      <section className="px-6 max-w-7xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#183B32]">Meet Your Neighborhood Chefs</h2>
            <p className="text-xs text-slate-500 mt-1">Fresh meals from kitchens near you.</p>
          </div>
          <a href="#" className="text-xs font-semibold text-[#183B32] hover:underline flex items-center gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </a>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{once:true}}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              name: "Rina's Kitchen",
              location: "Dhaka, Dhanmondi",
              rating: "4.9 (120+)",
              price: "৳ 120",
              tag: "Bestseller",
              image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400",
              avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100"
            },
            {
              name: "Maya's Kitchen",
              location: "Dhaka, Mirpur",
              rating: "4.9 (96+)",
              price: "৳ 150",
              image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400",
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100"
            },
            {
              name: "Amina's Kitchen",
              location: "Dhaka, Uttara",
              rating: "4.9 (76+)",
              price: "৳ 180",
              image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
              avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100"
            },
            {
              name: "Shanta's Kitchen",
              location: "Dhaka, Gulshan",
              rating: "4.7 (64+)",
              price: "৳ 140",
              image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=400",
              avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=100"
            }
          ].map((chef, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition duration-300 group"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={chef.image} alt={chef.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <motion.button whileTap={{ scale: 0.8 }} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-red-500 transition">
                  <Heart className="w-4 h-4" />
                </motion.button>
                {chef.tag && (
                  <span className="absolute bottom-3 left-3 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {chef.tag}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img src={chef.avatar} alt={chef.name} className="w-6 h-6 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 leading-none">{chef.name}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{chef.location}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-3">
                  <div className="flex items-center text-xs font-semibold text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                    {chef.rating}
                  </div>
                  <span className="font-extrabold text-sm text-[#183B32]">{chef.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
  );
}