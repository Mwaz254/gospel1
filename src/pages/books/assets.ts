/**
 * Centralized assets for the Books landing page.
 * All book covers, logos, and illustrations can be swapped here.
 * Book images support transparent PNGs with subtle shadows and glow.
 */

export interface BookCover {
  id: string;
  title: string;
  subtitle: string;
  age: 'Kids' | 'Teen' | 'Adult';
  accent: string; // hex
  cover: string;  // image URL (transparent PNG recommended)
}

export const heroBooks: BookCover[] = [
  {
    id: 'kids',
    title: 'Kids',
    subtitle: 'Ages 6–12',
    age: 'Kids',
    accent: '#F59E0B',
    cover: 'https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'teen',
    title: 'Teen',
    subtitle: 'Ages 13–18',
    age: 'Teen',
    accent: '#3B82F6',
    cover: 'https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'adult',
    title: 'Adult',
    subtitle: 'Ages 19+',
    age: 'Adult',
    accent: '#D4AF37',
    cover: 'https://images.pexels.com/photos/1111319/pexels-photo-1111319.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export interface Collection {
  id: string;
  volume: string;
  title: string;
  scripture: string;
  days: number;
  description: string;
  cover: string;
}

export const collections: Collection[] = [
  {
    id: 'vol-one',
    volume: 'Volume One',
    title: 'He Was Always the Answer',
    scripture: 'Meeting Jesus throughout Scripture',
    days: 120,
    description: 'A 120-day journey tracing the promise of a Saviour from Genesis to Revelation, revealing Christ on every page.',
    cover: 'https://images.pexels.com/photos/235554/pexels-photo-235554.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'torah-1',
    volume: 'Torah Volume One',
    title: 'In the Beginning, He Was There',
    scripture: 'Genesis & Exodus',
    days: 100,
    description: 'Walk through the foundations of Scripture and see the Lamb slain before the foundation of the world.',
    cover: 'https://images.pexels.com/photos/261726/pexels-photo-261726.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'torah-2',
    volume: 'Torah Volume Two',
    title: 'Every Offering Pointed to Him',
    scripture: 'Leviticus & Numbers',
    days: 67,
    description: 'Discover how every sacrifice, feast, and tent peg in the wilderness pointed to the coming Saviour.',
    cover: 'https://images.pexels.com/photos/3014852/pexels-photo-3014852.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'psalms',
    volume: 'Psalms',
    title: 'He Sang About Himself',
    scripture: 'The Songbook of the King',
    days: 82,
    description: 'Hear the voice of the Shepherd-King in every psalm, from the cross-shaped cries of David to the praises of Zion.',
    cover: 'https://images.pexels.com/photos/415571/pexels-photo-415571.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'nt',
    volume: 'New Testament',
    title: 'Everywhere I Look, It\'s Him',
    scripture: 'The Gospels & Beyond',
    days: 120,
    description: 'See how the Old Testament promises burst into living colour the moment the Word becomes flesh.',
    cover: 'https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'deut',
    volume: 'Deuteronomy',
    title: 'He Spoke Before He Came',
    scripture: 'The Prophet Like Moses',
    days: 120,
    description: 'Listen to the sermons of Moses and hear the heartbeat of the Prophet who would one day stand on the mountain.',
    cover: 'https://images.pexels.com/photos/2383053/pexels-photo-2383053.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export interface AgeCard {
  id: string;
  age: string;
  range: string;
  features: string[];
  cover: string;
}

export const ageCards: AgeCard[] = [
  {
    id: 'kids-card',
    age: 'Kids',
    range: 'Age 6–12',
    features: ['Bright illustrations', 'Simple explanations', 'Fun activities', 'Family discussion'],
    cover: 'https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'teen-card',
    age: 'Teen',
    range: 'Age 13–18',
    features: ['Faith in today\'s world', 'Reflection', 'Questions', 'Life application'],
    cover: 'https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'adult-card',
    age: 'Adult',
    range: 'Age 19+',
    features: ['Rich theology', 'Prayer', 'Daily transformation', 'Church study'],
    cover: 'https://images.pexels.com/photos/1111319/pexels-photo-1111319.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export interface Feature {
  id: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    id: 'christ-centered',
    title: 'Christ-Centered',
    description: 'Every devotional reveals Jesus — from the first page of Genesis to the last amen of Revelation.',
  },
  {
    id: 'scripture-first',
    title: 'Scripture First',
    description: "God's Word explains God's Word. We let Scripture interpret Scripture, always.",
  },
  {
    id: 'beautiful-design',
    title: 'Beautiful Design',
    description: 'Premium artwork, a premium reading experience, and premium printing worthy of the message.',
  },
  {
    id: 'built-for-families',
    title: 'Built for Families',
    description: 'Parents, kids, teens, small groups, and churches — one journey, every generation.',
  },
];

export const timeline: string[] = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers',
  'Deuteronomy', 'Psalms', 'New Testament',
];

export const checklist: string[] = [
  'Daily devotional',
  'Prayer',
  'Reflection',
  'Scripture',
  'Christ Connection',
  'Family Friendly',
  'Deep Theology',
];

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  highlight?: boolean;
  formats: string[];
  stores: { label: string; href: string }[];
}

export const pricing: PricingTier[] = [
  {
    id: 'kids-price',
    name: 'Kids',
    price: 'From $14.99',
    formats: ['PDF', 'Print', 'Kindle'],
    stores: [
      { label: 'Amazon', href: '#' },
      { label: 'Barnes & Noble', href: '#' },
      { label: 'InHimDaily.org', href: '#' },
    ],
  },
  {
    id: 'teen-price',
    name: 'Teen',
    price: 'From $16.99',
    formats: ['PDF', 'Print', 'Kindle'],
    stores: [
      { label: 'Amazon', href: '#' },
      { label: 'Barnes & Noble', href: '#' },
      { label: 'InHimDaily.org', href: '#' },
    ],
  },
  {
    id: 'adult-price',
    name: 'Adult',
    price: 'From $19.99',
    formats: ['PDF', 'Print', 'Kindle'],
    stores: [
      { label: 'Amazon', href: '#' },
      { label: 'Barnes & Noble', href: '#' },
      { label: 'InHimDaily.org', href: '#' },
    ],
  },
  {
    id: 'family',
    name: 'Family Bundle',
    price: 'From $44.99',
    highlight: true,
    formats: ['PDF', 'Print', 'Kindle'],
    stores: [
      { label: 'Amazon', href: '#' },
      { label: 'Barnes & Noble', href: '#' },
      { label: 'InHimDaily.org', href: '#' },
    ],
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'The first devotional that helped our entire family study together.',
    author: 'The Garcia Family',
  },
  {
    id: 't2',
    quote: 'My teenagers actually look forward to reading.',
    author: 'Marcus T.',
  },
  {
    id: 't3',
    quote: 'Beautiful enough for a coffee table. Deep enough for Bible study.',
    author: 'Pastor Elena R.',
  },
  {
    id: 't4',
    quote: 'My kids ask for the next chapter before bedtime every single night.',
    author: 'The Okafor Family',
  },
  {
    id: 't5',
    quote: 'I have never seen my teens so engaged with Scripture. It is a gift.',
    author: 'Daniel & Sofia M.',
  },
];
