"use client"

import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { useRef, useState } from "react"
import { schoolName, schoolLocation } from "@/utils/constants"

const P = {
    coral: "#FF6B6B", orange: "#FF8E53", amber: "#F59E0B",
    teal: "#0D9488", sky: "#38BDF8", indigo: "#6366F1",
    purple: "#A855F7", pink: "#EC4899", cream: "#FFFDF8", dark: "#1A1A2E",
}
const g = {
    coral: `linear-gradient(135deg, ${P.coral}, ${P.orange})`,
    amber: `linear-gradient(135deg, ${P.amber}, #FCD34D)`,
    teal: `linear-gradient(135deg, ${P.teal}, #059669)`,
    sky: `linear-gradient(135deg, ${P.sky}, ${P.indigo})`,
    purple: `linear-gradient(135deg, ${P.purple}, ${P.pink})`,
    rainbow: `linear-gradient(90deg, ${P.coral}, ${P.amber}, ${P.teal}, ${P.sky}, ${P.purple})`,
    rainbowDiag: `linear-gradient(135deg, ${P.coral} 0%, ${P.amber} 25%, ${P.teal} 50%, ${P.sky} 75%, ${P.purple} 100%)`,
}
function gt(gradient: string) {
    return { background: gradient, WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const, backgroundClip: "text" as const }
}

const QUICK_LINKS = [
    { label: "Home", href: "/", color: P.coral },
    { label: "About Us", href: "/about", color: P.teal },
    { label: "Programs", href: "/programs", color: P.sky },
    { label: "Gallery", href: "/gallery", color: P.purple },
    { label: "Admissions", href: "/admissions", color: P.amber },
    { label: "Contact", href: "/contact", color: P.pink },
]

const PROGRAMS = [
    { label: "Playgroup (1.5–2.5 yrs)", color: P.coral },
    { label: "Nursery (2.5–3.5 yrs)", color: P.amber },
    { label: "Junior KG (3.5–4.5 yrs)", color: P.teal },
    { label: "Senior KG (4.5–5.5 yrs)", color: P.purple },
    { label: "After School Care", color: P.sky },
]

const SOCIALS = [
    { icon: "📘", label: "Facebook", href: "#", color: P.sky, grad: g.sky },
    { icon: "📸", label: "Instagram", href: "#", color: P.pink, grad: g.purple },
    { icon: "▶️", label: "YouTube", href: "#", color: P.coral, grad: g.coral },
    { icon: "💬", label: "WhatsApp", href: "#", color: P.teal, grad: g.teal },
]

function useFadeUp() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-40px" })
    return { ref, inView }
}

// ─── Animated floating bubble ──────────────────────────────────────────────
function Bubble({ size, color, x, y, dur }: { size: number; color: string; x: string; y: string; dur: number }) {
    return (
        <motion.div className="absolute rounded-full pointer-events-none blur-3xl"
            style={{ width: size, height: size, left: x, top: y, background: color, opacity: 0.12 }}
            animate={{ y: [0, -18, 0] }}
            transition={{ repeat: Infinity, duration: dur, ease: "easeInOut" }} />
    )
}

