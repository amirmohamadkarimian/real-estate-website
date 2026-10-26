import {
  HouseIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  YouTubeIcon,
} from './Icons.jsx'
import { navLinks } from '../data/content.js'

const socials = [
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/' },
  { label: 'Facebook', Icon: FacebookIcon, href: 'https://www.facebook.com/' },
  { label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/' },
  { label: 'YouTube', Icon: YouTubeIcon, href: 'https://www.youtube.com/' },
]

const legal = ['Privacy Policy', 'Terms', 'Sitemap']

export default function Footer() {
  return (
    <footer className="bg-ink pb-8 pt-16 text-cream">
      <div className="container-x">
        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:justify-between lg:text-left">
          <a href="#home" className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/30">
              <HouseIcon size={24} />
            </span>
            <span className="text-left leading-none">
              <span className="block font-serif text-xl tracking-[0.18em]">AURELIA</span>
              <span className="mt-1.5 block text-[9px] font-medium uppercase tracking-[0.24em] text-cream/50">
                Live a Better Tomorrow
              </span>
            </span>
          </a>

          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-cream/70 transition-colors duration-300 hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <ul className="flex items-center gap-3">
            {socials.map(({ label, Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 text-cream/80 transition duration-300 hover:border-cream hover:bg-cream hover:text-ink"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-cream/15 pt-6 text-xs text-cream/50 sm:flex-row sm:justify-between">
          <p>© 2025 Aurelia. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            {legal.map((item) => (
              <li key={item}>
                <a href="#home" className="transition-colors duration-300 hover:text-cream">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
