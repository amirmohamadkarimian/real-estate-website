import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { ArrowRightIcon, ArrowLeftIcon } from './Icons.jsx'
import { avatars } from '../data/content.js'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ *
 * Frame sequence config                                                *
 * ------------------------------------------------------------------ */
const FRAME_COUNT = 80
const FRAME_BASE = `${import.meta.env.BASE_URL}hero-frames/frame_`

function padFrame(i) {
  return FRAME_BASE + String(i).padStart(3, '0') + '.jpg'
}

/* ------------------------------------------------------------------------- *
 * Tunable timeline — every value is a 0 → 1 slice of the hero scroll range.
 * ------------------------------------------------------------------------- */
const TIMELINE = {
  tagline: [0, 0.1], //  0–10%  tagline fades in
  headline: { start: 0.1, end: 0.3, stagger: 0.035 }, // 10–30% lines slide up
  underline: [0.22, 0.34], //        orange underline draws itself
  subtext: [0.3, 0.38], //         subtext fades up
  cta: [0.36, 0.45], //            circular "Explore Properties" scales in
  bottomBar: [0.45, 0.6], //        avatars / counter / progress / arrows
  headlineExit: [0.6, 0.85], //       headline drifts up and out in 3D
  scriptSwap: [0.62, 0.76], //       script line becomes the full phrase
  final: [0.85, 0.97], //          final message + CTA
  contentExit: [0.78, 0.92], //      intro content clears out for the final message
}

const SCROLL_HEIGHT_VH = 350 // hero scroll length
const LERP = 0.14 // easing of the scroll scrub (higher = snappier)
const TILT_MAX_DEG = 3 // desktop mouse tilt
const TILT_LERP = 0.12

const SCRIPT_SHORT = 'A Brighter You'
const SCRIPT_LONG = 'A brighter way to live'
const FINAL_TITLE = 'Ready to live brighter?'
const FINAL_EYEBROW = 'Your next chapter'

const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n)
const segment = (p, [from, to]) => clamp01((p - from) / (to - from))

