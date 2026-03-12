"use client"

import { inView, motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Head from "next/head"
import { schoolLocation, schoolName } from "@/utils/constants"
import TeamCard from "@/components/school/TeamCard"
import { ValueCard } from "@/components/school/ValueCard"

const P = {
    coral: "#FF6B6B", orange: "#FF8E53", amber: "#F59E0B", yellow: "#FCD34D",
    teal: "#0D9488", tealM: "#059669", green: "#16A34A", sky: "#38BDF8",
    indigo: "#6366F1", purple: "#A855F7", pink: "#EC4899", cream: "#FFFDF8", dark: "#1A1A2E",
}
const g = {
    coral: `linear-gradient(135deg, ${P.coral}, ${P.orange})`,
    amber: `linear-gradient(135deg, ${P.amber}, ${P.yellow})`,
    teal: `linear-gradient(135deg, ${P.teal}, ${P.tealM}, ${P.green})`,
    sky: `linear-gradient(135deg, ${P.sky}, ${P.indigo})`,
    purple: `linear-gradient(135deg, ${P.purple}, ${P.pink})`,
    rainbow: `linear-gradient(135deg, ${P.coral} 0%, ${P.amber} 30%, ${P.teal} 60%, ${P.indigo} 100%)`,
}

function gt(gradient: string) {
    return { background: gradient, WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const, backgroundClip: "text" as const }
}

function SectionLabel({ children, color = P.teal }: { children: string; color?: string }) {
    return (
        <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10" style={{ background: color }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                style={{ color, fontFamily: "'Jost', sans-serif" }}>{children}</span>
            <div className="h-px w-10" style={{ background: color }} />
        </div>
    )
}
import { useRef, useEffect, useState } from "react"

export function useFadeUp(threshold = 0.2) {
    const ref = useRef<HTMLDivElement | null>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        if (!ref.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            {
                threshold,
                rootMargin: "-60px"
            }
        )

        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [threshold])

    return { ref, inView }
}


const vColors = [
    { bg: "rgba(255,107,107,0.07)", border: "rgba(255,107,107,0.22)", accent: P.coral, iBg: "rgba(255,107,107,0.12)" },
    { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.22)", accent: P.amber, iBg: "rgba(245,158,11,0.12)" },
    { bg: "rgba(56,189,248,0.07)", border: "rgba(56,189,248,0.22)", accent: P.sky, iBg: "rgba(56,189,248,0.12)" },
    { bg: "rgba(168,85,247,0.07)", border: "rgba(168,85,247,0.22)", accent: P.purple, iBg: "rgba(168,85,247,0.12)" },
    { bg: "rgba(13,148,136,0.07)", border: "rgba(13,148,136,0.22)", accent: P.teal, iBg: "rgba(13,148,136,0.12)" },
    { bg: "rgba(236,72,153,0.07)", border: "rgba(236,72,153,0.22)", accent: P.pink, iBg: "rgba(236,72,153,0.12)" },
]

const tlColors = [P.coral, P.amber, P.teal, P.purple, P.sky, P.pink]

