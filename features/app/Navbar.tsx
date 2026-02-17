"use client"

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { schoolLocation, schoolName } from "@/utils/constants"

// ─── Palette (matches site theme) ────────────────────────────────────────────
const P = {
    coral: "#FF6B6B", orange: "#FF8E53", amber: "#F59E0B",
    teal: "#0D9488", sky: "#38BDF8", indigo: "#6366F1",
    purple: "#A855F7", pink: "#EC4899", cream: "#FFFDF8", dark: "#1A1A2E",
}
const g = {
    coral: `linear-gradient(135deg, ${P.coral}, ${P.orange})`,
    teal: `linear-gradient(135deg, ${P.teal}, #059669)`,
    sky: `linear-gradient(135deg, ${P.sky}, ${P.indigo})`,
    purple: `linear-gradient(135deg, ${P.purple}, ${P.pink})`,
    amber: `linear-gradient(135deg, ${P.amber}, #FCD34D)`,
    rainbow: `linear-gradient(90deg, ${P.coral}, ${P.amber}, ${P.teal}, ${P.sky}, ${P.purple})`,
}

// ─── Nav links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
    { label: "Home", href: "/", color: P.coral, grad: g.coral },
    { label: "About Us", href: "/about", color: P.teal, grad: g.teal },
    { label: "Programs", href: "/programs", color: P.sky, grad: g.sky },
    { label: "Gallery", href: "/gallery", color: P.purple, grad: g.purple },
    { label: "Admissions", href: "/admissions", color: P.amber, grad: g.amber },
    { label: "Contact", href: "/contact", color: P.pink, grad: g.purple },
]

// ─── Animated dot for active/hover ───────────────────────────────────────────
function NavDot({ color }: { color: string }) {
    return (
        <motion.span
            layoutId="nav-dot"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: color }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
    )
}

// ─── Desktop nav item ────────────────────────────────────────────────────────
function NavItem({ link, isActive }: { link: typeof NAV_LINKS[0]; isActive: boolean }) {
    const [hovered, setHovered] = useState(false)
    return (
        <Link href={link.href} className="relative group flex flex-col items-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute inset-x-[-12px] inset-y-[-6px] rounded-2xl pointer-events-none"
                        style={{ background: `${link.color}12`, border: `1px solid ${link.color}25` }}
                    />
                )}
            </AnimatePresence>

            <span
                className="relative z-10 text-sm font-medium tracking-wide transition-all duration-200"
                style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: isActive ? 600 : 400,
                    ...(isActive || hovered
                        ? { background: link.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                        : { color: "rgb(60,60,75)" }
                    )
                }}
            >
                {link.label}
            </span>

            {isActive && (
                <motion.div
                    layoutId="active-underline"
                    className="absolute -bottom-[14px] left-1/2 -translate-x-1/2 h-[3px] rounded-full"
                    style={{ background: link.grad, width: "80%" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            )}
        </Link>
    )
}

