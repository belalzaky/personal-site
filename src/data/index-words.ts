// The four words on the index. Each row opens onto its photos (cropped by Belal on 18 Nov,
// files in public/photos/index: -d is the 3:1 desktop crop, -p the 4:3 phone crop) and
// links to the page that word is about. Photos here are never reused on /about.

export interface Word {
  w: string;
  sub: string;
  href: string;
  go: string;
  photos: string[];
  meta: [string, string, string?][];
}

export const words: Word[] = [
  { w: 'Health', sub: 'lifting, pharmacology, liftkcl', href: '/about', go: 'about', photos: ['health-1', 'health-2', 'health-3'],
    meta: [['word', 'health'], ['training', 'most evenings, lifting'], ['society', 'liftkcl, coming soon'], ['work', 'king’s sport, front of house'], ['degree', 'msci pharmacology, king’s'], ['more', 'about', '/about']] },
  { w: 'Tech', sub: 'drug-safety data', href: '/projects', go: 'work', photos: ['tech-1', 'tech-2'],
    meta: [['word', 'tech'], ['field', 'drug-safety data'], ['projects', '9 data projects'], ['featured', 'causal safety, pv intake, adr reader'], ['methods', 'causal inference, nlp, sql'], ['more', 'work', '/projects']] },
  { w: 'Build', sub: 'mission control, notch', href: '/builds', go: 'builds', photos: ['build-1', 'build-2'],
    meta: [['word', 'build'], ['apps', 'mission control, notch'], ['runs on', 'my mac'], ['built in', 'electron, swift'], ['code', 'private'], ['more', 'builds', '/builds']] },
  { w: 'Lifestyle', sub: 'London | Dubai | Egypt', href: '/about', go: 'about', photos: ['lifestyle-1', 'lifestyle-4', 'lifestyle-2', 'lifestyle-3'],
    meta: [['word', 'lifestyle'], ['based', 'London | Dubai | Egypt'], ['shot on', 'iphone 17 pro'], ['instagram', '@belalzakyuk', 'https://instagram.com/belalzakyuk'], ['looking for', '2027/28 placement, pharma'], ['email', 'hello@belalzaky.uk', 'mailto:hello@belalzaky.uk']] },
];