// ─── Builder card ──────────────────────────────────────────────────────────
function BuilderCard() {
    const { ref, inView } = useFadeUp()
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y: 40, rotate: -1 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative rounded-[28px] p-6 overflow-hidden"
            style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: hovered ? `0 24px 60px ${P.coral}30` : "0 8px 32px rgba(0,0,0,0.2)",
                backdropFilter: "blur(12px)",
                transition: "box-shadow 0.3s",
            }}>

            {/* Colorful top bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]" style={{ background: g.rainbow }} />

            {/* Glow on hover */}
            <motion.div className="absolute inset-0 rounded-[28px] pointer-events-none"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: `radial-gradient(circle at 30% 40%, ${P.coral}15, transparent 70%)` }} />

            {/* 🚀 Icon */}
            <motion.div animate={{ rotate: hovered ? [0, -10, 10, 0] : 0 }} transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg"
                style={{ background: g.coral, boxShadow: `0 6px 20px ${P.coral}50` }}>
                🚀
            </motion.div>

            {/* Headline */}
            <p className="text-xs tracking-[0.22em] uppercase font-semibold mb-2"
                style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.5)" }}>
                Does your business need a website?
            </p>
            <h4 className="text-xl font-bold leading-snug mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem" }}>
                <span style={gt(g.rainbow)}>Let&apos;s grow your business</span>
                <br />
                <span className="text-white/90">with a stunning website.</span>
            </h4>

            <p className="text-sm leading-relaxed mt-3 mb-5"
                style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
                This website was crafted with ❤️ by{" "}
                <span className="font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>Om Takbhate</span>
                {" "}— a passionate web developer helping businesses thrive online.
            </p>

            {/* CTA row */}
            <div className="flex flex-col gap-2.5">
                <a href="tel:+918668801179"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
                        style={{ background: g.teal }}>📞</div>
                    <div>
                        <p className="text-[10px] tracking-widest uppercase text-white/40" style={{ fontFamily: "'Jost', sans-serif" }}>Call / WhatsApp</p>
                        <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Jost', sans-serif" }}>+91 8668801179</p>
                    </div>
                </a>

                <motion.a href="https://wa.me/918668801179?text=Hi Om! I need a website for my business."
                    target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl text-white text-sm font-semibold tracking-wide shadow-xl"
                    style={{
                        background: g.coral,
                        fontFamily: "'Jost', sans-serif",
                        letterSpacing: "0.06em",
                        boxShadow: `0 8px 24px ${P.coral}50`,
                    }}>
                    💬 &nbsp; Get Your Website Now
                </motion.a>
            </div>
        </motion.div>
    )
}

