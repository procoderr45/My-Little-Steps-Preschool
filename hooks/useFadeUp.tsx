import { useInView } from "framer-motion"
import { useRef } from "react"

export function useFadeUp(threshold = 0.2) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-60px", amount: threshold })
    return { ref, inView }
}