function BrushUnderline({ pathRef }) {
  return (
    <svg
      viewBox="0 0 240 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute -bottom-1 left-0 h-[0.16em] w-full text-gold-soft sm:-bottom-2"
    >
      <path
        ref={pathRef}
        d="M4 10.5C52 4.5 120 3.5 234 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ScriptSwoosh() {
  return (
    <svg
      viewBox="0 0 200 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute -bottom-1 left-0 h-4 w-full text-gold-soft/70"
    >
      <path
        d="M3 16C46 6 108 3 196 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Hero() {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const videoLayerRef = useRef(null)
  const overlayRef = useRef(null)
  const vignetteRef = useRef(null)
  const tiltRef = useRef(null)
  const taglineRef = useRef(null)
  const headlineRef = useRef(null)
  const lineRefs = useRef([])
  const underlineRef = useRef(null)
  const subtextRef = useRef(null)
  const ctaRef = useRef(null)
  const bottomBarRef = useRef(null)
  const scriptShortRef = useRef(null)
  const scriptLongRef = useRef(null)
  const finalRef = useRef(null)
  const counterRefs = useRef([])
  const progressRef = useRef(null)
  const lenisRef = useRef(null)
  const framesRef = useRef([])   // loaded HTMLImageElements
  const lastFrameRef = useRef(-1)
  const ctxRef = useRef(null)    // cached 2D rendering context

  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const circle =
    'grid h-11 w-11 place-items-center rounded-full border transition duration-300 ease-out'

  /* prefers-reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  /* Preload the JPG frame sequence. Mark ready once the first frame loads. */
  useEffect(() => {
    let cancelled = false
    const images = new Array(FRAME_COUNT)
    framesRef.current = images
    lastFrameRef.current = -1

    let loadedCount = 0
    const onLoad = (i) => {
      if (cancelled) return
      loadedCount++
      if (i === 0) {
        setReady(true)
      }
      // If the canvas is mounted and we just loaded frame 0, draw it immediately
      if (i === 0 && canvasRef.current) {
        const canvas = canvasRef.current
        canvas.width = canvas.offsetWidth || window.innerWidth
        canvas.height = canvas.offsetHeight || window.innerHeight
        if (!ctxRef.current) ctxRef.current = canvas.getContext('2d', { alpha: false })
        const ctx = ctxRef.current
        const cw = canvas.width
        const ch = canvas.height
        const iw = img.naturalWidth || img.width
        const ih = img.naturalHeight || img.height
        if (iw && ih) {
          const scale = Math.max(cw / iw, ch / ih)
          const dw = iw * scale
          const dh = ih * scale
          ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
        }
      }
    }
    const onError = (i) => {
      if (cancelled) return
      if (i === 0) setFailed(true)
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = padFrame(i)
      img.onload = () => onLoad(i)
      img.onerror = () => onError(i)
      images[i] = img
    }

    return () => {
      cancelled = true
    }
  }, [])

  /* Scroll-driven scrubbing, 3D depth and the text timeline. */
  useEffect(() => {
    const drawFrame = (progress) => {
      const canvas = canvasRef.current
      if (!canvas) return
      // Cache the 2D context so we don't call getContext every frame
      if (!ctxRef.current) ctxRef.current = canvas.getContext('2d', { alpha: false })
      const ctx = ctxRef.current
      if (!ctx) return
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))
      )
      if (frameIndex === lastFrameRef.current) return
      lastFrameRef.current = frameIndex
      const img = framesRef.current[frameIndex]
      if (!img || !img.complete) return
      // Maintain cover-fit: draw centered and cropped to fill canvas
      const cw = canvas.width
      const ch = canvas.height
      const iw = img.naturalWidth || img.width
      const ih = img.naturalHeight || img.height
      if (!iw || !ih) return
      const scale = Math.max(cw / iw, ch / ih)
      const dw = iw * scale
      const dh = ih * scale
      const dx = (cw - dw) / 2
      const dy = (ch - dh) / 2
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      // Context may be invalidated after resize, re-cache it
      ctxRef.current = canvas.getContext('2d', { alpha: false })
      // Redraw at current progress after resize
      drawFrame(lastFrameRef.current < 0 ? 0 : lastFrameRef.current / (FRAME_COUNT - 1))
      lastFrameRef.current = -1 // force redraw
    }

    const lineEls = lineRefs.current.filter(Boolean)
    const underline = underlineRef.current
    const underlineLength = underline ? underline.getTotalLength() : 0
    if (underline) underline.style.strokeDasharray = `${underlineLength}`

    let lastActive = -1

    const paint = (el, opacity, transform) => {
      if (!el) return
      el.style.opacity = opacity.toFixed(3)
      if (transform) el.style.transform = transform
    }

    const setCounters = (p) => {
      const active = Math.min(2, Math.floor(p * 3))
      if (active === lastActive) return
      lastActive = active
      counterRefs.current.forEach((el, i) => {
        if (el) el.style.color = i === active ? '#F7F4EE' : 'rgba(247, 244, 238, 0.4)'
      })
    }

    const apply = (p) => {
      // Backdrop: slight 3D push-in (transform only).
      if (videoLayerRef.current) {
        videoLayerRef.current.style.transform = `translate3d(0,0,${(-40 * (1 - p)).toFixed(
          2
        )}px) scale(${(1.05 - 0.05 * p).toFixed(4)})`
      }
      if (overlayRef.current) overlayRef.current.style.opacity = (0.2 + 0.3 * p).toFixed(3)
      if (vignetteRef.current) vignetteRef.current.style.opacity = (0.15 + 0.25 * p).toFixed(3)

      // The intro content clears out as the final message arrives.
      const fade = 1 - segment(p, TIMELINE.contentExit)

      // 0–10%: tagline
      const tTagline = segment(p, TIMELINE.tagline)
      paint(
        taglineRef.current,
        tTagline * fade,
        `translate3d(0,${((1 - tTagline) * 14).toFixed(2)}px,0)`
      )

      // 10–30%: masked, staggered headline lines
      lineEls.forEach((el, i) => {
        const from = TIMELINE.headline.start + i * TIMELINE.headline.stagger
        const to = Math.min(TIMELINE.headline.end, from + 0.14)
        const t = segment(p, [from, to])
        el.style.opacity = t.toFixed(3)
        el.style.transform = `translate3d(0,${((1 - t) * 108).toFixed(2)}%,0)`
      })

      // Orange underline draws itself.
      if (underline) {
        underline.style.strokeDashoffset = `${(underlineLength * (1 - segment(p, TIMELINE.underline))).toFixed(2)}`
      }

      // Headline block: parallax follow-through and exit rotation.
      const tExit = segment(p, TIMELINE.headlineExit)
      if (headlineRef.current) {
        headlineRef.current.style.opacity = (1 - tExit).toFixed(3)
        headlineRef.current.style.transform = `translate3d(0,${(-30 * p - 90 * tExit).toFixed(
          2
        )}px,60px) rotateX(${(-14 * tExit).toFixed(2)}deg)`
      }

      const tSub = segment(p, TIMELINE.subtext)
      paint(
        subtextRef.current,
        tSub * fade,
        `translate3d(0,${((1 - tSub) * 18 - 20 * p).toFixed(2)}px,40px)`
      )

      const tCta = segment(p, TIMELINE.cta)
      if (ctaRef.current) {
        ctaRef.current.style.opacity = (tCta * fade).toFixed(3)
        ctaRef.current.style.transform = `translate3d(0,${((1 - tCta) * 16 - 14 * p).toFixed(
          2
        )}px,30px) scale(${(0.85 + 0.15 * tCta).toFixed(3)})`
      }

      const tBar = segment(p, TIMELINE.bottomBar)
      paint(bottomBarRef.current, tBar * fade, `translate3d(0,${((1 - tBar) * 20).toFixed(2)}px,0)`)

      // 60–85%: script line crosses over to the full phrase.
      const tSwap = segment(p, TIMELINE.scriptSwap)
      paint(scriptShortRef.current, (1 - tSwap) * fade, `translate3d(0,${(-12 * tSwap).toFixed(2)}px,0)`)
      paint(scriptLongRef.current, tSwap * fade, `translate3d(0,${((1 - tSwap) * 12).toFixed(2)}px,0)`)

      // 85–100%: final message and CTA.
      const tFinal = segment(p, TIMELINE.final)
      if (finalRef.current) {
        finalRef.current.style.opacity = tFinal.toFixed(3)
        finalRef.current.style.transform = `translate3d(0,${((1 - tFinal) * 24).toFixed(2)}px,0)`
        finalRef.current.style.pointerEvents = tFinal > 0.5 ? 'auto' : 'none'
      }

      setCounters(p)
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${clamp01(p).toFixed(4)})`
      }
    }

    // Static, settled composition: reduced motion or a video that never loads.
    const settle = () => {
      paint(taglineRef.current, 1)
      lineEls.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'translate3d(0,0,0)'
      })
      if (underline) underline.style.strokeDashoffset = '0'
      if (headlineRef.current) {
        headlineRef.current.style.opacity = '1'
        headlineRef.current.style.transform = 'none'
      }
      if (videoLayerRef.current) videoLayerRef.current.style.transform = 'none'
      if (overlayRef.current) overlayRef.current.style.opacity = '0.3'
      if (vignetteRef.current) vignetteRef.current.style.opacity = '0.2'
      paint(subtextRef.current, 1, 'none')
      paint(ctaRef.current, 1, 'none')
      paint(bottomBarRef.current, 1, 'none')
      paint(scriptShortRef.current, 1, 'none')
      paint(scriptLongRef.current, 0, 'none')
      paint(finalRef.current, 0, 'none')
      if (progressRef.current) progressRef.current.style.transform = 'scaleX(1)'
      setCounters(0.999)
    }

    if (failed) {
      // Show first frame as fallback
      drawFrame(0)
      settle()
      return
    }
    if (reduced) {
      // Show last frame for reduced-motion
      drawFrame(1)
      settle()
      return
    }
    if (!ready) return

    /* Smooth scrolling. */
    // `anchors` keeps the site's in-page links working while Lenis drives the scroll;
    // the offset mirrors the 6rem `scroll-margin-top` the fixed navbar relies on.
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      anchors: { offset: -96 },
    })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const driveLenis = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(driveLenis)
    gsap.ticker.lagSmoothing(0)

    let targetProgress = 0
    let eased = 0
    let tiltX = 0
    let tiltY = 0
    let tiltTargetX = 0
    let tiltTargetY = 0

    // Set up canvas and keep it sized correctly
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        targetProgress = self.progress
      },
      onRefresh: (self) => {
        targetProgress = self.progress
      },
    })

    let rafId = null
    const frame = () => {
      rafId = requestAnimationFrame(frame)

      const delta = targetProgress - eased
      if (Math.abs(delta) > 0.0002) {
        eased += delta * LERP
      } else {
        eased = targetProgress
      }
      apply(eased)
      drawFrame(eased)

      tiltX += (tiltTargetX - tiltX) * TILT_LERP
      tiltY += (tiltTargetY - tiltY) * TILT_LERP
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${(-tiltY).toFixed(2)}deg) rotateY(${tiltX.toFixed(
          2
        )}deg)`
      }
    }

    const start = () => {
      if (rafId == null) rafId = requestAnimationFrame(frame)
    }
    const stop = () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }
    start()

    // Stop the loop entirely while the hero is off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          eased = targetProgress
          start()
        } else {
          stop()
        }
      },
      { threshold: 0 }
    )
    if (wrapperRef.current) io.observe(wrapperRef.current)

    // Desktop-only pointer tilt (max 3°).
    const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const onPointerMove = (event) => {
      tiltTargetX = ((event.clientX / window.innerWidth) * 2 - 1) * TILT_MAX_DEG
      tiltTargetY = ((event.clientY / window.innerHeight) * 2 - 1) * TILT_MAX_DEG
    }
    if (canTilt) window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      stop()
      io.disconnect()
      if (canTilt) window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', resizeCanvas)
      trigger.kill()
      gsap.ticker.remove(driveLenis)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
      lenisRef.current = null
      ctxRef.current = null
    }
  }, [ready, failed, reduced])

  const scrollToProgress = (p) => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const top = wrapper.offsetTop + p * Math.max(0, wrapper.offsetHeight - window.innerHeight)
    if (lenisRef.current) lenisRef.current.scrollTo(top)
    else window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={wrapperRef}
      className="relative bg-ink"
      style={{ height: reduced || failed ? '100vh' : `${SCROLL_HEIGHT_VH}vh` }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-ink"
        style={{ perspective: '1200px' }}
      >
        {/* Backdrop frame sequence */}
        <div
          ref={videoLayerRef}
          className="absolute inset-0"
          style={{ transform: 'translate3d(0,0,-80px) scale(1.15)', willChange: 'transform' }}
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            style={{ display: 'block', objectFit: 'cover', willChange: 'transform' }}
          />
        </div>

        {/* Dark gradient + vignette, deepening with scroll */}
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent"
          style={{ willChange: 'opacity' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/40" />
        <div
          ref={vignetteRef}
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, transparent 60%, rgba(15, 26, 23, 0.4) 100%)',
            willChange: 'opacity',
          }}
        />

        {/* Depth layers */}
        <div
          ref={tiltRef}
          className="relative z-10 flex h-full flex-col justify-between"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          <div
            className="container-x flex flex-1 items-center pb-10 pt-32"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="lg:col-span-7" style={{ transformStyle: 'preserve-3d' }}>
                <p
                  ref={taglineRef}
                  className="eyebrow text-cream/60"
                  style={{ opacity: 0, willChange: 'transform, opacity' }}
                >
                  More Than Spaces
                </p>

                <h1
                  ref={headlineRef}
                  className="mt-7 font-serif text-[3.5rem] leading-[1.02] text-cream sm:text-6xl lg:text-[5.25rem]"
                  style={{ opacity: 0, willChange: 'transform, opacity' }}
                >
                  {['Homes', 'for a brighter'].map((line, i) => (
                    <span key={line} className="block overflow-hidden py-[0.02em]">
                      <span
                        ref={(el) => {
                          lineRefs.current[i] = el
                        }}
                        className="block"
                        style={{ willChange: 'transform' }}
                      >
                        {line}
                      </span>
                    </span>
                  ))}
                  <span className="block overflow-hidden pb-3 pt-[0.02em]">
                    <span
                      ref={(el) => {
                        lineRefs.current[2] = el
                      }}
                      className="relative inline-block"
                      style={{ willChange: 'transform' }}
                    >
                      tomorrow
                      <BrushUnderline pathRef={underlineRef} />
                    </span>
                  </span>
                </h1>

                <p
                  ref={subtextRef}
                  className="mt-9 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg"
                  style={{ opacity: 0, willChange: 'transform, opacity' }}
                >
                  Thoughtfully designed living spaces that bring comfort, convenience and a better
                  tomorrow.
                </p>

                <div
                  ref={ctaRef}
                  className="mt-11 flex items-center gap-6"
                  style={{ opacity: 0, willChange: 'transform, opacity' }}
                >
                  <a
                    href="#properties"
                    aria-label="Explore properties"
                    className="group grid h-20 w-20 shrink-0 place-items-center rounded-full bg-cream text-ink transition duration-300 ease-out hover:bg-gold"
                  >
                    <ArrowRightIcon
                      size={24}
                      className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                    />
                  </a>
                  <a
                    href="#properties"
                    className="group inline-flex items-center gap-3 text-sm font-medium tracking-wide text-cream"
                  >
                    Explore Properties
                    <span className="h-px w-8 bg-cream/50 transition-all duration-300 ease-out group-hover:w-14 group-hover:bg-cream" />
                  </a>
                </div>
              </div>

              <div className="relative hidden lg:col-span-5 lg:block">
                <div className="absolute right-4 top-6 rotate-[-8deg] text-right">
                  <span
                    ref={scriptShortRef}
                    className="relative inline-block font-script text-4xl text-gold-soft"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {SCRIPT_SHORT}
                    <ScriptSwoosh />
                  </span>
                  <span
                    ref={scriptLongRef}
                    className="absolute right-0 top-0 inline-block whitespace-nowrap font-script text-4xl text-gold-soft"
                    style={{ opacity: 0, willChange: 'transform, opacity' }}
                  >
                    {SCRIPT_LONG}
                    <ScriptSwoosh />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final message */}
        <div
          ref={finalRef}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 text-center"
          style={{ opacity: 0, willChange: 'transform, opacity' }}
        >
          <div>
            <p className="eyebrow text-cream/60">{FINAL_EYEBROW}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
              {FINAL_TITLE}
            </h2>
            <a
              href="#contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition duration-300 hover:bg-gold"
            >
              Get in Touch
              <ArrowRightIcon size={16} />
            </a>
          </div>
        </div>

        {/* Minimal loading state until the video can be scrubbed */}
        {!ready && !failed && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <span className="animate-pulse text-[11px] uppercase tracking-[0.3em] text-cream/50">
              Loading
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
