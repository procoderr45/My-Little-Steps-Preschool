"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Head from "next/head"
import { useRef } from "react"
import { schoolLocation, schoolName } from "@/utils/constants"

// ─── Reusable fade-up hook ───────────────────────────────────────────────────
function useFadeUp(threshold = 0.2) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-60px", amount: threshold })
    return { ref, inView }
}

// ─── Section label component ─────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
    return (
        <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10" style={{ background: "rgb(13,148,136)" }} />
            <span
                className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                style={{ color: "rgb(13,148,136)", fontFamily: "'Jost', sans-serif" }}
            >
                {children}
            </span>
            <div className="h-px w-10" style={{ background: "rgb(13,148,136)" }} />
        </div>
    )
}

// ─── Value card ──────────────────────────────────────────────────────────────
function ValueCard({
    icon, title, desc, delay,
}: { icon: string; title: string; desc: string; delay: number }) {
    const { ref, inView } = useFadeUp()
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
            className="group relative rounded-[28px] p-7 overflow-hidden cursor-default"
            style={{
                background: "linear-gradient(145deg, rgba(245,251,250,0.95), rgba(204,237,234,0.4))",
                border: "1px solid rgba(94,185,174,0.25)",
                boxShadow: "0 8px 40px rgba(13,148,136,0.07)",
                transition: "box-shadow 0.3s, transform 0.3s",
            }}
            whileHover={{
                y: -6,
                boxShadow: "0 24px 60px rgba(13,148,136,0.16)",
            }}
        >
            {/* hover glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-[28px] transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at 30% 30%, rgba(13,148,136,0.07), transparent 70%)" }}
            />
            <div
                className="mb-5 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{
                    background: "linear-gradient(135deg, rgba(13,148,136,0.12), rgba(5,150,105,0.07))",
                    border: "1px solid rgba(13,148,136,0.18)",
                }}
            >
                {icon}
            </div>
            <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0F2C28", fontSize: "1.2rem" }}
            >
                {title}
            </h3>
            <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,120,115)", fontWeight: 300 }}
            >
                {desc}
            </p>
        </motion.div>
    )
}

// ─── Team card ───────────────────────────────────────────────────────────────
function TeamCard({
    name, role, qualification, emoji, delay,
}: { name: string; role: string; qualification: string; emoji: string; delay: number }) {
    const { ref, inView } = useFadeUp()
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className="group relative flex flex-col items-center text-center rounded-[32px] px-6 py-8 overflow-hidden"
            style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(204,237,234,0.35) 100%)",
                border: "1px solid rgba(94,185,174,0.2)",
                boxShadow: "0 8px 32px rgba(13,148,136,0.07)",
            }}
            whileHover={{ y: -8, boxShadow: "0 28px 64px rgba(13,148,136,0.15)" }}
        >
            {/* Avatar circle */}
            <div
                className="relative w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4 overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, rgba(13,148,136,0.15), rgba(22,163,74,0.1))",
                    border: "3px solid rgba(13,148,136,0.2)",
                    boxShadow: "0 8px 24px rgba(13,148,136,0.15)",
                }}
            >
                <span>{emoji}</span>
                {/* ring pulse */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: "2px solid rgba(13,148,136,0.3)" }}
                    animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
            </div>
            <h3
                className="text-xl font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0F2C28" }}
            >
                {name}
            </h3>
            <p
                className="mt-1 text-xs tracking-widest uppercase font-semibold"
                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(13,148,136)" }}
            >
                {role}
            </p>
            <div
                className="mt-3 h-px w-12 mx-auto"
                style={{ background: "linear-gradient(to right, transparent, rgba(13,148,136,0.4), transparent)" }}
            />
            <p
                className="mt-3 text-xs leading-relaxed"
                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,120,115)", fontWeight: 300 }}
            >
                {qualification}
            </p>
        </motion.div>
    )
}

