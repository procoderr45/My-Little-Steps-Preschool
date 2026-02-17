"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-[#FDFAF5]">

            {/* ================= PREMIUM BACKGROUND LAYERS ================= */}
            <div className="absolute inset-0 -z-10 overflow-hidden">

                {/* Warm gradient wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F6E8D5] via-[#FDF8F1] to-[#EDE6D6]" />

                {/* Soft radial lights */}
                <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#C0922B]/10 rounded-full blur-[140px]" />
                <div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] bg-[#A8C5A0]/15 rounded-full blur-[160px]" />

            </div>

            {/* ================= MAIN CONTAINER ================= */}
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">

                {/* ================= TOP TRUST BADGE ================= */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center mb-10"
                >
                    <div className="flex items-center gap-4 text-[#C0922B] text-xs tracking-[0.3em] uppercase font-semibold">
                        <div className="h-px w-12 bg-[#C0922B]" />
                        Est. 2010 · Ambarnath's Most Trusted Preschool
                        <div className="h-px w-12 bg-[#C0922B]" />
                    </div>
                </motion.div>

                {/* ================= HERO TEXT ================= */}
                <div className="text-center max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl sm:text-5xl md:text-7xl leading-[1.1] font-semibold text-[#3B2C20]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        Where Every{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Child's
                        </span>{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Story
                        </span>{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Begins
                        </span>
                        <br />
                        <span className="text-[#4A3728] text-[0.85em] font-normal">
                            With{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #10B981 0%, #84CC16 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Wonder
                            </span>{" "}
                            &{" "}
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Purpose
                            </span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="mt-8 text-base sm:text-lg md:text-xl text-[#6B5744] max-w-2xl mx-auto leading-relaxed"
                    >
                        A thoughtfully crafted early learning environment in Ambarnath,
                        designed to nurture curiosity, confidence, and joyful growth —
                        while building strong academic and emotional foundations.
                    </motion.p>

                    {/* ================= TRUST PILLS ================= */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-10 flex flex-wrap justify-center gap-3"
                    >
                        {[
                            "CBSE Affiliated",
                            "1:8 Teacher Ratio",
                            "Secure CCTV Campus",
                            "Montessori Inspired",
                        ].map((item) => (
                            <div
                                key={item}
                                className="px-5 py-2 rounded-full text-xs tracking-wide border bg-white/70 backdrop-blur-xl text-[#5C3D1E] border-[#D4B896]"
                            >
                                ✦ {item}
                            </div>
                        ))}
                    </motion.div>

                    {/* ================= CTA BUTTONS ================= */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button
                            className="relative px-10 py-4 rounded-full text-white font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                            style={{
                                background: "linear-gradient(135deg, #0D9488 0%, #059669 50%, #16A34A 100%)",
                                boxShadow: "0 12px 40px rgba(13, 148, 136, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
                                fontFamily: "'Jost', sans-serif",
                                fontSize: "0.875rem",
                                letterSpacing: "0.08em",
                            }}
                        >
                            ✦ &nbsp; Schedule a Private Tour &nbsp; ✦
                        </button>
                        <button className="px-10 py-4 rounded-full border border-[#C0922B] text-[#5C3D1E] bg-white/70 backdrop-blur-xl transition hover:scale-105">
                            Discover Our Curriculum →
                        </button>
                    </motion.div>

                </div>

                {/* ================= RESPONSIVE IMAGE SECTION ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >

                    {[
                        {
                            src: "/images/activity1.jpg",
                            title: "Creative Arts",
                        },
                        {
                            src: "/images/activity2.jpg",
                            title: "Joyful Learning",
                        },
                        {
                            src: "/images/activity3.jpg",
                            title: "Play-Based Discovery",
                        },
                    ].map((card, index) => (
                        <motion.div
                            key={card.title}
                            whileHover={{ y: -10 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="relative rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)] group"
                        >
                            <Image
                                src={card.src}
                                alt={card.title}
                                width={600}
                                height={500}
                                className="object-cover w-full h-[260px] sm:h-[300px]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <p className="text-lg font-semibold">
                                    {card.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
                    className="mt-20 relative overflow-hidden rounded-[36px] py-12 px-8"
                    style={{
                        background: "linear-gradient(135deg, rgba(245,251,250,0.95) 0%, rgba(204,237,234,0.6) 50%, rgba(245,251,250,0.95) 100%)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(94,185,174,0.3)",
                        boxShadow: "0 32px 80px rgba(13,148,136,0.1), 0 2px 0 rgba(255,255,255,0.8) inset, 0 -1px 0 rgba(13,148,136,0.1) inset",
                    }}
                >
                    {/* Subtle background orbs */}
                    <div className="absolute top-[-40px] left-[-40px] w-[180px] h-[180px] rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)" }} />
                    <div className="absolute bottom-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 70%)" }} />

                    {/* Top label */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8" style={{ background: "rgb(13,148,136)" }} />
                            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                                style={{ color: "rgb(13,148,136)", fontFamily: "'Jost', sans-serif" }}>
                                Trusted by Families Across Ambarnath
                            </span>
                            <div className="h-px w-8" style={{ background: "rgb(13,148,136)" }} />
                        </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-0 text-center relative z-10">
                        {[
                            { value: "15+", label: "Years of Excellence", icon: "🏛️" },
                            { value: "2,400+", label: "Happy Alumni", icon: "🌱" },
                            { value: "98%", label: "Parent Satisfaction", icon: "⭐" },
                            { value: "Top 3", label: "In Ambarnath", icon: "🏆" },
                        ].map((stat, i) => (
                            <div
                                key={stat.label}
                                className="relative flex flex-col items-center px-4 py-2"
                            >
                                {/* Vertical divider between items */}
                                {i !== 0 && (
                                    <div
                                        className="absolute left-0 top-[10%] h-[80%] w-px hidden md:block"
                                        style={{ background: "linear-gradient(to bottom, transparent, rgba(13,148,136,0.2), transparent)" }}
                                    />
                                )}

                                {/* Icon pill */}
                                <div
                                    className="mb-3 w-10 h-10 rounded-2xl flex items-center justify-center text-lg"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(13,148,136,0.12), rgba(5,150,105,0.08))",
                                        border: "1px solid rgba(13,148,136,0.15)",
                                    }}
                                >
                                    {stat.icon}
                                </div>

                                {/* Value */}
                                <p
                                    className="text-3xl md:text-4xl font-semibold leading-none"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', serif",
                                        background: "linear-gradient(135deg, #0D9488 0%, #059669 60%, #16A34A 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    {stat.value}
                                </p>

                                {/* Label */}
                                <p
                                    className="mt-2 text-[11px] uppercase tracking-[0.18em]"
                                    style={{
                                        fontFamily: "'Jost', sans-serif",
                                        color: "rgb(90,120,115)",
                                        fontWeight: 500,
                                    }}
                                >
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA strip */}
                    <div className="mt-8 flex justify-center">
                        <div
                            className="flex items-center gap-2 px-5 py-2 rounded-full text-[11px] tracking-widest uppercase font-semibold"
                            style={{
                                background: "linear-gradient(135deg, rgba(13,148,136,0.1), rgba(5,150,105,0.08))",
                                border: "1px solid rgba(13,148,136,0.2)",
                                color: "rgb(11,116,107)",
                                fontFamily: "'Jost', sans-serif",
                            }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                style={{ background: "#0D9488" }}
                            />
                            Admissions Open for 2025–26
                        </div>
                    </div>
                </motion.div>
            </div>

        </section>
    )
}
