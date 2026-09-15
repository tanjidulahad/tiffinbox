"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";
import {motion} from "framer-motion"

export function BecomeChefCta() {
    return (
      <section id="for-chefs" className="px-6 max-w-7xl mx-auto py-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#183B32] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-md space-y-4 z-10">
            <p className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">Love cooking?</p>
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
              Turn your home kitchen into something more.
            </h2>
            <ul className="space-y-1.5 text-xs text-emerald-100">
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Create your kitchen profile</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Post daily menu</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Manage orders</li>
              <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Track earnings</li>
            </ul>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-amber-300 hover:bg-amber-400 text-slate-900 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition mt-4"
            >
              Become a Home Chef <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="relative z-10 w-full md:w-1/2 flex justify-end">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden border-2 border-emerald-800 shadow-xl max-w-sm"
            >
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600" 
                alt="Chef Cooking" 
                className="w-full h-56 object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
}