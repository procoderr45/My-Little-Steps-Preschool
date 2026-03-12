"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Head from "next/head"
import { useRef } from "react"
import { schoolLocation, schoolName } from "@/utils/constants"
import { g, P } from "@/lib/colors"
import { useFadeUp } from "@/hooks/useFadeUp"
import { gt } from "@/lib/design-utils"

const tColors = [
    { grad: g.coral, sh: "rgba(255,107,107,0.32)" },
    { grad: g.sky, sh: "rgba(56,189,248,0.32)" },
    { grad: g.purple, sh: "rgba(168,85,247,0.32)" },
    { grad: g.amber, sh: "rgba(245,158,11,0.32)" },
]

export default function TeamCard({ name, role, qualification, emoji, delay, ci }: { name: string; role: string; qualification: string; emoji: string; delay: number; ci: number }) {
    const { ref, inView } = useFadeUp()
    const c = tColors[ci % tColors.length]
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -10, boxShadow: `0 32px 64px ${c.sh}` }}
            className="flex flex-col items-center text-center rounded-[32px] px-6 py-8 overflow-hidden"
            style={{ background: P.cream, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}>
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4"
                style={{ background: c.grad, boxShadow: `0 12px 32px ${c.sh}` }}>
                <span>{emoji}</span>
                <motion.div className="absolute inset-0 rounded-full"
                    style={{ border: "3px solid rgba(255,255,255,0.45)" }}
                    animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2.5 }} />
            </div>
            <h3 className="text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: P.dark }}>{name}</h3>
            <p className="mt-1 text-xs tracking-widest uppercase font-semibold" style={{ fontFamily: "'Jost', sans-serif", ...gt(c.grad) }}>{role}</p>
            <div className="mt-3 h-px w-12 mx-auto" style={{ background: c.grad }} />
            <p className="mt-3 text-xs leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "rgb(110,110,120)", fontWeight: 300 }}>{qualification}</p>
        </motion.div>
    )
}
