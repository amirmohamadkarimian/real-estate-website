const img = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const heroSlides = [
  {
    src: img('photo-1613977257363-707ba9348227', 1920),
    alt: 'Contemporary villa at dusk with warm interior lighting',
  },
  {
    src: img('photo-1600047509807-ba8f99d2cdde', 1920),
    alt: 'Family home glowing with warm light at twilight',
  },
  {
    src: img('photo-1600596542815-ffad4c1539a9', 1920),
    alt: 'Modern residence with a pool lit at golden hour',
  },
]

export const properties = [
  {
    name: 'Skyline Residences',
    location: 'Kochi, Kerala',
    image: img('photo-1460317442991-0ec209397118', 900),
    alt: 'City skyline of residential towers at dusk',
    badge: 'Ready to Move',
    beds: 3,
    baths: 3,
    area: '1,850',
  },
  {
    name: 'The Green Villas',
    location: 'Calicut, Kerala',
    image: img('photo-1580587771525-78b9dba3b914', 900),
    alt: 'Modern villa facade framed by greenery',
    badge: 'Premium',
    beds: 4,
    baths: 4,
    area: '2,600',
  },
  {
    name: 'Aurelia Heights',
    location: 'Trivandrum, Kerala',
    image: img('photo-1512917774080-9991f1c4c750', 900),
    alt: 'Warmly lit contemporary house in the evening',
    badge: 'New Launch',
    beds: 3,
    baths: 2,
    area: '2,100',
  },
]

export const aboutImage = {
  src: img('photo-1522708323590-d24dbb6b0267', 1400),
  alt: 'Warmly lit living room interior with soft daylight',
}

export const ctaImage = {
  src: img('photo-1449824913935-59a10b8d2000', 1920),
  alt: 'Dusk cityscape seen from a balcony overlooking the skyline',
}

export const avatars = [
  {
    src: img('photo-1494790108377-be9c29b29330', 160),
    alt: 'Homeowner smiling',
  },
  {
    src: img('photo-1500648767791-00dcc994a43e', 160),
    alt: 'Homeowner portrait',
  },
  {
    src: img('photo-1534528741775-53994a69daeb', 160),
    alt: 'Resident portrait',
  },
  {
    src: img('photo-1507003211169-0a1dd7228f2d', 160),
    alt: 'Resident portrait',
  },
]

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Properties', href: '#properties' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]
