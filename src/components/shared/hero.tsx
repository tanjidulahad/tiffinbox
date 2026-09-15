"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, Star } from "lucide-react";

const todaysMenu = {
    chef: "Rahima's Kitchen",
    area: "Dhanmondi",
    dishes: ["Beef bhuna", "Steamed rice", "Mixed vegetable", "Dal"],
    price: "৳150",
};

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

export function Hero() {
    return (
      <section id="home" className="pt-8 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Fresh • Homemade • Local
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#183B32] leading-tight">
              Fresh Meals from <br />
              <span className="text-orange-500">Local Home Chefs</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-slate-600 text-base md:text-lg max-w-md leading-relaxed">
              Homemade food, right from your neighborhood. Discover trusted home chefs, explore daily menus, and enjoy fresh, delicious meals — delivered to you.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#183B32] hover:bg-[#112B24] text-white font-medium px-6 py-3 rounded-full flex items-center gap-2 transition shadow-md"
              >
                Explore Meals <ChevronRight className="w-4 h-4" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-6 py-3 rounded-full transition"
              >
                Become a Chef
              </motion.button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Verified Chefs
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Fresh Daily Meals
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Flexible Plans
              </span>
            </motion.div>
          </motion.div>

          {/* Right Visual Image Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200 aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" 
                alt="Fresh Meal" 
                className="w-full h-full object-cover"
              />
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-orange-600 shadow-sm"
              >
                Made with love ❤️
              </motion.div>
            </div>

            {/* Floating Chef Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center gap-4 max-w-xs"
            >
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200" 
                alt="Rina's Kitchen" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-800">Rina's Kitchen</h4>
                <p className="text-xs text-slate-500">5-Day Lunch Plan</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm font-bold text-[#183B32]">৳ 1,250</span>
                  <span className="flex items-center text-xs text-amber-500 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> 4.9
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
}