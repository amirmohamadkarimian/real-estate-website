// Thin line icon set (1.5px stroke) — no icon dependency, all inline SVG.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ size = 20, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...base}
      {...rest}
    >
      {children}
    </svg>
  )
}

export function HouseIcon({ size = 26, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
    </Svg>
  )
}

export function SearchIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </Svg>
  )
}

export function ArrowRightIcon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path d="M5 12h13" />
      <path d="M12.5 6.5 18 12l-5.5 5.5" />
    </Svg>
  )
}

export function ArrowLeftIcon({ size = 18, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path d="M19 12H6" />
      <path d="M11.5 6.5 6 12l5.5 5.5" />
    </Svg>
  )
}

export function MapPinIcon({ size = 16, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.3" />
    </Svg>
  )
}

export function BedIcon({ size = 17, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path d="M3 18v-7h13a4 4 0 0 1 4 4v3" />
      <path d="M3 18h18" />
      <path d="M3 11V7" />
      <path d="M6.5 8.5h3.5" />
    </Svg>
  )
}

export function BathIcon({ size = 17, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 12h16v2.5A3.5 3.5 0 0 1 16.5 18h-9A3.5 3.5 0 0 1 4 14.5z" />
      <path d="M7 12V6.5A2.5 2.5 0 0 1 12 6" />
      <path d="M7 18l-1 2.5M17 18l1 2.5" />
    </Svg>
  )
}

export function RulerIcon({ size = 17, className = '' }) {
  return (
    <Svg size={size} className={className}>
      <rect x="3" y="8" width="18" height="8" rx="1.5" />
      <path d="M7.5 8v2.5M12 8v3.5M16.5 8v2.5" />
    </Svg>
  )
}

export function PlayIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M9 6.5v11l9-5.5z" fill="currentColor" />
    </svg>
  )
}

export function CompassIcon(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.2l-1.6 4.4-4.4 1.6 1.6-4.4z" />
    </Svg>
  )
}

export function LayoutIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4" width="17" height="16" rx="1.5" />
      <path d="M3.5 10h17" />
      <path d="M10 10v10" />
    </Svg>
  )
}

export function ShieldIcon(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 19 6v6c0 4.3-4.3 7.6-7 8.5-2.7-.9-7-4.2-7-8.5V6z" />
      <path d="M9.3 12.2l1.9 1.9 3.6-3.9" />
    </Svg>
  )
}

export function SupportIcon(props) {
  return (
    <Svg {...props}>
      <path d="M5 12a7 7 0 0 1 14 0" />
      <rect x="3" y="12" width="3.5" height="5" rx="1.5" />
      <rect x="17.5" y="12" width="3.5" height="5" rx="1.5" />
      <path d="M19 17v.5a3 3 0 0 1-3 3h-2.5" />
    </Svg>
  )
}

export function MenuIcon(props) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  )
}

export function CloseIcon(props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  )
}

export function InstagramIcon(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function FacebookIcon(props) {
  return (
    <Svg {...props}>
      <path d="M11.5 20V7.5a3.5 3.5 0 0 1 3.5-3.5h1" />
      <path d="M8 11.5h8" />
    </Svg>
  )
}

export function LinkedInIcon(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 10.5V16" />
      <circle cx="8" cy="7.9" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.8 16v-3.1a2 2 0 0 1 4 0V16" />
    </Svg>
  )
}

export function YouTubeIcon(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="6" width="18" height="12" rx="3.5" />
      <path d="M11 9.8v4.4l3.8-2.2z" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function QuoteMarkIcon({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M9.5 6C6.9 7.4 5.5 9.7 5.5 12.6V18h5v-5.6H8.2c0-1.9.7-3.3 2.1-4.2zM18.5 6c-2.6 1.4-4 3.7-4 6.6V18h5v-5.6h-2.3c0-1.9.7-3.3 2.1-4.2z"
        fill="currentColor"
      />
    </svg>
  )
}