// ─── Mobile menu item ─────────────────────────────────────────────────────────
function MobileNavItem({ link, isActive, onClick, index }: {
    link: typeof NAV_LINKS[0]; isActive: boolean; onClick: () => void; index: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
        >
            <Link href={link.href} onClick={onClick}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group"
                style={{
                    background: isActive ? `${link.color}10` : "transparent",
                    border: isActive ? `1px solid ${link.color}25` : "1px solid transparent",
                }}>
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
                    style={{ background: link.grad, boxShadow: `0 2px 8px ${link.color}50` }} />
                <span className="text-base font-medium"
                    style={{
                        fontFamily: "'Jost', sans-serif",
                        fontWeight: isActive ? 600 : 400,
                        ...(isActive
                            ? { background: link.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }
                            : { color: "rgb(40,40,55)" }
                        )
                    }}>
                    {link.label}
                </span>
                {isActive && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="ml-auto w-1.5 h-4 rounded-full"
                        style={{ background: link.grad }} />
                )}
            </Link>
        </motion.div>
    )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [scrollDir, setScrollDir] = useState<"up" | "down">("up")
    const lastScrollY = useRef(0)

    // Scroll tracking
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            setScrolled(y > 20)
            setScrollDir(y > lastScrollY.current ? "down" : "up")
            lastScrollY.current = y
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [menuOpen])

    const hideNav = scrollDir === "down" && scrolled && !menuOpen

    return (
        <>
            <motion.header
                animate={{ y: hideNav ? -100 : 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="fixed top-0 left-0 right-0 z-50"
                style={{ willChange: "transform" }}
            >
                <div className="h-[3px] w-full" style={{ background: g.rainbow }} />

                <motion.div
                    animate={{
                        background: scrolled
                            ? "rgba(255,253,248,0.82)"
                            : "rgba(255,253,248,0.6)",
                        boxShadow: scrolled
                            ? "0 8px 40px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset"
                            : "none",
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
                    className="w-full"
                >
                    <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-[68px]"
                        aria-label="Main navigation">

                        <Link href="/" className="flex items-center gap-3 group flex-shrink-0" aria-label={`${schoolName} — Home`}>
                            <motion.div
                                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-lg flex-shrink-0"
                                style={{ background: g.coral, boxShadow: `0 4px 16px ${P.coral}45` }}
                            >
                                🌟
                                <motion.div
                                    className="absolute inset-0 rounded-2xl pointer-events-none"
                                    animate={{ boxShadow: [`0 0 0 0px ${P.coral}40`, `0 0 0 6px ${P.coral}00`] }}
                                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
                                />
                            </motion.div>

                            <div className="flex flex-col leading-none">
                                <span className="font-bold text-lg leading-tight"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', serif",
                                        background: g.rainbow,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        letterSpacing: "-0.01em",
                                    }}>
                                    {schoolName}
                                </span>
                                <span className="text-[10px] tracking-[0.18em] mt-2 uppercase font-medium"
                                    style={{ fontFamily: "'Jost', sans-serif", color: "rgb(140,140,155)" }}>
                                    {schoolLocation}
                                </span>
                            </div>
                        </Link>

                        <div className="hidden md:flex items-center gap-7 relative">
                            {NAV_LINKS.map(link => (
                                <NavItem key={link.href} link={link} isActive={pathname === link.href} />
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="hidden sm:block">
                                <Link href="/admissions"
                                    className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold tracking-wide shadow-lg"
                                    style={{
                                        background: g.coral,
                                        fontFamily: "'Jost', sans-serif",
                                        letterSpacing: "0.05em",
                                        boxShadow: `0 6px 20px ${P.coral}45`,
                                    }}>
                                    <motion.div
                                        className="absolute inset-0 -translate-x-full"
                                        animate={{ translateX: ["−100%", "200%"] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 2 }}
                                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
                                    />
                                    <span className="relative z-10">Enrol Now</span>
                                    <span className="relative z-10 text-base">✨</span>
                                </Link>
                            </motion.div>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setMenuOpen(v => !v)}
                                className="md:hidden relative w-10 h-10 rounded-2xl flex flex-col items-center justify-center gap-[5px]"
                                style={{
                                    background: menuOpen ? `${P.coral}12` : "rgba(0,0,0,0.04)",
                                    border: `1px solid ${menuOpen ? P.coral + "30" : "rgba(0,0,0,0.07)"}`,
                                }}
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={menuOpen}
                            >
                                <motion.span className="block w-5 h-[2px] rounded-full origin-center"
                                    animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                                    transition={{ duration: 0.25 }}
                                    style={{ background: menuOpen ? P.coral : P.dark }} />
                                <motion.span className="block w-5 h-[2px] rounded-full"
                                    animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ background: P.dark }} />
                                <motion.span className="block w-5 h-[2px] rounded-full origin-center"
                                    animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                                    transition={{ duration: 0.25 }}
                                    style={{ background: menuOpen ? P.coral : P.dark }} />
                            </motion.button>
                        </div>
                    </nav>
                </motion.div>
            </motion.header>


            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-40"
                            style={{ background: "rgba(26,26,46,0.35)", backdropFilter: "blur(4px)" }}
                            onClick={() => setMenuOpen(false)}
                            aria-hidden="true"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 35 }}
                            className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] flex flex-col overflow-hidden"
                            style={{
                                background: "rgba(255,253,248,0.97)",
                                backdropFilter: "blur(24px)",
                                boxShadow: "-16px 0 60px rgba(0,0,0,0.12)",
                                borderLeft: "1px solid rgba(0,0,0,0.06)",
                            }}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: g.rainbow }} />

                            <div className="flex items-center justify-between px-6 pt-5 pb-4"
                                style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-md"
                                        style={{ background: g.coral }}>🌟</div>
                                    <div>
                                        <p className="font-bold text-sm leading-none"
                                            style={{ fontFamily: "'Cormorant Garamond', serif", color: P.dark }}>
                                            {schoolName}
                                        </p>
                                        <p className="text-[10px] tracking-widest uppercase mt-0.5"
                                            style={{ fontFamily: "'Jost', sans-serif", color: "rgb(160,160,175)" }}>
                                            Preschool
                                        </p>
                                    </div>
                                </div>
                                <motion.button whileTap={{ scale: 0.9 }}
                                    onClick={() => setMenuOpen(false)}
                                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                                    style={{ background: "rgba(255,107,107,0.1)", border: `1px solid ${P.coral}25` }}
                                    aria-label="Close menu">
                                    <span className="text-lg" style={{ color: P.coral }}>✕</span>
                                </motion.button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
                                {NAV_LINKS.map((link, i) => (
                                    <MobileNavItem key={link.href} link={link}
                                        isActive={pathname === link.href}
                                        onClick={() => setMenuOpen(false)}
                                        index={i} />
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                className="px-5 py-5"
                                style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {["Montessori", "CCTV Safe", "1:8 Ratio"].map((tag, i) => {
                                        const tagColors = [P.teal, P.sky, P.purple]
                                        const tagGrads = [g.teal, g.sky, g.purple]
                                        return (
                                            <span key={tag} className="px-3 py-1 rounded-full text-white text-[10px] font-semibold tracking-wide"
                                                style={{ background: tagGrads[i], fontFamily: "'Jost', sans-serif", boxShadow: `0 2px 8px ${tagColors[i]}40` }}>
                                                {tag}
                                            </span>
                                        )
                                    })}
                                </div>
                                <Link href="/admissions" onClick={() => setMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-white font-semibold text-sm tracking-wide shadow-xl"
                                    style={{
                                        background: `linear-gradient(135deg, ${P.coral}, ${P.orange}, ${P.amber})`,
                                        fontFamily: "'Jost', sans-serif",
                                        boxShadow: `0 8px 24px ${P.coral}40`,
                                        letterSpacing: "0.06em",
                                    }}>
                                    ✨ &nbsp; Enrol for 2025–26
                                </Link>
                                <p className="text-center mt-3 text-[10px] tracking-widest uppercase"
                                    style={{ fontFamily: "'Jost', sans-serif", color: "rgb(170,170,185)" }}>
                                    Limited seats available
                                </p>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="h-[calc(68px+3px)]" aria-hidden="true" />
        </>
    )
}