import Reveal from './Reveal.jsx'
import PropertyCard from './PropertyCard.jsx'
import { ArrowRightIcon } from './Icons.jsx'
import { properties } from '../data/content.js'

export default function FeaturedProperties() {
  return (
    <section id="properties" className="bg-cream py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow">Featured Properties</p>
            <div className="mt-4 flex items-center gap-5">
              <h2 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
                Spaces that inspire
              </h2>
              <a
                href="#properties"
                aria-label="Browse all featured properties"
                className="group hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/25 text-ink transition duration-300 ease-out hover:bg-ink hover:text-cream sm:grid"
              >
                <ArrowRightIcon
                  size={18}
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:max-w-sm">
            <p className="text-sm leading-relaxed text-muted">
              From urban apartments to serene villas, explore handpicked properties that match your
              lifestyle.
            </p>
            <a
              href="#properties"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink"
            >
              View All Properties
              <ArrowRightIcon
                size={16}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        {/* Mobile: horizontal swipe carousel. From md up: 3-column grid. */}
        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {properties.map((property, i) => (
            <Reveal
              key={property.name}
              delay={i * 100}
              className="w-[82%] shrink-0 snap-start md:w-auto"
            >
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
