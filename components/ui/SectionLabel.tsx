// components/ui/SectionLabel.tsx
export function SectionLabel({ children, color = "#0D9488" }: { children: string; color?: string }) {
    return (
        <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px w-10" style={{ background: color }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                style={{ color, fontFamily: "'Jost', sans-serif" }}>
                {children}
            </span>
            <div className="h-px w-10" style={{ background: color }} />
        </div>
    )
}