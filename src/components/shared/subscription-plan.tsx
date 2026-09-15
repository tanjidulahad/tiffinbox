"use client";

import {motion, Variants} from "framer-motion"
import { Check } from "lucide-react";

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
export default function SubscriptionPlane() {
  return (
      <section className="px-6 max-w-7xl mx-auto py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-[#183B32]">Make Your Weekdays Easier</h2>
          <p className="text-xs text-slate-500 mt-1">Subscribe to meals. Skip the daily lunch hassle.</p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch"
        >
          {/* Plan 1 */}
          <motion.div variants={fadeInUp} whileHover={{ y: -6 }} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-800">5-Day Lunch Plan</h3>
              <p className="text-xs text-slate-400 mt-0.5">Mon – Fri</p>
              <div className="my-4">
                <span className="text-2xl font-extrabold text-[#183B32]">৳ 1,250</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 5 healthy meals</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Free delivery (selected areas)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Flexible menu</li>
              </ul>
            </div>
            <motion.button whileTap={{ scale: 0.95 }} className="w-full py-2.5 bg-orange-100 hover:bg-orange-200 text-orange-900 rounded-xl font-semibold text-xs transition">
              Subscribe
            </motion.button>
          </motion.div>

          {/* Plan 2 - Featured */}
          <motion.div variants={fadeInUp} whileHover={{ y: -8 }} className="bg-white rounded-2xl p-6 border-2 border-orange-500 shadow-xl flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Most Popular
            </span>
            <div>
              <h3 className="font-bold text-slate-800">7-Day Plan</h3>
              <p className="text-xs text-slate-400 mt-0.5">Mon – Sun</p>
              <div className="my-4">
                <span className="text-2xl font-extrabold text-[#183B32]">৳ 1,750</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 5 healthy meals</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Free delivery (selected areas)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Flexible menu</li>
              </ul>
            </div>
            <motion.button whileTap={{ scale: 0.95 }} className="w-full py-2.5 bg-[#183B32] hover:bg-[#112B24] text-white rounded-xl font-semibold text-xs transition">
              Subscribe
            </motion.button>
          </motion.div>

          {/* Plan 3 */}
          <motion.div variants={fadeInUp} whileHover={{ y: -6 }} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-800">Monthly Plan</h3>
              <p className="text-xs text-slate-400 mt-0.5">30 Days</p>
              <div className="my-4">
                <span className="text-2xl font-extrabold text-[#183B32]">৳ 4,500</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 5 healthy meals</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Free delivery (selected areas)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Flexible menu</li>
              </ul>
            </div>
            <motion.button whileTap={{ scale: 0.95 }} className="w-full py-2.5 bg-orange-100 hover:bg-orange-200 text-orange-900 rounded-xl font-semibold text-xs transition">
              Subscribe
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
  )
}