// ─── Timeline item ────────────────────────────────────────────────────────────
function TimelineItem({
    year, title, desc, side, delay,
}: { year: string; title: string; desc: string; side: "left" | "right"; delay: number }) {
    const { ref, inView } = useFadeUp()
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
            className={`flex items-start gap-6 ${side === "right" ? "md:flex-row-reverse md:text-right" : ""}`}
        >
            <div className="flex-1 hidden md:block" />
            {/* dot */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-xs z-10"
                    style={{
                        background: "linear-gradient(135deg, #0D9488, #059669)",
                        boxShadow: "0 4px 16px rgba(13,148,136,0.4)",
                        fontFamily: "'Jost', sans-serif",
                        letterSpacing: "0.05em",
                    }}
                >
                    {year}
                </div>
            </div>
            <div
                className="flex-1 rounded-[24px] p-5"
                style={{
                    background: "rgba(245,251,250,0.8)",
                    border: "1px solid rgba(94,185,174,0.2)",
                    boxShadow: "0 4px 24px rgba(13,148,136,0.06)",
                }}
            >
                <h4
                    className="font-semibold mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0F2C28", fontSize: "1.1rem" }}
                >
                    {title}
                </h4>
                <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,120,115)", fontWeight: 300 }}
                >
                    {desc}
                </p>
            </div>
        </motion.div>
    )
}

