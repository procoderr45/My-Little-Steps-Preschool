// components/school/ValueCard.tsx
"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

function useFadeUp() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    return { ref, inView }
}

const vColors = [
    { bg: "rgba(255,107,107,0.07)", border: "rgba(255,107,107,0.22)", accent: "#FF6B6B", iBg: "rgba(255,107,107,0.12)" },
    { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.22)", accent: "#F59E0B", iBg: "rgba(245,158,11,0.12)" },
    { bg: "rgba(56,189,248,0.07)", border: "rgba(56,189,248,0.22)", accent: "#38BDF8", iBg: "rgba(56,189,248,0.12)" },
    { bg: "rgba(168,85,247,0.07)", border: "rgba(168,85,247,0.22)", accent: "#A855F7", iBg: "rgba(168,85,247,0.12)" },
    { bg: "rgba(13,148,136,0.07)", border: "rgba(13,148,136,0.22)", accent: "#0D9488", iBg: "rgba(13,148,136,0.12)" },
    { bg: "rgba(236,72,153,0.07)", border: "rgba(236,72,153,0.22)", accent: "#EC4899", iBg: "rgba(236,72,153,0.12)" },
]

export function ValueCard({ icon, title, desc, delay, ci }: {
    icon: string; title: string; desc: string; delay: number; ci: number
}) {
    const { ref, inView } = useFadeUp()
    const c = vColors[ci % vColors.length]

    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 50, rotate: -1.5 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            whileHover={{ y: -8, rotate: 0.5, boxShadow: `0 24px 60px ${c.accent}28` }}
            className="group relative rounded-[28px] p-7 overflow-hidden cursor-default"
            style={{ background: c.bg, border: `1.5px solid ${c.border}` }}>
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]" style={{ background: c.accent }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-[28px] transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 25% 25%, ${c.accent}10, transparent 70%)` }} />
            <div className="mb-5 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: c.iBg, border: `1px solid ${c.accent}25` }}>
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A2E", fontSize: "1.2rem" }}>
                {title}
            </h3>
            <p className="text-sm leading-relaxed"
                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,90,100)", fontWeight: 300 }}>
                {desc}
            </p>
        </motion.div>
    )
}