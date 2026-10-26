import Reveal from './Reveal.jsx'
import { MapPinIcon, LayoutIcon, ShieldIcon, SupportIcon } from './Icons.jsx'

const features = [
  { Icon: MapPinIcon, title: 'Prime Locations', subtitle: 'Close to what matters' },
  { Icon: LayoutIcon, title: 'Modern Design', subtitle: 'For modern living' },
  { Icon: ShieldIcon, title: 'Secure Investment', subtitle: 'Built for your future' },
  { Icon: SupportIcon, title: 'End-to-End Support', subtitle: "We're with you always" },
]

export default function FeatureStrip() {
  return (
    <section id="services" className="bg-cream">
      <div className="container-x">
        <div className="grid grid-cols-2 divide-x divide-y divide-ink/10 border border-ink/10 lg:grid-cols-4 lg:divide-y-0 lg:border-x-0">
          {features.map(({ Icon, title, subtitle }, i) => (
            <Reveal key={title} delay={i * 80} className="px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="mt-0.5 shrink-0 text-ink/70">
                  <Icon size={24} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{title}</p>
                  <p className="mt-1 text-[13px] text-muted sm:text-sm">{subtitle}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