// ─── Main About Page ──────────────────────────────────────────────────────────
export default function AboutPage() {
    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    const missionRef = useFadeUp()
    const visionRef = useFadeUp()

    return (
        <>
            {/* ── SEO HEAD ─────────────────────────────────────────────────── */}
            <Head>
                <title>About Us | {schoolName} — ${schoolLocation}'s Most Trusted Early Learning Centre</title>
                <meta
                    name="description"
                    content={`Learn about {schoolName} in ${schoolLocation} — our story, mission, philosophy, dedicated educators, and 15+ years of nurturing children with a Montessori-inspired, play-based curriculum.`}
                />
                <meta name="keywords" content={`preschool ${schoolLocation}, best preschool ${schoolLocation}, Montessori preschool, early childhood education, ${schoolName} ${schoolLocation}`} />
                <meta property="og:title" content={`About ${schoolName} — ${schoolLocation}`} />
                <meta property="og:description" content={`15+ years of joyful, purposeful early childhood education in ${schoolLocation}. Meet our educators and discover our philosophy.`} />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://littledreams.edu.in/about" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "EducationalOrganization",
                            "name": "{schoolName}",
                            "description": `${schoolLocation}'s most trusted Montessori-inspired preschool, nurturing children since 2010.`,
                            "url": "https://littledreams.edu.in",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": `${schoolLocation}`,
                                "addressRegion": "Maharashtra",
                                "addressCountry": "IN"
                            },
                            "foundingDate": "2010",
                            "numberOfEmployees": { "@type": "QuantitativeValue", "value": "25" }
                        })
                    }}
                />
            </Head>

            <main
                className="relative overflow-hidden"
                style={{ background: "#F5FBFA" }}
                aria-label="About {schoolName}"
            >

                {/* ══════════════════════════════════════════════════════════
                    SECTION 1 — CINEMATIC HERO
                ══════════════════════════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
                    aria-labelledby="about-hero-heading"
                >
                    {/* Parallax background blobs */}
                    <motion.div
                        style={{ y: heroY, opacity: heroOpacity }}
                        className="absolute inset-0 -z-10"
                    >
                        <div
                            className="absolute top-[-120px] left-[-120px] w-[600px] h-[600px] rounded-full"
                            style={{ background: "radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)" }}
                        />
                        <div
                            className="absolute bottom-[-150px] right-[-100px] w-[700px] h-[700px] rounded-full"
                            style={{ background: "radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%)" }}
                        />
                        {/* grid pattern */}
                        <div
                            className="absolute inset-0 opacity-[0.025]"
                            style={{
                                backgroundImage: "linear-gradient(rgba(13,148,136,1) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,1) 1px, transparent 1px)",
                                backgroundSize: "60px 60px",
                            }}
                        />
                    </motion.div>

                    {/* Decorative arcs */}
                    <svg className="absolute top-0 right-0 w-[400px] opacity-[0.06] pointer-events-none" viewBox="0 0 400 400">
                        {[320, 260, 200, 140].map((r, i) => (
                            <circle key={i} cx="400" cy="0" r={r} stroke="#0D9488" strokeWidth="1" fill="none" />
                        ))}
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-[300px] opacity-[0.05] pointer-events-none" viewBox="0 0 300 300">
                        {[240, 180, 120].map((r, i) => (
                            <circle key={i} cx="0" cy="300" r={r} stroke="#059669" strokeWidth="1" fill="none" />
                        ))}
                    </svg>

                    <div className="relative z-10 text-center max-w-4xl px-6">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <SectionLabel>Our Story · Est. 2010</SectionLabel>
                        </motion.div>

                        <motion.h1
                            id="about-hero-heading"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.15 }}
                            className="leading-[1.05]"
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontWeight: 600,
                                fontSize: "clamp(42px, 7vw, 88px)",
                                color: "#0F2C28",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Fifteen Years of{" "}
                            <em
                                className="not-italic"
                                style={{
                                    background: "linear-gradient(135deg, #0D9488 0%, #059669 50%, #16A34A 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Nurturing
                            </em>
                            <br />
                            <span style={{ fontWeight: 400, fontSize: "0.78em", color: "#2D5A52" }}>
                                Little Minds with Big Dreams
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.35 }}
                            className="mt-8 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                            style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,120,115)", fontWeight: 300 }}
                        >
                            We didn't set out to build a school. We set out to build
                            a world where every child wakes up excited to learn —
                            and comes home glowing with stories to tell.
                        </motion.p>

                        {/* scroll indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="mt-14 flex flex-col items-center gap-2"
                        >
                            <span
                                className="text-[10px] tracking-[0.25em] uppercase"
                                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(94,185,174)" }}
                            >
                                Scroll to explore
                            </span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                                className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1"
                                style={{ borderColor: "rgba(13,148,136,0.4)" }}
                            >
                                <div className="w-1 h-2 rounded-full" style={{ background: "rgb(13,148,136)" }} />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>


                {/* ══════════════════════════════════════════════════════════
                    SECTION 2 — MISSION & VISION (split layout)
                ══════════════════════════════════════════════════════════ */}
                <section
                    className="relative py-28 px-6"
                    aria-labelledby="mission-heading"
                    style={{
                        background: "linear-gradient(180deg, #F5FBFA 0%, #EAF6F4 50%, #F5FBFA 100%)",
                    }}
                >
                    {/* Horizontal rule */}
                    <div
                        className="absolute top-0 left-[10%] right-[10%] h-px"
                        style={{ background: "linear-gradient(to right, transparent, rgba(13,148,136,0.2), transparent)" }}
                    />

                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                        {/* Mission */}
                        <motion.div
                            ref={missionRef.ref}
                            initial={{ opacity: 0, x: -60 }}
                            animate={missionRef.inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="relative rounded-[36px] p-10 overflow-hidden"
                            style={{
                                background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(204,237,234,0.5))",
                                border: "1px solid rgba(94,185,174,0.25)",
                                boxShadow: "0 24px 80px rgba(13,148,136,0.1)",
                            }}
                        >
                            <div
                                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                                style={{ background: "radial-gradient(circle, rgba(13,148,136,0.07), transparent 70%)", transform: "translate(30%, -30%)" }}
                            />
                            <div
                                className="mb-6 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl"
                                style={{
                                    background: "linear-gradient(135deg, rgba(13,148,136,0.15), rgba(5,150,105,0.08))",
                                    border: "1px solid rgba(13,148,136,0.2)",
                                }}
                            >
                                🌿
                            </div>
                            <p
                                className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
                                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(13,148,136)" }}
                            >
                                Our Mission
                            </p>
                            <h2
                                id="mission-heading"
                                className="text-3xl md:text-4xl font-semibold leading-snug mb-5"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0F2C28" }}
                            >
                                To cultivate joy, curiosity & confidence — one child at a time.
                            </h2>
                            <p
                                className="text-base leading-relaxed"
                                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,120,115)", fontWeight: 300 }}
                            >
                                We believe the earliest years are the most formative. Our mission is to provide
                                a safe, stimulating, and beautifully designed environment where every child
                                feels seen, valued, and inspired to discover their own unique strengths.
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            ref={visionRef.ref}
                            initial={{ opacity: 0, x: 60 }}
                            animate={visionRef.inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                            className="flex flex-col gap-6"
                        >
                            <div
                                className="rounded-[28px] p-8 relative overflow-hidden"
                                style={{
                                    background: "linear-gradient(135deg, #0D9488 0%, #059669 60%, #16A34A 100%)",
                                    boxShadow: "0 24px 64px rgba(13,148,136,0.35)",
                                }}
                            >
                                <div
                                    className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                                    style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)", transform: "translate(20%, -20%)" }}
                                />
                                <p
                                    className="text-xs tracking-[0.25em] uppercase font-semibold mb-3"
                                    style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.7)" }}
                                >
                                    Our Vision
                                </p>
                                <h3
                                    className="text-2xl md:text-3xl font-semibold leading-snug text-white mb-4"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    A generation of compassionate, creative world-changers.
                                </h3>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{ fontFamily: "'Jost', sans-serif", color: "rgba(255,255,255,0.8)", fontWeight: 300 }}
                                >
                                    We envision every Little Dreams graduate stepping into primary school —
                                    and life — with deep emotional intelligence, an unquenchable love of
                                    learning, and the confidence to lead.
                                </p>
                            </div>

                            {/* Philosophy pill */}
                            <div
                                className="rounded-[24px] p-6 flex items-start gap-5"
                                style={{
                                    background: "rgba(245,251,250,0.9)",
                                    border: "1px solid rgba(94,185,174,0.25)",
                                    boxShadow: "0 8px 32px rgba(13,148,136,0.07)",
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(13,148,136,0.12), rgba(22,163,74,0.07))",
                                        border: "1px solid rgba(13,148,136,0.18)",
                                    }}
                                >
                                    📚
                                </div>
                                <div>
                                    <p
                                        className="font-semibold mb-1"
                                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0F2C28", fontSize: "1.1rem" }}
                                    >
                                        Montessori-Inspired Philosophy
                                    </p>
                                    <p
                                        className="text-sm leading-relaxed"
                                        style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,120,115)", fontWeight: 300 }}
                                    >
                                        Child-led exploration, hands-on materials, and mixed-age group learning
                                        help children develop at their own natural pace without pressure.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* ══════════════════════════════════════════════════════════
                    SECTION 3 — FOUNDER STORY (asymmetric layout)
                ══════════════════════════════════════════════════════════ */}
                <section className="relative py-28 px-6 overflow-hidden" aria-labelledby="founder-heading">
                    {/* Large teal watermark */}
                    <div
                        className="absolute right-[-80px] top-[50%] translate-y-[-50%] text-[220px] font-bold leading-none select-none pointer-events-none opacity-[0.03]"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0D9488" }}
                        aria-hidden="true"
                    >
                        2010
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionLabel>Our Founder</SectionLabel>
                        </div>

                        <div className="grid md:grid-cols-5 gap-12 items-center">
                            {/* Image column */}
                            {(() => {
                                const { ref, inView } = useFadeUp()
                                return (
                                    <motion.div
                                        ref={ref}
                                        initial={{ opacity: 0, x: -70 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="md:col-span-2 flex justify-center"
                                    >
                                        <div className="relative">
                                            {/* Decorative ring */}
                                            <div
                                                className="absolute inset-[-16px] rounded-[44px]"
                                                style={{
                                                    border: "1px dashed rgba(13,148,136,0.25)",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                            <div
                                                className="w-72 h-72 md:w-80 md:h-80 rounded-[40px] overflow-hidden relative"
                                                style={{
                                                    boxShadow: "0 40px 100px rgba(13,148,136,0.2), 0 0 0 4px rgba(255,255,255,0.8)",
                                                }}
                                            >
                                                <Image
                                                    src="/images/founder.jpg"
                                                    alt={`Mr. Hitesh Patel — Founder & Director of {schoolName} ${schoolLocation}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {/* gradient overlay bottom */}
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 h-24"
                                                    style={{ background: "linear-gradient(to top, rgba(13,70,60,0.6), transparent)" }}
                                                />
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <p
                                                        className="text-white font-semibold text-sm"
                                                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
                                                    >
                                                        Mr. Hitesh Patel
                                                    </p>
                                                    <p
                                                        className="text-white/70 text-xs tracking-widest uppercase"
                                                        style={{ fontFamily: "'Jost', sans-serif" }}
                                                    >
                                                        Founder & Director
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Floating badge */}
                                            <motion.div
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                                className="absolute -bottom-6 -right-6 px-5 py-3 rounded-2xl"
                                                style={{
                                                    background: "linear-gradient(135deg, #0D9488, #059669)",
                                                    boxShadow: "0 12px 32px rgba(13,148,136,0.4)",
                                                }}
                                            >
                                                <p
                                                    className="text-white text-xs font-semibold tracking-wider"
                                                    style={{ fontFamily: "'Jost', sans-serif" }}
                                                >
                                                    B.Ed · M.Ed · 20yr exp
                                                </p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )
                            })()}

                            {/* Text column */}
                            {(() => {
                                const { ref, inView } = useFadeUp()
                                return (
                                    <motion.div
                                        ref={ref}
                                        initial={{ opacity: 0, x: 60 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                                        className="md:col-span-3"
                                    >
                                        <h2
                                            id="founder-heading"
                                            className="text-4xl md:text-5xl font-semibold leading-tight mb-6"
                                            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0F2C28" }}
                                        >
                                            "I wanted to build a school
                                            <span
                                                style={{
                                                    background: "linear-gradient(135deg, #0D9488, #16A34A)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                    backgroundClip: "text",
                                                }}
                                            >
                                                {" "}I wished existed{" "}
                                            </span>
                                            when I was a child."
                                        </h2>

                                        <div
                                            className="space-y-4 text-base leading-relaxed"
                                            style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,120,115)", fontWeight: 300 }}
                                        >
                                            <p>
                                                After two decades in childhood education across Mumbai and Pune,
                                                Mr. Hitesh Patel returned to {schoolLocation} with one dream: to create
                                                a preschool that felt less like a classroom and more like a
                                                second home — warm, stimulating, and deeply respectful of every child's pace.
                                            </p>
                                            <p>
                                                She designed every corner of Little Dreams herself — from the
                                                sensory gardens to the reading nooks — ensuring that the space
                                                itself became a teacher. Today, over 2,400 children have called
                                                this place their first school.
                                            </p>
                                        </div>

                                        {/* Credentials row */}
                                        <div className="mt-8 flex flex-wrap gap-3">
                                            {["B.Ed, Mumbai University", "M.Ed in Early Childhood", "Montessori Certified — AMI", "20+ Years Teaching"].map((c) => (
                                                <span
                                                    key={c}
                                                    className="px-4 py-2 rounded-full text-xs font-medium tracking-wide"
                                                    style={{
                                                        background: "rgba(13,148,136,0.08)",
                                                        border: "1px solid rgba(13,148,136,0.2)",
                                                        color: "rgb(11,116,107)",
                                                        fontFamily: "'Jost', sans-serif",
                                                    }}
                                                >
                                                    ✦ {c}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )
                            })()}
                        </div>
                    </div>
                </section>


                {/* ══════════════════════════════════════════════════════════
                    SECTION 4 — OUR VALUES
                ══════════════════════════════════════════════════════════ */}
                <section
                    className="relative py-28 px-6"
                    aria-labelledby="values-heading"
                    style={{ background: "linear-gradient(180deg, #F5FBFA 0%, #EAF6F4 100%)" }}
                >
                    <div
                        className="absolute top-0 left-[10%] right-[10%] h-px"
                        style={{ background: "linear-gradient(to right, transparent, rgba(13,148,136,0.18), transparent)" }}
                    />

                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionLabel>What We Stand For</SectionLabel>
                            <h2
                                id="values-heading"
                                className="text-4xl md:text-6xl font-semibold"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0F2C28" }}
                            >
                                Our Core Values
                            </h2>
                            <p
                                className="mt-4 max-w-xl mx-auto text-base leading-relaxed"
                                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,120,115)", fontWeight: 300 }}
                            >
                                Every decision we make — from curriculum design to classroom colours —
                                flows from six guiding principles.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: "🌱", title: "Child-Led Learning", desc: "We follow the child's curiosity, not a rigid schedule. Every child's learning journey is unique and we honour that.", delay: 0 },
                                { icon: "🤝", title: "Trust & Transparency", desc: "Parents are partners. We share daily updates, maintain open communication and welcome you into our classroom anytime.", delay: 0.08 },
                                { icon: "🧠", title: "Holistic Development", desc: "Cognitive, emotional, social and physical growth — we nurture the whole child, not just academic readiness.", delay: 0.16 },
                                { icon: "🎨", title: "Creative Freedom", desc: "Art, music, drama, and imaginative play are not extras — they are the curriculum. Creativity is intelligence having fun.", delay: 0.24 },
                                { icon: "🛡️", title: "Safety Above All", desc: "CCTV-monitored campus, verified staff, secure entry, and a zero-tolerance policy on any form of harm or humiliation.", delay: 0.32 },
                                { icon: "🌍", title: "Inclusive Community", desc: "Every background, ability, and learning style is celebrated. Diversity is our greatest strength and we teach children to cherish it.", delay: 0.40 },
                            ].map((v) => (
                                <ValueCard key={v.title} {...v} />
                            ))}
                        </div>
                    </div>
                </section>


                {/* ══════════════════════════════════════════════════════════
                    SECTION 5 — TIMELINE / MILESTONES
                ══════════════════════════════════════════════════════════ */}
                <section className="relative py-28 px-6 overflow-hidden" aria-labelledby="timeline-heading">
                    {/* watermark text */}
                    <div
                        className="absolute left-[-60px] top-[40%] text-[180px] font-bold leading-none select-none pointer-events-none opacity-[0.025] -rotate-90"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0D9488" }}
                        aria-hidden="true"
                    >
                        JOURNEY
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionLabel>Our Journey</SectionLabel>
                            <h2
                                id="timeline-heading"
                                className="text-4xl md:text-6xl font-semibold"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0F2C28" }}
                            >
                                Milestones That{" "}
                                <span
                                    style={{
                                        background: "linear-gradient(135deg, #0D9488, #16A34A)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Made Us
                                </span>
                            </h2>
                        </div>

                        {/* Timeline line */}
                        <div className="relative">
                            <div
                                className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
                                style={{ background: "linear-gradient(to bottom, transparent, rgba(13,148,136,0.3) 10%, rgba(13,148,136,0.3) 90%, transparent)" }}
                            />

                            <div className="space-y-10 pl-16 md:pl-0">
                                {[
                                    { year: "'10", title: "The First Bell", desc: `${schoolName} opens its doors in ${schoolLocation} with 18 children, 2 teachers, and one boundless dream.`, side: "left" as const, delay: 0 },
                                    { year: "'13", title: "Montessori Certification", desc: `Our full teaching team completed AMI Montessori certification — among the first preschools in ${schoolLocation} to do so.`, side: "right" as const, delay: 0.1 },
                                    { year: "'16", title: "New Campus & Sensory Garden", desc: "We moved to our purpose-built campus featuring India's first sensory garden designed for preschool-aged children.", side: "left" as const, delay: 0 },
                                    { year: "'19", title: "1,000 Alumni Milestone", desc: "Our 1,000th graduate walked across the stage — many returning with their own children a decade later.", side: "right" as const, delay: 0.1 },
                                    { year: "'22", title: "CCTV & Smart Safety System", desc: "Installed a complete 24/7 monitored security ecosystem, giving parents real-time peace of mind.", side: "left" as const, delay: 0 },
                                    { year: "'25", title: `${schoolLocation}'s #1 Preschool`, desc: `Ranked the most trusted preschool in ${schoolLocation} by 3rd-party parent survey — with 98% satisfaction rate.`, side: "right" as const, delay: 0.1 },
                                ].map((item) => (
                                    <TimelineItem key={item.year} {...item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                {/* ══════════════════════════════════════════════════════════
                    SECTION 6 — MEET THE TEAM
                ══════════════════════════════════════════════════════════ */}
                <section
                    className="relative py-28 px-6"
                    aria-labelledby="team-heading"
                    style={{ background: "linear-gradient(180deg, #F5FBFA 0%, #EAF6F4 60%, #F5FBFA 100%)" }}
                >
                    <div
                        className="absolute top-0 left-[10%] right-[10%] h-px"
                        style={{ background: "linear-gradient(to right, transparent, rgba(13,148,136,0.18), transparent)" }}
                    />

                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionLabel>The Educators</SectionLabel>
                            <h2
                                id="team-heading"
                                className="text-4xl md:text-6xl font-semibold"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0F2C28" }}
                            >
                                Faces Behind Every{" "}
                                <span
                                    style={{
                                        background: "linear-gradient(135deg, #0D9488, #16A34A)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Bright Moment
                                </span>
                            </h2>
                            <p
                                className="mt-4 max-w-xl mx-auto text-base leading-relaxed"
                                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,120,115)", fontWeight: 300 }}
                            >
                                Every educator at {schoolName} holds a formal degree in early childhood
                                education and undergoes 40+ hours of training annually.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { name: "Mr. Hitesh Patel", role: "Founder & Director", qualification: "M.Ed · AMI Montessori · 20+ years experience", emoji: "👩‍🏫", delay: 0 },
                                { name: "Ms. Ananya Kulkarni", role: "Head of Curriculum", qualification: "B.Ed, Pune University · Child Psychology Diploma", emoji: "📖", delay: 0.1 },
                                { name: "Mr. Rohan Desai", role: "Movement & Yoga", qualification: "Certified Children's Yoga Instructor · 8 years", emoji: "🧘", delay: 0.2 },
                                { name: "Ms. Shruti Patil", role: "Art & Music Lead", qualification: "Fine Arts, Sir J.J. School · Carnatic Music Graduate", emoji: "🎨", delay: 0.3 },
                            ].map((member) => (
                                <TeamCard key={member.name} {...member} />
                            ))}
                        </div>

                        {/* Team stat strip */}
                        {(() => {
                            const { ref, inView } = useFadeUp()
                            return (
                                <motion.div
                                    ref={ref}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.7, delay: 0.3 }}
                                    className="mt-12 rounded-[28px] py-8 px-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(13,148,136,0.07), rgba(22,163,74,0.04))",
                                        border: "1px solid rgba(13,148,136,0.15)",
                                    }}
                                >
                                    {[
                                        { value: "25", label: "Dedicated Staff" },
                                        { value: "1:8", label: "Teacher–Child Ratio" },
                                        { value: "40hrs", label: "Annual Training" },
                                        { value: "100%", label: "Degree Holders" },
                                    ].map((s) => (
                                        <div key={s.label}>
                                            <p
                                                className="text-3xl font-semibold"
                                                style={{
                                                    fontFamily: "'Cormorant Garamond', serif",
                                                    background: "linear-gradient(135deg, #0D9488, #16A34A)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                    backgroundClip: "text",
                                                }}
                                            >
                                                {s.value}
                                            </p>
                                            <p
                                                className="mt-1 text-[11px] uppercase tracking-widest"
                                                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,120,115)" }}
                                            >
                                                {s.label}
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            )
                        })()}
                    </div>
                </section>


                {/* ══════════════════════════════════════════════════════════
                    SECTION 7 — CTA BANNER
                ══════════════════════════════════════════════════════════ */}
                {(() => {
                    const { ref, inView } = useFadeUp()
                    return (
                        <section className="py-24 px-6" aria-labelledby="cta-heading">
                            <motion.div
                                ref={ref}
                                initial={{ opacity: 0, y: 50 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.9 }}
                                className="max-w-4xl mx-auto relative rounded-[44px] overflow-hidden py-20 px-8 text-center"
                                style={{
                                    background: "linear-gradient(135deg, #0D9488 0%, #059669 50%, #16A34A 100%)",
                                    boxShadow: "0 48px 120px rgba(13,148,136,0.4)",
                                }}
                            >
                                {/* Background orbs */}
                                <div
                                    className="absolute top-[-60px] left-[-60px] w-80 h-80 rounded-full pointer-events-none"
                                    style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)" }}
                                />
                                <div
                                    className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full pointer-events-none"
                                    style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }}
                                />
                                {/* Grid */}
                                <div
                                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                                    style={{
                                        backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                                        backgroundSize: "40px 40px",
                                    }}
                                />

                                <div className="relative z-10">
                                    <motion.div
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                        className="text-5xl mb-6 inline-block"
                                    >
                                        🌟
                                    </motion.div>
                                    <h2
                                        id="cta-heading"
                                        className="text-4xl md:text-6xl font-semibold text-white leading-tight mb-4"
                                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                    >
                                        Ready to Begin Their Story?
                                    </h2>
                                    <p
                                        className="text-white/80 text-lg mb-10 max-w-lg mx-auto"
                                        style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                                    >
                                        Admissions are open for 2025–26. Schedule a private tour and
                                        see why ${schoolLocation}'s most discerning parents choose {schoolName}.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button
                                            className="px-10 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                            style={{
                                                background: "rgba(255,255,255,0.95)",
                                                color: "#0D6B63",
                                                fontFamily: "'Jost', sans-serif",
                                                fontSize: "0.875rem",
                                                letterSpacing: "0.08em",
                                                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                                            }}
                                        >
                                            Schedule a Private Tour
                                        </button>
                                        <button
                                            className="px-10 py-4 rounded-full font-semibold tracking-wide border-2 border-white/40 text-white transition-all duration-300 hover:scale-105 hover:bg-white/10"
                                            style={{
                                                fontFamily: "'Jost', sans-serif",
                                                fontSize: "0.875rem",
                                                letterSpacing: "0.08em",
                                            }}
                                        >
                                            Download Prospectus →
                                        </button>
                                    </div>

                                    {/* Trust line */}
                                    <p
                                        className="mt-8 text-white/50 text-xs tracking-widest uppercase"
                                        style={{ fontFamily: "'Jost', sans-serif" }}
                                    >
                                        ✦ No obligation · Response within 24 hours · Limited seats ✦
                                    </p>
                                </div>
                            </motion.div>
                        </section>
                    )
                })()}
            </main>
        </>
    )
}