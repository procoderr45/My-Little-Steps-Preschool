export function gt(gradient: string) {
    return {
        background: gradient,
        WebkitBackgroundClip: "text" as const,
        WebkitTextFillColor: "transparent" as const,
        backgroundClip: "text" as const,
    }
}