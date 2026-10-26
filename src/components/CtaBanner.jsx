import Reveal from './Reveal.jsx'
import { ArrowRightIcon } from './Icons.jsx'
import { ctaImage } from '../data/content.js'

export default function CtaBanner() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink">
      <img
        src={ctaImage.src}
        alt={ctaImage.alt}
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/25" />

      <div className="container-x flex min-h-[400px] flex-col justify-center gap-10 py-16 sm:flex-row sm:items-center sm:justify-between">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-cream/60">It's More Than a Home</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-cream sm:text-5xl">
            It's a brighter you
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream/70">
            Experience spaces designed for the moments that matter.
          </p>
        </Reveal>

        <div className="flex items-center gap-5 border-t border-cream/15 pt-8 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
          <a
            href="#properties"
            aria-label="Find your home"
            className="group grid h-20 w-20 shrink-0 place-items-center rounded-full bg-cream text-ink transition duration-300 ease-out hover:bg-gold"
          >
            <ArrowRightIcon
              size={24}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </a>
          <span className="text-sm text-cream/80">Find Your Home</span>
        </div>
      </div>
    </section>
  )
}