function TimelineItem({ year, title, desc, side, delay, ci }: { year: string; title: string; desc: string; side: "left" | "right"; delay: number; ci: number }) {
    const { ref, inView } = useFadeUp()
    const color = tlColors[ci % tlColors.length]
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, x: side === "left" ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay }}
            className={`flex items-start gap-4 ${side === "right" ? "md:flex-row-reverse md:text-right" : ""}`}>
            <div className="flex-1 hidden md:block" />
            <div className="flex-shrink-0 z-10">
                <motion.div whileHover={{ scale: 1.15 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)`, boxShadow: `0 6px 20px ${color}55`, fontFamily: "'Jost', sans-serif" }}>
                    {year}
                </motion.div>
            </div>
            <motion.div whileHover={{ y: -4, boxShadow: `0 16px 48px ${color}15` }}
                className="flex-1 rounded-[24px] p-6"
                style={{
                    background: P.cream,
                    border: `1px solid ${color}25`,
                    borderLeft: side !== "right" ? `3px solid ${color}` : undefined,
                    borderRight: side === "right" ? `3px solid ${color}` : undefined,
                }}>
                <h4 className="font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: P.dark, fontSize: "1.15rem" }}>{title}</h4>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "rgb(100,100,115)", fontWeight: 300 }}>{desc}</p>
            </motion.div>
        </motion.div>
    )
}

function Bubble({ size, color, x, y, dur }: { size: number; color: string; x: string; y: string; dur: number }) {
    return (
        <motion.div className="absolute rounded-full pointer-events-none blur-2xl"
            style={{ width: size, height: size, left: x, top: y, background: color, opacity: 0.18 }}
            animate={{ y: [0, -22, 0], scale: [1, 1.06, 1] }}
            transition={{ repeat: Infinity, duration: dur, ease: "easeInOut" }} />
    )
}


export default function AboutPage() {
    const founderImgRef = useFadeUp()
    const founderTextRef = useFadeUp()
    const teamStatsRef = useFadeUp()
    const ctaRef = useFadeUp()

    const heroRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    const mRef = useFadeUp()
    const vRef = useFadeUp()

    return (
        <>
            <Head>
                <title>About Us | {schoolName} — {schoolLocation}s Most Trusted Early Learning Centre</title>
                <meta name="description" content={`Learn about ${schoolName} in ${schoolLocation} — our story, mission, philosophy, dedicated educators, and 15+ years of nurturing children with a Montessori-inspired, play-based curriculum.`} />
                <meta name="keywords" content={`preschool ${schoolLocation}, best preschool ${schoolLocation}, Montessori preschool, early childhood education, ${schoolName}`} />
                <meta property="og:title" content={`About ${schoolName} — ${schoolLocation}`} />
                <meta property="og:description" content={`15+ years of joyful, purposeful early childhood education in ${schoolLocation}.`} />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://littledreams.edu.in/about" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org", "@type": "EducationalOrganization",
                        "name": schoolName, "foundingDate": "2010",
                        "description": `${schoolLocation}'s most trusted Montessori-inspired preschool, nurturing children since 2010.`,
                        "url": "https://littledreams.edu.in",
                        "address": { "@type": "PostalAddress", "addressLocality": schoolLocation, "addressRegion": "Maharashtra", "addressCountry": "IN" },
                    })
                }} />
            </Head>

            <main className="relative overflow-hidden" style={{ background: P.cream }}>

                <section ref={heroRef} className="relative min-h-[95vh] flex items-center justify-center overflow-hidden"
                    aria-labelledby="about-hero-heading">
                    <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 -z-10">
                        <div className="absolute top-[-80px] left-[-80px] w-[480px] h-[480px] rounded-full blur-3xl opacity-25" style={{ background: `radial-gradient(circle, ${P.coral}, transparent 70%)` }} />
                        <div className="absolute top-[-60px] right-[-100px] w-[440px] h-[440px] rounded-full blur-3xl opacity-20" style={{ background: `radial-gradient(circle, ${P.sky}, transparent 70%)` }} />
                        <div className="absolute bottom-[-100px] left-[25%] w-[500px] h-[500px] rounded-full blur-3xl opacity-15" style={{ background: `radial-gradient(circle, ${P.purple}, transparent 70%)` }} />
                        <div className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full blur-3xl opacity-20" style={{ background: `radial-gradient(circle, ${P.amber}, transparent 70%)` }} />
                        <div className="absolute inset-0 opacity-[0.03]"
                            style={{ backgroundImage: "radial-gradient(circle, #555 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
                    </motion.div>

                    <Bubble size={90} color={P.coral} x="7%" y="12%" dur={5} />
                    <Bubble size={55} color={P.sky} x="84%" y="8%" dur={7} />
                    <Bubble size={110} color={P.amber} x="74%" y="62%" dur={6} />
                    <Bubble size={65} color={P.purple} x="4%" y="68%" dur={8} />
                    <Bubble size={45} color={P.pink} x="48%" y="3%" dur={4} />

                    {["🎨", "🌟", "📚", "🎵", "🌱", "✨", "🦋", "🎪"].map((e, i) => (
                        <motion.span key={i} className="absolute text-xl select-none pointer-events-none"
                            style={{ left: `${7 + i * 12}%`, top: `${8 + (i % 3) * 26}%`, opacity: 0.28 }}
                            animate={{ y: [0, i % 2 === 0 ? -16 : 16, 0], rotate: [0, i % 2 === 0 ? 12 : -12, 0] }}
                            transition={{ repeat: Infinity, duration: 3 + i * 0.5 }}>{e}</motion.span>
                    ))}

                    <div className="relative z-10 text-center max-w-4xl px-6">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                            <SectionLabel color={P.coral}>Our Story · Est. 2010</SectionLabel>
                        </motion.div>
                        <motion.h1 id="about-hero-heading"
                            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }}
                            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(44px, 7.5vw, 92px)", color: P.dark, letterSpacing: "-0.015em", lineHeight: 1.05 }}>
                            Fifteen Years of{" "}
                            <em className="not-italic" style={gt(g.coral)}>Nurturing</em>
                            <br />
                            <span style={{ fontWeight: 400, fontSize: "0.75em" }}>
                                Little Minds with{" "}<em className="not-italic" style={gt(g.sky)}>Big Dreams</em>
                            </span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35 }}
                            className="mt-8 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                            style={{ fontFamily: "'Jost', sans-serif", color: "rgb(80,80,95)", fontWeight: 300 }}>
                            We didn&apos;t set out to build a school. We set out to build a world where every child
                            wakes up excited to learn — and comes home glowing with stories to tell.
                        </motion.p>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                            className="mt-10 flex flex-wrap justify-center gap-3">
                            {[
                                { label: "Est. 2010", bg: g.coral }, { label: "Montessori", bg: g.sky },
                                { label: "2,400+ Alumni", bg: g.purple }, { label: "98% Satisfaction", bg: g.amber },
                                { label: "CCTV Secured", bg: g.teal },
                            ].map(({ label, bg }) => (
                                <span key={label} className="px-5 py-2 rounded-full text-white text-xs font-semibold tracking-wide shadow-lg"
                                    style={{ background: bg, fontFamily: "'Jost', sans-serif", letterSpacing: "0.06em" }}>{label}</span>
                            ))}
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
                            className="mt-14 flex flex-col items-center gap-2">
                            <span className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "'Jost', sans-serif", color: P.teal }}>Scroll to explore</span>
                            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
                                className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1" style={{ borderColor: `${P.teal}50` }}>
                                <div className="w-1 h-2 rounded-full" style={{ background: P.teal }} />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>


                <section className="relative py-28 px-6 overflow-hidden" aria-labelledby="mission-heading"
                    style={{ background: "linear-gradient(170deg, #FFFDF8 0%, #FFF0F0 45%, #F0FBFF 100%)" }}>
                    <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full blur-3xl opacity-18 pointer-events-none" style={{ background: P.coral }} />
                    <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full blur-3xl opacity-14 pointer-events-none" style={{ background: P.sky }} />

                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-stretch">
                        <motion.div ref={mRef.ref}
                            initial={{ opacity: 0, x: -60, rotate: -1.5 }} animate={mRef.inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
                            transition={{ duration: 0.9 }}
                            className="relative rounded-[36px] p-10 overflow-hidden"
                            style={{ background: P.cream, border: `2px solid ${P.coral}25`, boxShadow: `0 24px 80px ${P.coral}12` }}>
                            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[34px]" style={{ background: g.coral }} />
                            <div className="absolute top-[-40px] right-[-40px] w-52 h-52 rounded-full blur-2xl opacity-12 pointer-events-none" style={{ background: P.coral }} />
                            <div className="mb-6 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-xl" style={{ background: g.coral }}>🌿</div>
                            <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ fontFamily: "'Jost', sans-serif", ...gt(g.coral) }}>Our Mission</p>
                            <h2 id="mission-heading" className="text-3xl md:text-4xl font-semibold leading-snug mb-5"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: P.dark }}>
                                To cultivate <span style={gt(g.coral)}>joy, curiosity</span> &amp; confidence — one child at a time.
                            </h2>
                            <p className="text-base leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,90,100)", fontWeight: 300 }}>
                                We believe the earliest years are the most formative. Our mission is to provide a safe,
                                stimulating, and beautifully designed environment where every child feels seen, valued,
                                and inspired to discover their own unique strengths.
                            </p>
                        </motion.div>

                        <motion.div ref={vRef.ref}
                            initial={{ opacity: 0, x: 60, rotate: 1.5 }} animate={vRef.inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
                            transition={{ duration: 0.9, delay: 0.1 }} className="flex flex-col gap-5">
                            <div className="rounded-[28px] p-8 relative overflow-hidden flex-1"
                                style={{ background: g.sky, boxShadow: `0 24px 64px ${P.sky}50` }}>
                                <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full opacity-18 pointer-events-none" style={{ background: "#fff" }} />
                                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3 text-white/70" style={{ fontFamily: "'Jost', sans-serif" }}>Our Vision</p>
                                <h3 className="text-2xl md:text-3xl font-semibold leading-snug text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    A generation of compassionate, creative world-changers.
                                </h3>
                                <p className="text-sm leading-relaxed text-white/80" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                                    We envision every {schoolName} graduate stepping into primary school — and life — with deep
                                    emotional intelligence, an unquenchable love of learning, and the confidence to lead.
                                </p>
                            </div>
                            <div className="rounded-[24px] p-6 flex items-start gap-5"
                                style={{ background: P.cream, border: `1.5px solid ${P.purple}25`, boxShadow: `0 8px 32px ${P.purple}0e` }}>
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-md" style={{ background: g.purple }}>📚</div>
                                <div>
                                    <p className="font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: P.dark, fontSize: "1.1rem" }}>Montessori-Inspired Philosophy</p>
                                    <p className="text-sm leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,90,100)", fontWeight: 300 }}>
                                        Child-led exploration, hands-on materials, and mixed-age group learning help children develop at their own natural pace without pressure.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>


                <section className="relative py-28 px-6 overflow-hidden" aria-labelledby="founder-heading"
                    style={{ background: "linear-gradient(160deg, #F0FFF8 0%, #FFFDF8 50%, #FFF0FA 100%)" }}>
                    <div className="absolute right-[-30px] top-[40%] text-[190px] font-bold leading-none select-none pointer-events-none opacity-[0.03] -translate-y-1/2"
                        style={{ fontFamily: "'Cormorant Garamond', serif", ...gt(g.amber) }} aria-hidden="true">2010</div>

                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionLabel color={P.amber}>Our Founder</SectionLabel>
                            <h2 className="text-4xl md:text-5xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: P.dark }}>
                                The Heart Behind <span style={gt(g.amber)}>Little Dreams</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-5 gap-12 items-center">
                            {(() => {
                                return (
                                    <motion.div ref={founderImgRef.ref} initial={{ opacity: 0, x: -70 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 1 }} className="md:col-span-2 flex justify-center">
                                        <div className="relative">
                                            <motion.div className="absolute inset-[-18px] rounded-full"
                                                animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                                                style={{ border: `2px dashed ${P.amber}50`, borderRadius: "50%" }} />
                                            <motion.div className="absolute inset-[-34px] rounded-full"
                                                animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
                                                style={{ border: `1.5px dashed ${P.coral}38`, borderRadius: "50%" }} />
                                            <div className="w-72 h-72 md:w-80 md:h-80 rounded-[40px] overflow-hidden relative"
                                                style={{ boxShadow: `0 40px 100px ${P.amber}28, 0 0 0 4px rgba(255,255,255,0.9)` }}>
                                                <Image src="/images/founder.jpg"
                                                    alt={`Mrs. Priya Sharma — Founder & Director of ${schoolName} ${schoolLocation}`}
                                                    fill className="object-cover" />
                                                <div className="absolute bottom-0 left-0 right-0 h-28"
                                                    style={{ background: "linear-gradient(to top, rgba(26,26,46,0.65), transparent)" }} />
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <p className="text-white font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>Mrs. Priya Sharma</p>
                                                    <p className="text-white/70 text-xs tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Founder &amp; Director</p>
                                                </div>
                                            </div>
                                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}
                                                className="absolute -bottom-5 -right-5 px-5 py-3 rounded-2xl shadow-xl"
                                                style={{ background: g.amber, boxShadow: `0 12px 32px ${P.amber}50` }}>
                                                <p className="text-white text-xs font-semibold tracking-wider" style={{ fontFamily: "'Jost', sans-serif" }}>B.Ed · M.Ed · 20yr exp</p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )
                            })()}

                            {(() => {
                                const { ref, inView } = useFadeUp()
                                return (
                                    <motion.div ref={ref} initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 1, delay: 0.1 }} className="md:col-span-3">
                                        <h2 id="founder-heading" className="text-4xl md:text-5xl font-semibold leading-tight mb-6"
                                            style={{ fontFamily: "'Cormorant Garamond', serif", color: P.dark }}>
                                            &quot;I wanted to build a school{" "}
                                            <span style={gt(g.teal)}>I wished existed</span>{" "}
                                            when I was a child.&quot;
                                        </h2>
                                        <div className="space-y-4 text-base leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,90,100)", fontWeight: 300 }}>
                                            <p>After two decades in childhood education across Mumbai and Pune, Mrs. Priya Sharma returned to {schoolLocation} with one dream: to create a preschool that felt less like a classroom and more like a second home.</p>
                                            <p>She designed every corner of {schoolName} herself — from the sensory gardens to the reading nooks — ensuring that the space itself became a teacher. Today, over 2,400 children have called this place their first school.</p>
                                        </div>
                                        <div className="mt-8 flex flex-wrap gap-3">
                                            {[
                                                { label: "B.Ed, Mumbai University", color: P.coral },
                                                { label: "M.Ed in Early Childhood", color: P.sky },
                                                { label: "Montessori Certified — AMI", color: P.teal },
                                                { label: "20+ Years Teaching", color: P.amber },
                                            ].map(({ label, color }) => (
                                                <span key={label} className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-white shadow-md"
                                                    style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, fontFamily: "'Jost', sans-serif" }}>
                                                    ✦ {label}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )
                            })()}
                        </div>
                    </div>
                </section>


                <section className="relative py-28 px-6 overflow-hidden" aria-labelledby="values-heading"
                    style={{ background: "linear-gradient(160deg, #FFF5F5 0%, #FFFDF8 50%, #F5F0FF 100%)" }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-[0.07] pointer-events-none"
                        style={{ background: `conic-gradient(${P.coral}, ${P.amber}, ${P.teal}, ${P.sky}, ${P.purple}, ${P.pink}, ${P.coral})` }} />
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionLabel color={P.purple}>What We Stand For</SectionLabel>
                            <h2 id="values-heading" className="text-4xl md:text-6xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: P.dark }}>
                                Our <span style={gt(g.rainbow)}>Core Values</span>
                            </h2>
                            <p className="mt-4 max-w-xl mx-auto text-base leading-relaxed"
                                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,90,100)", fontWeight: 300 }}>
                                Every decision — from curriculum design to classroom colours — flows from six guiding principles.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: "🌱", title: "Child-Led Learning", desc: "We follow the child's curiosity, not a rigid schedule. Every child's learning journey is unique and we honour that.", delay: 0, ci: 0 },
                                { icon: "🤝", title: "Trust & Transparency", desc: "Parents are partners. We share daily updates, maintain open communication and welcome you into our classroom anytime.", delay: 0.08, ci: 1 },
                                { icon: "🧠", title: "Holistic Development", desc: "Cognitive, emotional, social and physical growth — we nurture the whole child, not just academic readiness.", delay: 0.16, ci: 2 },
                                { icon: "🎨", title: "Creative Freedom", desc: "Art, music, drama, and imaginative play are not extras — they are the curriculum. Creativity is intelligence having fun.", delay: 0.24, ci: 3 },
                                { icon: "🛡️", title: "Safety Above All", desc: "CCTV-monitored campus, verified staff, secure entry, and a zero-tolerance policy on any form of harm or humiliation.", delay: 0.32, ci: 4 },
                                { icon: "🌍", title: "Inclusive Community", desc: "Every background, ability, and learning style is celebrated. Diversity is our greatest strength and we teach children to cherish it.", delay: 0.40, ci: 5 },
                            ].map(v => <ValueCard key={v.title} {...v} />)}
                        </div>
                    </div>
                </section>


                <section className="relative py-28 px-6 overflow-hidden" aria-labelledby="timeline-heading"
                    style={{ background: "linear-gradient(180deg, #FFFDF8, #F0FFFD)" }}>
                    <div className="absolute left-[-150px] top-[35%] text-[150px] font-bold leading-none select-none pointer-events-none opacity-[0.03] -rotate-90"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: P.teal }} aria-hidden="true">JOURNEY</div>
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionLabel color={P.teal}>Our Journey</SectionLabel>
                            <h2 id="timeline-heading" className="text-4xl md:text-6xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: P.dark }}>
                                Milestones That <span style={gt(g.teal)}>Made Us</span>
                            </h2>
                        </div>
                        <div className="relative">
                            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2"
                                style={{ background: `linear-gradient(to bottom, transparent, ${P.teal}35 10%, ${P.teal}35 90%, transparent)` }} />
                            <div className="space-y-10 pl-16 md:pl-0">
                                {[
                                    { year: "'10", title: "The First Bell", desc: `${schoolName} opens its doors in ${schoolLocation} with 18 children, 2 teachers, and one boundless dream.`, side: "left" as const, delay: 0, ci: 0 },
                                    { year: "'13", title: "Montessori Certification", desc: `Our full teaching team completed AMI Montessori certification — among the first preschools in ${schoolLocation}.`, side: "right" as const, delay: 0.1, ci: 1 },
                                    { year: "'16", title: "New Campus & Sensory Garden", desc: "We moved to our purpose-built campus featuring India's first preschool sensory garden.", side: "left" as const, delay: 0, ci: 2 },
                                    { year: "'19", title: "1,000 Alumni Milestone", desc: "Our 1,000th graduate walked across the stage — many returning with their own children a decade later.", side: "right" as const, delay: 0.1, ci: 3 },
                                    { year: "'22", title: "CCTV & Smart Safety System", desc: "Installed a complete 24/7 monitored security ecosystem, giving parents real-time peace of mind.", side: "left" as const, delay: 0, ci: 4 },
                                    { year: "'25", title: `${schoolLocation}'s #1 Preschool`, desc: `Ranked the most trusted preschool in ${schoolLocation} by 3rd-party parent survey — 98% satisfaction rate.`, side: "right" as const, delay: 0.1, ci: 5 },
                                ].map(item => <TimelineItem key={item.year} {...item} />)}
                            </div>
                        </div>
                    </div>
                </section>


                <section className="relative py-28 px-6 overflow-hidden" aria-labelledby="team-heading"
                    style={{ background: "linear-gradient(160deg, #FFF5FB 0%, #FFFDF8 50%, #F0F5FF 100%)" }}>
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <SectionLabel color={P.pink}>The Educators</SectionLabel>
                            <h2 id="team-heading" className="text-4xl md:text-6xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: P.dark }}>
                                Faces Behind Every <span style={gt(g.purple)}>Bright Moment</span>
                            </h2>
                            <p className="mt-4 max-w-xl mx-auto text-base leading-relaxed"
                                style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,90,100)", fontWeight: 300 }}>
                                Every educator at {schoolName} holds a formal degree in early childhood education and undergoes 40+ hours of training annually.
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { name: "Mrs. Priya Sharma", role: "Founder & Director", qualification: "M.Ed · AMI Montessori · 20+ years experience", emoji: "👩‍🏫", delay: 0, ci: 0 },
                                { name: "Ms. Ananya Kulkarni", role: "Head of Curriculum", qualification: "B.Ed, Pune University · Child Psychology Diploma", emoji: "📖", delay: 0.1, ci: 1 },
                                { name: "Mr. Rohan Desai", role: "Movement & Yoga", qualification: "Certified Children's Yoga Instructor · 8 years", emoji: "🧘", delay: 0.2, ci: 2 },
                                { name: "Ms. Shruti Patil", role: "Art & Music Lead", qualification: "Fine Arts, Sir J.J. School · Carnatic Music Grad", emoji: "🎨", delay: 0.3, ci: 3 },
                            ].map(m => <TeamCard key={m.name} {...m} />)}
                        </div>
                        {(() => {
                            const { ref, inView } = useFadeUp()
                            return (
                                <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.7, delay: 0.3 }}
                                    className="mt-12 rounded-[32px] py-8 px-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                                    style={{ background: P.cream, border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 8px 40px rgba(0,0,0,0.05)" }}>
                                    {[
                                        { value: "25", label: "Dedicated Staff", grad: g.coral },
                                        { value: "1:8", label: "Teacher–Child Ratio", grad: g.sky },
                                        { value: "40hrs", label: "Annual Training", grad: g.purple },
                                        { value: "100%", label: "Degree Holders", grad: g.amber },
                                    ].map(s => (
                                        <div key={s.label}>
                                            <p className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", ...gt(s.grad) }}>{s.value}</p>
                                            <p className="mt-1 text-[11px] uppercase tracking-widest" style={{ fontFamily: "'Jost', sans-serif", color: "rgb(110,110,120)" }}>{s.label}</p>
                                        </div>
                                    ))}
                                </motion.div>
                            )
                        })()}
                    </div>
                </section>


                {(() => {
                    const { ref, inView } = useFadeUp()
                    return (
                        <section className="py-24 px-6" aria-labelledby="cta-heading">
                            <motion.div ref={ref}
                                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{ duration: 0.9 }}
                                className="max-w-4xl mx-auto relative rounded-[44px] overflow-hidden py-20 px-8 text-center"
                                style={{
                                    background: `linear-gradient(135deg, ${P.coral} 0%, ${P.orange} 18%, ${P.amber} 36%, ${P.teal} 60%, ${P.sky} 78%, ${P.indigo} 100%)`,
                                    boxShadow: `0 48px 120px ${P.coral}38, 0 20px 60px ${P.indigo}28`,
                                }}>
                                <div className="absolute inset-0 opacity-[0.055] pointer-events-none"
                                    style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />
                                <div className="absolute top-[-60px] left-[-60px] w-80 h-80 rounded-full pointer-events-none opacity-14" style={{ background: "radial-gradient(circle, #fff, transparent 70%)" }} />
                                <div className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full pointer-events-none opacity-10" style={{ background: "radial-gradient(circle, #fff, transparent 70%)" }} />
                                <div className="relative z-10">
                                    <div className="flex justify-center gap-3 mb-6">
                                        {["🌟", "🎨", "🌱", "📚", "🎵"].map((e, i) => (
                                            <motion.span key={i} className="text-3xl"
                                                animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0] }}
                                                transition={{ repeat: Infinity, duration: 1.5 + i * 0.3 }}>{e}</motion.span>
                                        ))}
                                    </div>
                                    <h2 id="cta-heading" className="text-4xl md:text-6xl font-semibold text-white leading-tight mb-4"
                                        style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 2px 20px rgba(0,0,0,0.12)" }}>
                                        Ready to Begin Their Story?
                                    </h2>
                                    <p className="text-white/90 text-lg mb-10 max-w-lg mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>
                                        Admissions are open for 2025–26. Schedule a private tour and see why {schoolLocation}'s most discerning parents choose {schoolName}.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button className="px-10 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 hover:scale-105"
                                            style={{ background: "rgba(255,255,255,0.95)", color: P.coral, fontFamily: "'Jost', sans-serif", fontSize: "0.875rem", letterSpacing: "0.08em", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
                                            Schedule a Private Tour
                                        </button>
                                        <button className="px-10 py-4 rounded-full font-semibold tracking-wide border-2 border-white/50 text-white transition-all duration-300 hover:scale-105 hover:bg-white/15"
                                            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.875rem", letterSpacing: "0.08em" }}>
                                            Download Prospectus →
                                        </button>
                                    </div>
                                    <p className="mt-8 text-white/60 text-xs tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
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