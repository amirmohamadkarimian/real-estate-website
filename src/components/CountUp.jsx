import { useEffect, useRef, useState } from 'react'

/**
 * Counts up to `value` once the element scrolls into view.
 */
export default function CountUp({ value, duration = 1500, className = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      if (started.current) return
      started.current = true

      const reduce =
        typeof matchMedia !== 'undefined' &&
        matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) {
        setDisplay(value)
        return
      }

      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(value * eased))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    if (typeof IntersectionObserver === 'undefined') {
      run()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString('en-US')}
    </span>
  )
}