// ─── Main Footer ───────────────────────────────────────────────────────────
export default function Footer() {
    const col1 = useFadeUp()
    const col2 = useFadeUp()
    const col3 = useFadeUp()

    return (
        <footer className="relative overflow-hidden" aria-label="Site footer">
            {/* ── Dark gradient background ── */}
            <div className="absolute inset-0 -z-10"
                style={{ background: `linear-gradient(170deg, #0F1626 0%, #1A1A2E 40%, #0D1520 100%)` }} />

            {/* Blobs */}
            <Bubble size={400} color={P.purple} x="-5%" y="10%" dur={8} />
            <Bubble size={350} color={P.teal} x="60%" y="-5%" dur={10} />
            <Bubble size={300} color={P.coral} x="85%" y="55%" dur={7} />
            <Bubble size={250} color={P.sky} x="20%" y="70%" dur={9} />

            {/* Polka dots */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

            {/* ── Rainbow top border ── */}
            <div className="h-[3px] w-full" style={{ background: g.rainbow }} />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20">

                {/* ── Top grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Col 1 — Brand */}
                    <motion.div ref={col1.ref}
                        initial={{ opacity: 0, y: 40 }}
                        animate={col1.inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-1">

                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-xl"
                                style={{ background: g.coral, boxShadow: `0 6px 20px ${P.coral}50` }}>
                                🌟
                            </div>
                            <div>
                                <p className="font-bold text-lg leading-tight"
                                    style={{ fontFamily: "'Cormorant Garamond', serif", ...gt(g.rainbow) }}>
                                    {schoolName}
                                </p>
                                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40"
                                    style={{ fontFamily: "'Jost', sans-serif" }}>
                                    Preschool · {schoolLocation}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed mb-6"
                            style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
                            Ambarnath's most trusted Montessori-inspired preschool, nurturing little minds since 2010.
                            Where every child's story begins with wonder &amp; purpose.
                        </p>

                        {/* Social icons */}
                        <div className="flex gap-2.5">
                            {SOCIALS.map(s => (
                                <motion.a key={s.label} href={s.href}
                                    whileHover={{ y: -4, boxShadow: `0 8px 20px ${s.color}50` }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-md"
                                    style={{ background: s.grad }}
                                    aria-label={s.label}>
                                    {s.icon}
                                </motion.a>
                            ))}
                        </div>

                        {/* Trust pills */}
                        <div className="flex flex-wrap gap-2 mt-5">
                            {[
                                { label: "Est. 2010", grad: g.coral },
                                { label: "CBSE Affiliated", grad: g.teal },
                                { label: "98% ★ Rating", grad: g.purple },
                            ].map(p => (
                                <span key={p.label}
                                    className="px-3 py-1 rounded-full text-white text-[10px] font-semibold tracking-wide"
                                    style={{ background: p.grad, fontFamily: "'Jost', sans-serif", opacity: 0.85 }}>
                                    {p.label}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Col 2 — Quick Links */}
                    <motion.div ref={col2.ref}
                        initial={{ opacity: 0, y: 40 }}
                        animate={col2.inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1 }}>

                        <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-6"
                            style={{ fontFamily: "'Jost', sans-serif", ...gt(g.sky) }}>
                            Quick Links
                        </p>
                        <ul className="space-y-3">
                            {QUICK_LINKS.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href}
                                        className="group flex items-center gap-3 text-sm transition-all duration-200"
                                        style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>
                                        <motion.span whileHover={{ scale: 1.3, x: 2 }}
                                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                            style={{ background: link.color }} />
                                        <span className="group-hover:text-white transition-colors duration-200">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <p className="text-xs tracking-[0.25em] uppercase font-semibold mt-10 mb-6"
                            style={{ fontFamily: "'Jost', sans-serif", ...gt(g.amber) }}>
                            Our Programs
                        </p>
                        <ul className="space-y-3">
                            {PROGRAMS.map(p => (
                                <li key={p.label}
                                    className="flex items-center gap-3 text-sm"
                                    style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                                    {p.label}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Col 3 — Contact */}
                    <motion.div ref={col3.ref}
                        initial={{ opacity: 0, y: 40 }}
                        animate={col3.inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}>

                        <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-6"
                            style={{ fontFamily: "'Jost', sans-serif", ...gt(g.coral) }}>
                            Get In Touch
                        </p>

                        <div className="space-y-4">
                            {[
                                { icon: "📍", label: "Address", value: "Near Railway Station, Ambarnath (E), Maharashtra 421501", color: P.coral, grad: g.coral },
                                { icon: "📞", label: "Phone", value: "+91 98765 43210", color: P.teal, grad: g.teal, href: "tel:+919876543210" },
                                { icon: "✉️", label: "Email", value: "hello@littledreams.edu.in", color: P.sky, grad: g.sky, href: "mailto:hello@littledreams.edu.in" },
                                { icon: "🕐", label: "Timings", value: "Mon–Sat: 8:00 AM – 1:00 PM", color: P.amber, grad: g.amber },
                            ].map(item => (
                                <div key={item.label} className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 mt-0.5"
                                        style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] tracking-widest uppercase mb-0.5"
                                            style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.3)" }}>
                                            {item.label}
                                        </p>
                                        {item.href ? (
                                            <a href={item.href} className="text-sm transition-colors duration-200 hover:text-white"
                                                style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-sm" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
                                                {item.value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Admissions open badge */}
                        <motion.div
                            animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 3 }}
                            className="mt-6 flex items-center gap-2.5 px-4 py-3 rounded-2xl"
                            style={{ background: "rgba(13,148,136,0.12)", border: "1px solid rgba(13,148,136,0.25)" }}>
                            <motion.span className="w-2 h-2 rounded-full flex-shrink-0"
                                animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                                style={{ background: P.teal }} />
                            <p className="text-xs font-semibold tracking-widest uppercase"
                                style={{ fontFamily: "'Jost', sans-serif", color: P.teal }}>
                                Admissions Open 2025–26
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Col 4 — Builder card */}
                    <div>
                        <BuilderCard />
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="h-px w-full mb-8" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)" }} />

                {/* ── Bottom bar ── */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-center md:text-left"
                        style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>
                        © {new Date().getFullYear()} {schoolName}, {schoolLocation}. All rights reserved.
                    </p>

                    {/* Built by credit */}
                    <motion.a href="https://wa.me/918668801179" target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}>
                        <span className="text-base">⚡</span>
                        <span className="text-xs" style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>
                            Designed &amp; Built by{" "}
                            <span style={{ fontWeight: 600, ...gt(g.rainbow) }}>Om Takbhate</span>
                            <span className="ml-2 text-white/25">· 8668801179</span>
                        </span>
                    </motion.a>

                    <div className="flex gap-5">
                        {["Privacy Policy", "Terms", "Sitemap"].map((t, i) => (
                            <Link key={t} href="#"
                                className="text-xs transition-colors duration-200 hover:text-white/70"
                                style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.25)", fontWeight: 300 }}>
                                {t}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}