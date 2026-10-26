import { useState } from 'react'
import Reveal from './Reveal.jsx'
import CountUp from './CountUp.jsx'
import VideoModal from './VideoModal.jsx'
import { ArrowRightIcon, PlayIcon } from './Icons.jsx'
import { aboutImage } from '../data/content.js'

const stats = [
  { value: 10, suffix: '+', label: 'Years of Trust' },
  { value: 25, suffix: '+', label: 'Projects Delivered' },
  { value: 5000, suffix: '+', label: 'Happy Families' },
]

export default function AboutSplit() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section id="about" className="relative bg-cream -mt-6 pb-16 sm:-mt-8 sm:pb-20 lg:-mt-12 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <img
            src={aboutImage.src}
            alt={aboutImage.alt}
            loading="lazy"
            className="h-80 w-full object-cover sm:h-[26rem] lg:h-full lg:min-h-[34rem]"
          />
          <div className="absolute inset-0 bg-ink/25" />
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label="Watch our story"
            className="group absolute inset-0 grid place-items-center"
          >
            <span className="flex flex-col items-center gap-4">
              <span className="grid h-20 w-20 place-items-center rounded-full border border-cream/40 bg-ink/40 text-cream backdrop-blur transition duration-300 ease-out group-hover:bg-cream group-hover:text-ink">
                <PlayIcon size={22} />
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-cream">
                Watch Our Story
              </span>
            </span>
          </button>
        </div>

        <div className="lg:col-span-4">
          <Reveal className="px-6 py-16 sm:px-10 lg:py-24 lg:pl-14 lg:pr-10">
            <p className="eyebrow">About Aurelia</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Building better lives
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Every Aurelia home starts with how people actually live. We pair considered
              architecture with warm, lasting materials — so each space feels calm today and holds
              its value tomorrow.
            </p>
            <a
              href="#services"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition duration-300 ease-out hover:bg-ink/85"
            >
              Our Story
              <ArrowRightIcon
                size={16}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        <aside className="border-t border-ink/10 lg:col-span-3 lg:border-l lg:border-t-0">
          <div className="grid grid-cols-1 divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-8 sm:px-8 lg:py-11 lg:pl-10 lg:pr-6">
                <p className="font-serif text-3xl text-ink sm:text-4xl">
                  <CountUp value={stat.value} />
                  {stat.suffix}
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} poster={aboutImage.src} />
    </section>
  )
}
