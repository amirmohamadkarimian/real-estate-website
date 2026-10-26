import { MapPinIcon, BedIcon, BathIcon, RulerIcon } from './Icons.jsx'

export default function PropertyCard({ property }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-ink/10 bg-white shadow-soft transition duration-500 ease-out hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium tracking-wide text-ink">
          {property.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl leading-snug text-ink">{property.name}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-muted">
          <MapPinIcon size={15} className="shrink-0" />
          {property.location}
        </p>

        <div className="mt-auto pt-5">
          <div className="h-px w-full bg-ink/10" />
          <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink/80">
            <li className="flex items-center gap-2">
              <BedIcon className="shrink-0 text-ink/60" />
              {property.beds} Beds
            </li>
            <li className="flex items-center gap-2">
              <BathIcon className="shrink-0 text-ink/60" />
              {property.baths} Baths
            </li>
            <li className="flex items-center gap-2">
              <RulerIcon className="shrink-0 text-ink/60" />
              {property.area} Sq.Ft
            </li>
          </ul>
        </div>
      </div>
    </article>
  )
}
