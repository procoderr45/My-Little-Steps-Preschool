import { ValueCard } from "@/components/school/ValueCard"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { g, P } from "@/lib/colors"
import { gt } from "@/lib/design-utils"

const CoreValues = () => {
    return (
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
    )
}