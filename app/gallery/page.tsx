"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import { useState, useRef } from "react"

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
}
function gt(gradient: string) {
    return { background: gradient, WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent" as const, backgroundClip: "text" as const }
}

// ─── Gallery data ─────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Art & Craft", "Sports", "Learning", "Events", "Nature"]

const PHOTOS = [
    { id: 1, src: "/images/gallery/gallery-paint.webp", cat: "Art & Craft", label: "Finger Painting Day", color: P.coral, grad: g.coral, span: "col-span-2 row-span-2" },
    { id: 2, src: "/images/gallery/gallery-sports.jpg", cat: "Sports", label: "Sports Morning", color: P.teal, grad: g.teal, span: "col-span-1 row-span-1" },
    { id: 3, src: "/images/gallery/gallery-learn1.jpg", cat: "Learning", label: "Story Time", color: P.sky, grad: g.sky, span: "col-span-1 row-span-1" },
    { id: 5, src: "/images/gallery/gallery-garden.jpeg", cat: "Nature", label: "Garden Explorers", color: P.purple, grad: g.purple, span: "col-span-1 row-span-1" },
    { id: 6, src: "/images/gallery/gallery-clay.webp", cat: "Art & Craft", label: "Clay Modelling", color: P.pink, grad: g.purple, span: "col-span-1 row-span-1" },
    { id: 7, src: "/images/gallery/gallery-yoga.jpg", cat: "Sports", label: "Yoga & Movement", color: P.teal, grad: g.teal, span: "col-span-2 row-span-1" },
    { id: 8, src: "/images/gallery/learn2.jpg", cat: "Learning", label: "Montessori Materials", color: P.sky, grad: g.sky, span: "col-span-1 row-span-1" },
    { id: 9, src: "/images/gallery/gallery-diwali.jpeg", cat: "Events", label: "Diwali Celebrations", color: P.amber, grad: g.amber, span: "col-span-1 row-span-1" },
    { id: 12, src: "/images/gallery/learn3.jpg", cat: "Learning", label: "Science Discovery", color: P.sky, grad: g.sky, span: "col-span-2 row-span-1" },
    { id: 4, src: "/images/gallery/event1.jpg", cat: "Events", label: "Annual Day 2024", color: P.amber, grad: g.amber, span: "col-span-1 row-span-2" },
    { id: 13, src: "/images/gallery/learn3.jpg", cat: "Learning", label: "Science Discovery", color: P.sky, grad: g.sky, span: "col-span-2 row-span-1" },
]

const CAT_COLORS: Record<string, { color: string; grad: string }> = {
    "All": { color: P.dark, grad: `linear-gradient(135deg, ${P.dark}, #444)` },
    "Art & Craft": { color: P.coral, grad: g.coral },
    "Sports": { color: P.teal, grad: g.teal },
    "Learning": { color: P.sky, grad: g.sky },
    "Events": { color: P.amber, grad: g.amber },
    "Nature": { color: P.purple, grad: g.purple },
}

function Lightbox({ photo, onClose, onPrev, onNext }: {
    photo: typeof PHOTOS[0]; onClose: () => void; onPrev: () => void; onNext: () => void
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(26,26,46,0.92)", backdropFilter: "blur(16px)" }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.88, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.88, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={e => e.stopPropagation()}
                className="relative max-w-4xl w-full rounded-[32px] overflow-hidden"
                style={{ boxShadow: `0 48px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)` }}
            >
                <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ background: photo.grad }} />

                <div className="relative w-full aspect-[4/3] bg-gray-900">
                    <Image src={photo.src} alt={photo.label} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 h-32"
                        style={{ background: "linear-gradient(to top, rgba(26,26,46,0.9), transparent)" }} />
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full text-white text-[10px] font-semibold tracking-widest uppercase mb-2"
                                style={{ background: photo.grad, fontFamily: "'Jost', sans-serif" }}>
                                {photo.cat}
                            </span>
                            <p className="text-white text-xl font-semibold"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                {photo.label}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <button onClick={onClose}
                className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center text-white text-lg font-bold z-10"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                aria-label="Close">✕</button>

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                onClick={e => { e.stopPropagation(); onPrev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white z-10"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                aria-label="Previous">←</motion.button>

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                onClick={e => { e.stopPropagation(); onNext() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white z-10"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                aria-label="Next">→</motion.button>
        </motion.div>
    )
}

function PhotoCard({ photo, index, onClick }: { photo: typeof PHOTOS[0]; index: number; onClick: () => void }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-40px" })
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: (index % 6) * 0.07, ease: "easeOut" }}
            whileHover={{ y: -6, boxShadow: `0 28px 64px ${photo.color}30` }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative rounded-[24px] overflow-hidden cursor-pointer ${photo.span}`}
            style={{
                boxShadow: `0 8px 32px rgba(0,0,0,0.08)`,
                border: `1px solid ${photo.color}18`,
            }}
        >
            <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ background: photo.grad }} />

            <div className="relative w-full h-full min-h-[180px] bg-gray-100">
                <Image src={photo.src} alt={photo.label} fill className="object-cover transition-transform duration-700"
                    style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }} />

                <div className="absolute inset-0 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(26,26,46,0.55) 0%, transparent 50%)", opacity: hovered ? 0 : 1 }} />

                <motion.div className="absolute inset-0"
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: `linear-gradient(to top, ${photo.color}cc 0%, ${photo.color}44 40%, transparent 70%)` }} />

                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <AnimatePresence>
                        {hovered && (
                            <motion.span
                                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.2 }}
                                className="inline-block px-2.5 py-1 rounded-full text-white text-[9px] font-semibold tracking-widest uppercase mb-1"
                                style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", fontFamily: "'Jost', sans-serif" }}>
                                {photo.cat}
                            </motion.span>
                        )}
                    </AnimatePresence>
                    <p className="text-white text-sm font-semibold leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
                        {photo.label}
                    </p>
                </div>

                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10 text-sm"
                            style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}>
                            🔍
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default function () {
    const [activeCategory, setActiveCategory] = useState("All")
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
    const headerRef = useRef(null)
    const headerInView = useInView(headerRef, { once: true })

    const filtered = activeCategory === "All" ? PHOTOS : PHOTOS.filter(p => p.cat === activeCategory)
    const lightboxPhotos = filtered

    return (
        <section className="relative py-24 px-4 sm:px-6 overflow-hidden"
            style={{ background: "linear-gradient(170deg, #FFFDF8 0%, #F5F0FF 40%, #F0FBFF 100%)" }}
            aria-labelledby="gallery-heading">

            <div className="absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full blur-3xl opacity-15 pointer-events-none"
                style={{ background: P.purple }} />
            <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full blur-3xl opacity-12 pointer-events-none"
                style={{ background: P.sky }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.06] pointer-events-none"
                style={{ background: `conic-gradient(${P.coral}, ${P.amber}, ${P.teal}, ${P.sky}, ${P.purple}, ${P.coral})` }} />

            <div className="max-w-7xl mx-auto">

                <div ref={headerRef} className="text-center mb-14">
                    <motion.div initial={{ opacity: 0, y: -16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 justify-center mb-5">
                        <div className="h-px w-10" style={{ background: P.purple }} />
                        <span className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                            style={{ color: P.purple, fontFamily: "'Jost', sans-serif" }}>Life at Little Dreams</span>
                        <div className="h-px w-10" style={{ background: P.purple }} />
                    </motion.div>

                    <motion.h2 id="gallery-heading"
                        initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-semibold leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: P.dark }}>
                        Every Day is a{" "}
                        <span style={gt(`linear-gradient(135deg, ${P.coral} 0%, ${P.amber} 50%, ${P.purple} 100%)`)}>
                            New Adventure
                        </span>
                    </motion.h2>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-4 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
                        style={{ fontFamily: "'Jost', sans-serif", color: "rgb(90,90,105)", fontWeight: 300 }}>
                        Peek inside our classrooms, playgrounds and celebrations — moments
                        that show why children love coming to school every morning.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-2.5 mb-10">
                    {CATEGORIES.map(cat => {
                        const c = CAT_COLORS[cat]
                        const isActive = activeCategory === cat
                        return (
                            <motion.button key={cat}
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                                onClick={() => setActiveCategory(cat)}
                                className="relative px-5 py-2 rounded-full text-sm font-semibold tracking-wide overflow-hidden transition-all duration-200"
                                style={{
                                    fontFamily: "'Jost', sans-serif",
                                    background: isActive ? c.grad : "rgba(255,253,248,0.9)",
                                    color: isActive ? "#fff" : "rgb(80,80,95)",
                                    border: isActive ? "none" : `1.5px solid ${c.color}30`,
                                    boxShadow: isActive ? `0 6px 20px ${c.color}40` : "0 2px 8px rgba(0,0,0,0.04)",
                                    letterSpacing: "0.04em",
                                }}>
                                {cat}
                            </motion.button>
                        )
                    })}
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                        className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4"
                    >
                        {filtered.map((photo, i) => (
                            <PhotoCard key={photo.id} photo={photo} index={i}
                                onClick={() => setLightboxIdx(i)} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7 }}
                    className="mt-14 flex flex-col items-center gap-4">
                    <p className="text-sm" style={{ fontFamily: "'Jost', sans-serif", color: "rgb(130,130,145)", fontWeight: 300 }}>
                        Showing {filtered.length} of {PHOTOS.length} memories
                    </p>
                </motion.div>
            </div>

            <AnimatePresence>
                {lightboxIdx !== null && (
                    <Lightbox
                        photo={lightboxPhotos[lightboxIdx]}
                        onClose={() => setLightboxIdx(null)}
                        onPrev={() => setLightboxIdx(i => i === null ? null : (i - 1 + lightboxPhotos.length) % lightboxPhotos.length)}
                        onNext={() => setLightboxIdx(i => i === null ? null : (i + 1) % lightboxPhotos.length)}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}