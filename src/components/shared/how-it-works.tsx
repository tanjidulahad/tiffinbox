"use client";

import { Variants,motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Browse chefs near you",
    description:
      "See daily menus from verified home chefs in your area, with photos and prices upfront.",
  },
  {
    number: "02",
    title: "Subscribe or order once",
    description:
      "Pick a weekly plan for regular meals, or order a single tiffin when you need it.",
  },
  {
    number: "03",
    title: "Track your delivery",
    description:
      "Know exactly when your meal is on its way, from the chef's kitchen to your door.",
  },
];

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
export function HowItWorks() {
  return (
      <section id="how-it-works" className="px-6 max-w-7xl mx-auto py-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-[#183B32]">How TiffinBox Works</h2>
          <p className="text-xs text-slate-500 mt-1">Simple steps to get your favorite meals.</p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: "📍", step: "01", title: "Find a Chef", desc: "Browse local home chefs by area and cuisine." },
            { icon: "🍱", step: "02", title: "Pick Your Meal", desc: "Order once or subscribe to your favorite meals." },
            { icon: "🛵", step: "03", title: "Enjoy", desc: "Get fresh meals delivered to your doorstep." }
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="flex flex-col items-center text-center">
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg mb-4 relative"
              >
                {item.icon}
                <span className="absolute -top-1 -right-1 bg-[#183B32] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </span>
              </motion.div>
              <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
  );
}