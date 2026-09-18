"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
export function Navbar() {
    const { data: session, status } = useSession()
    const [hidden, setHidden] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {

        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 300) {
            setHidden(true);
        } else {
            setHidden(false);
        }

    })

    console.log(session, status)

    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -50, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-slate-200/60"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="w-10 h-10 rounded-full bg-[#183B32] flex items-center justify-center text-orange-500 font-bold text-xl"
                    >
                        🍱
                    </motion.div>
                    <span className="text-xl font-bold tracking-tight text-[#183B32]">
                        Tiffin<span className="text-orange-500">Box</span>
                    </span>
                </Link>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <Link href="/" className="text-[#183B32] font-semibold border-b-2 border-[#183B32] pb-1">Home</Link>
                    <Link href="/chefs" className="hover:text-[#183B32] transition">Browse Chef</Link>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-slate-600">
                        <Search className="w-5 h-5" />
                    </motion.button>
                    {status != 'loading' && session ? <button onClick={() => signOut()} className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 cursor-pointer">
                        Log Out
                    </button>
                        :
                        <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-2">
                            Log in
                        </Link>
                    }
                    {session?.user && !session?.user.roles.includes("chef") && (
                        <Link href="/become-a-chef">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#183B32] hover:bg-[#112B24] text-white text-sm font-medium px-5 py-2.5 rounded-full flex items-center gap-2 transition shadow-sm cursor-pointer"
                        >

                            
                                Become a seller
                            

                            <ChevronRight className="w-4 h-4" />
                        </motion.button>
                        </Link>
                    )}
                </div>
            </div>
        </motion.header>
    );
}