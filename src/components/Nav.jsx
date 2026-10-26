import { useEffect, useState } from 'react'
import { HouseIcon, SearchIcon, ArrowRightIcon, MenuIcon, CloseIcon } from './Icons.jsx'
import { navLinks } from '../data/content.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Only switch surface once the hero has scrolled up behind the navbar,
    // i.e. when the next section reaches the bottom edge of the navbar (h-20).
    const onScroll = () => {
      const hero = document.getElementById('home')
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= 80 : window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // The navbar surface matches the landing page: transparent over the dark hero,
  // cream (the page background) once scrolled onto the light sections.
  const shell = scrolled
    ? 'border-b border-ink/10 bg-cream'
    : 'border-b border-transparent bg-transparent'
  const tone = (onCream, onHero) => (scrolled ? onCream : onHero)

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out ${shell}`}>
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <a href="#home" className={`flex items-center gap-3 ${tone('text-ink', 'text-cream')}`}>
          <span
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${tone(
              'border-ink/25',
              'border-cream/30'
            )}`}
          >
            <HouseIcon size={24} />
          </span>
          <span className="leading-none">
            <span className="block font-serif text-xl tracking-[0.18em]">AURELIA</span>
            <span
              className={`mt-1.5 block text-[9px] font-medium uppercase tracking-[0.24em] ${tone(
                'text-ink/55',
                'text-cream/55'
              )}`}
            >
              Live a Better Tomorrow
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={i === 0 ? 'page' : undefined}
              className={`relative text-sm transition-colors duration-300 ${
                i === 0
                  ? tone('text-ink', 'text-cream')
                  : `${tone('text-ink/70', 'text-cream/70')} ${tone(
                      'hover:text-ink',
                      'hover:text-cream'
                    )}`
              }`}
            >
              {link.label}
              {i === 0 && (
                <span
                  className={`absolute -bottom-2 left-0 h-px w-full ${tone(
                    'bg-ink/70',
                    'bg-cream/80'
                  )}`}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            aria-label="Search properties"
            className={`grid h-10 w-10 place-items-center rounded-full border transition duration-300 ${tone(
              'border-ink/20 text-ink/70 hover:border-ink/50 hover:text-ink',
              'border-cream/25 text-cream/80 hover:border-cream/60 hover:text-cream'
            )}`}
          >
            <SearchIcon size={18} />
          </button>
          <a
            href="#contact"
            className={`group inline-flex items-center gap-2 rounded-full border border-transparent px-5 py-2.5 text-sm font-medium transition duration-300 ${tone(
              'bg-ink text-cream hover:bg-ink/90',
              'bg-cream text-ink hover:border-cream/30 hover:bg-ink hover:text-cream'
            )}`}
          >
            Get in Touch
            <ArrowRightIcon
              size={16}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </a>
        </div>

        <button
          type="button"
          className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${tone(
            'border-ink/20 text-ink',
            'border-cream/25 text-cream'
          )}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className={`border-t px-6 py-6 backdrop-blur-md lg:hidden ${tone(
            'border-ink/10 bg-cream/95',
            'border-cream/10 bg-ink/95'
          )}`}
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-md px-3 py-3 text-base transition ${tone(
                  'text-ink/80 hover:bg-ink/5 hover:text-ink',
                  'text-cream/80 hover:bg-cream/5 hover:text-cream'
                )}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium ${tone(
              'bg-ink text-cream',
              'bg-cream text-ink'
            )}`}
          >
            Get in Touch
            <ArrowRightIcon size={16} />
          </a>
        </div>
      )}
    </header>
  )
}
