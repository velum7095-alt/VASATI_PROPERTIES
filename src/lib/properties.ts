import { db } from './db';

export interface PropertyItem {
  id: string;
  title: string;
  slug: string;
  kreraRegNo: string;
  developerName: string;
  locality: string;
  address: string;
  price: number;
  priceLabel: string;
  bhk: number;
  propertyType: string;
  purpose?: 'buy' | 'rent';
  areaSqft: number;
  baths: number;
  possession: string;
  status: string;
  featured: boolean;
  heroSlide: boolean;
  heroOfferText?: string | null;
  description: string;
  images: string[];
  videoUrl?: string | null;
  amenities: string[];
  latitude?: number | null;
  longitude?: number | null;
}

export const BANGALORE_LOCALITIES = [
  'All Localities',
  'Whitefield',
  'Sarjapur Road',
  'Electronic City',
  'Hebbal',
  'Yelahanka',
  'HSR Layout',
  'Koramangala',
  'Devanahalli',
] as const;

export const INITIAL_BANGALORE_PROPERTIES: PropertyItem[] = [
  {
    id: 'prop-1',
    title: 'Sobha Neopolis — Grecian Architecture Homes',
    slug: 'sobha-neopolis-panathur-whitefield',
    kreraRegNo: 'PRM/KA/RERA/1251/446/PR/200923/006268',
    developerName: 'Sobha Limited',
    locality: 'Whitefield',
    address: 'Panathur Main Road, Off Marathahalli-ORR, Whitefield Corridor, Bangalore 560087',
    price: 185.0,
    priceLabel: '₹1.85 Cr',
    bhk: 3,
    propertyType: 'Apartment',
    areaSqft: 1611,
    baths: 3,
    possession: 'Under Construction (Dec 2027)',
    status: 'New Launch',
    featured: true,
    heroSlide: true,
    heroOfferText: 'Exclusive Launch Privilege · No Floor Rise on Tower 4',
    description: 'Santorini-themed luxury residences located in the high-growth Panathur-Whitefield tech corridor. Features 77,000 sq ft clubhouse, 3 Olympic-sized pools, and proximity to Bellandur ORR tech parks.',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    amenities: ['Grecian Club House', '3 Swimming Pools', 'Tennis Court', '24/7 Security', '100% Power Backup', 'EV Charging Bays'],
    latitude: 12.9348,
    longitude: 77.7012
  },
  {
    id: 'prop-2',
    title: 'Godrej Park Retreat — Chikka Kannalli',
    slug: 'godrej-park-retreat-sarjapur-road',
    kreraRegNo: 'PRM/KA/RERA/1251/308/PR/211221/004595',
    developerName: 'Godrej Properties',
    locality: 'Sarjapur Road',
    address: 'Carmelaram, Chikka Kannalli, Sarjapur Road, Bangalore 560035',
    price: 115.0,
    priceLabel: '₹1.15 Cr',
    bhk: 2,
    propertyType: 'Apartment',
    areaSqft: 1103,
    baths: 2,
    possession: 'Under Construction (Jun 2026)',
    status: 'New Launch',
    featured: true,
    heroSlide: true,
    heroOfferText: 'Zero Pre-EMI Offer with 10:90 Developer Plan',
    description: 'Set across 13 acres of natural landscape with over 50 lifestyle amenities, located minutes from Wipro Kodathi SEZ and RGA Tech Park on Sarjapur Road.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    amenities: ['28,000 sq ft Club', 'Reflexology Park', 'Squash Court', 'Co-working Pods', 'Gated Multi-tier Security'],
    latitude: 12.9081,
    longitude: 77.6975
  },
  {
    id: 'prop-3',
    title: 'Prestige Falcon City — Kanakapura Corridor',
    slug: 'prestige-falcon-city-kanakapura-road',
    kreraRegNo: 'PRM/KA/RERA/1251/310/PR/170915/000244',
    developerName: 'Prestige Group',
    locality: 'HSR Layout',
    address: 'Anjanadri Layout, Konanakunte, Kanakapura Road, Bangalore 560062',
    price: 195.0,
    priceLabel: '₹1.95 Cr',
    bhk: 3,
    propertyType: 'Apartment',
    areaSqft: 1823,
    baths: 3,
    possession: 'Ready to Move',
    status: 'Ready to Move',
    featured: true,
    heroSlide: true,
    heroOfferText: 'Instant Move-in · OC Received · Zero GST',
    description: 'Sprawling ready-to-move integrated high-rise development with metro connectivity right outside the entrance gates. Attached to Forum South Bangalore Mall.',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    amenities: ['Adjacent to Metro', 'Forum Mall Access', 'Huge Sports Complex', 'Olympic Pool', 'Aerobics Hall'],
    latitude: 12.8847,
    longitude: 77.5678
  },
  {
    id: 'prop-4',
    title: 'Total Environment In That Quiet Earth',
    slug: 'total-environment-in-that-quiet-earth-hennur',
    kreraRegNo: 'PRM/KA/RERA/1251/446/PR/180519/001749',
    developerName: 'Total Environment Building Systems',
    locality: 'Hebbal',
    address: 'Hennur Main Road, Off International Airport Road, Bangalore 560077',
    price: 340.0,
    priceLabel: '₹3.40 Cr',
    bhk: 4,
    propertyType: 'Villa',
    areaSqft: 2890,
    baths: 4,
    possession: 'Under Construction (Mar 2027)',
    status: 'New Launch',
    featured: true,
    heroSlide: false,
    heroOfferText: 'Customized Handcrafted Woodwork & Terrace Garden Included',
    description: 'Bespoke earth-sheltered luxury L30 duplex homes with private cantilevered gardens and natural exposed wire-cut brickwork on North Bangalore corridor.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: null,
    amenities: ['Private Terrace Gardens', 'Heated Indoor Pool', 'Organic Cafe', 'Bespoke Handcrafted Interiors', 'Micro-brewery Access'],
    latitude: 13.0658,
    longitude: 77.6432
  },
  {
    id: 'prop-5',
    title: 'Salarpuria Sattva Cadenza — Kudlu Gate',
    slug: 'salarpuria-sattva-cadenza-kudlu-gate',
    kreraRegNo: 'PRM/KA/RERA/1251/310/PR/170915/000282',
    developerName: 'Sattva Group',
    locality: 'Electronic City',
    address: 'Hosur Main Road, Kudlu Gate Junction, Electronic City Phase 1 Approach, Bangalore 560068',
    price: 135.0,
    priceLabel: '₹1.35 Cr',
    bhk: 2,
    propertyType: 'Apartment',
    areaSqft: 1311,
    baths: 2,
    possession: 'Ready to Move',
    status: 'Ready to Move',
    featured: false,
    heroSlide: false,
    heroOfferText: 'High Rental Yield Opportunity · 5 Mins to Silk Board',
    description: 'A contemporary residential condominium situated right on Hosur Road with immediate access to Electronic City flyover and upcoming Yellow Line metro interchange.',
    images: [
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: null,
    amenities: ['Infinity Sky Pool', 'Skate Park', 'Business Centre', 'Jacuzzi', '24/7 Monitored Gated Access'],
    latitude: 12.8912,
    longitude: 77.6415
  },
  {
    id: 'prop-6',
    title: 'Bhartiya City Nikoo Homes IV',
    slug: 'bhartiya-city-nikoo-homes-iv-thanisandra',
    kreraRegNo: 'PRM/KA/RERA/1251/472/PR/210208/003881',
    developerName: 'Bhartiya Urban',
    locality: 'Yelahanka',
    address: 'Thanisandra Main Road, Bhartiya City Integrated Township, Bangalore 560064',
    price: 92.0,
    priceLabel: '₹92 L',
    bhk: 2,
    propertyType: 'Apartment',
    areaSqft: 1080,
    baths: 2,
    possession: 'Under Construction (Nov 2026)',
    status: 'New Launch',
    featured: false,
    heroSlide: false,
    heroOfferText: '125-Acre Smart City Township with Chaman Bhartiya School',
    description: 'Thoughtfully designed Italian urban homes inside Bangalore’s largest integrated city township. Connected to BCIT tech park, retail high street, and central park.',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: null,
    amenities: ['Township Central Park', 'Performing Arts Centre', 'Attached Shopping Mall', 'Cycle Tracks', 'Smart City Security'],
    latitude: 13.0784,
    longitude: 77.6253
  },
  {
    id: 'prop-7',
    title: 'Assetz Marq 3.0 — Whitefield Tech Haven',
    slug: 'assetz-marq-whitefield',
    kreraRegNo: 'PRM/KA/RERA/1251/446/PR/171208/002090',
    developerName: 'Assetz Property Group',
    locality: 'Whitefield',
    address: 'Kannamangala, Whitefield-Hoskote Main Road, Bangalore 560067',
    price: 165.0,
    priceLabel: '₹1.65 Cr',
    bhk: 3,
    propertyType: 'Apartment',
    areaSqft: 1585,
    baths: 3,
    possession: 'Ready to Move',
    status: 'Resale',
    featured: false,
    heroSlide: false,
    heroOfferText: 'Verified Clear Title Resale · Premium High Floor Unit',
    description: 'Resale opportunity in a 22-acre park township with a 6-acre central green park. Close to ITPL, Kadugodi metro terminus, and international hospitals.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: null,
    amenities: ['6-Acre Green Park', '38,000 sq ft Club', 'Indoor Badminton Courts', 'Pet Park', 'Amphitheatre'],
    latitude: 13.0012,
    longitude: 77.7654
  },
  {
    id: 'prop-8',
    title: 'Ozone Urbana Aqua — Devanahalli Airport Corridor',
    slug: 'ozone-urbana-aqua-devanahalli',
    kreraRegNo: 'PRM/KA/RERA/1250/303/PR/170915/000212',
    developerName: 'Ozone Group',
    locality: 'Devanahalli',
    address: 'NH 44, Next to KIAL Trumpet Flyover, Devanahalli, Bangalore 562110',
    price: 88.0,
    priceLabel: '₹88 L',
    bhk: 2,
    propertyType: 'Apartment',
    areaSqft: 1150,
    baths: 2,
    possession: 'Ready to Move',
    status: 'Ready to Move',
    featured: false,
    heroSlide: false,
    heroOfferText: 'Adjacent to Aerospace SEZ & BIAL Airport Corridor',
    description: 'Integrated township dwelling situated 10 minutes from Kempegowda International Airport. Ideal for aerospace park professionals and high rental yield investors.',
    images: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: null,
    amenities: ['Senior Living Facilities', 'National Public School Inside', 'Olympic Pool', 'Hospital Healthcare Pod', 'Bowling Alley'],
    latitude: 13.2145,
    longitude: 77.7123
  },
  {
    id: 'prop-9',
    title: 'Prestige Golfshire — Ultra-Luxury Golf Villa',
    slug: 'prestige-golfshire-nandi-hills',
    kreraRegNo: 'PRM/KA/RERA/1250/303/PR/171014/000452',
    developerName: 'Prestige Group',
    locality: 'Hebbal',
    address: 'Nandi Hills Road, Off New Airport Highway, North Bangalore 562110',
    price: 650.0,
    priceLabel: '₹6.50 Cr',
    bhk: 4,
    propertyType: 'Villa',
    areaSqft: 5890,
    baths: 5,
    possession: 'Ready to Move',
    status: 'Ready to Move',
    featured: true,
    heroSlide: false,
    heroOfferText: 'Exclusive 18-Hole Championship Golf Course Living',
    description: 'Ultra-luxury independent golf villas nestled at the picturesque foothills of Nandi Hills with private swimming pools, landscaped private gardens, and concierge services.',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: null,
    amenities: ['18-Hole Golf Course', 'Private Pool', 'Luxury Spa & Wellness', 'Helipad Access', 'Falcon Greens Club'],
    latitude: 13.3702,
    longitude: 77.6836
  },
  {
    id: 'prop-10',
    title: 'Century Eden — RERA Approved Premium Villa Plots',
    slug: 'century-eden-yelahanka',
    kreraRegNo: 'PRM/KA/RERA/1250/303/PR/180222/001188',
    developerName: 'Century Real Estate',
    locality: 'Yelahanka',
    address: 'Doddaballapur Main Road, Near Yelahanka Air Force Station, Bangalore 560064',
    price: 78.0,
    priceLabel: '₹78 L',
    bhk: 1,
    propertyType: 'Plot',
    areaSqft: 1500,
    baths: 0,
    possession: 'Ready to Move',
    status: 'Ready to Move',
    featured: true,
    heroSlide: false,
    heroOfferText: 'Clear Title BDA/BIAAPA & RERA Approved Gated Enclave',
    description: 'High-appreciation residential villa plots in a 45-acre mature landscaped gated community with underground cabling, wide asphalted avenues, and grand clubhouse.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: null,
    amenities: ['Grand Clubhouse', 'Underground Utilities', 'Tennis & Badminton Courts', 'Landscaped Parks', '24/7 Security'],
    latitude: 13.1422,
    longitude: 77.5851
  },
  {
    id: 'prop-11',
    title: 'Prestige Great Acres — The Prestige City Villa Plots',
    slug: 'prestige-great-acres-sarjapur',
    kreraRegNo: 'PRM/KA/RERA/1251/308/PR/210824/004289',
    developerName: 'Prestige Group',
    locality: 'Sarjapur Road',
    address: 'Sarjapur-Marathahalli Main Road, Yamare, Bangalore 562125',
    price: 120.0,
    priceLabel: '₹1.20 Cr',
    bhk: 1,
    propertyType: 'Plot',
    purpose: 'buy',
    areaSqft: 2000,
    baths: 0,
    possession: 'Ready to Move',
    status: 'Ready to Move',
    featured: true,
    heroSlide: false,
    heroOfferText: 'Inside 180-Acre Mega Township · 50,000 sq ft Clubhouse',
    description: 'RERA-approved luxury plotted development within The Prestige City. Features wide asphalt roads, underground cabling, avenue plantations, and access to Forum Retail inside the township.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: null,
    amenities: ['Forum Retail Mall', '50,000 sq ft Club', 'Olympic Swimming Pool', 'Skate Park', 'Underground Cabling'],
    latitude: 12.8752,
    longitude: 77.7289
  },
  {
    id: 'prop-12',
    title: 'Brigade Gateway Residences — High-Floor Lake View',
    slug: 'brigade-gateway-residences-malleswaram',
    kreraRegNo: 'PRM/KA/RERA/1251/309/PR/170915/000108',
    developerName: 'Brigade Enterprises',
    locality: 'Hebbal',
    address: 'Dr Rajkumar Road, Rajajinagar-Malleswaram Corridor, Bangalore 560055',
    price: 0.65,
    priceLabel: '₹65,000 / month',
    bhk: 3,
    propertyType: 'Apartment',
    purpose: 'rent',
    areaSqft: 1850,
    baths: 3,
    possession: 'Ready to Move',
    status: 'Ready to Move',
    featured: true,
    heroSlide: false,
    heroOfferText: 'Fully Furnished · Direct World Trade Center & Orion Mall Access',
    description: 'Exclusive 3 BHK rental home with panoramic lake view, Italian modular kitchen, and centralized AC. Situated right next to Orion Mall, Columbia Asia Hospital, and Sandal Soap Factory Metro.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: null,
    amenities: ['Attached to Orion Mall', 'WTC Walking Distance', 'Swimming Pool', 'Gym & Squash', 'Metro Station Direct Link'],
    latitude: 13.0112,
    longitude: 77.5552
  },
  {
    id: 'prop-13',
    title: 'Prestige Silver Oak — Fully Furnished Luxury Villa for Rent',
    slug: 'prestige-silver-oak-villa-whitefield-rent',
    kreraRegNo: 'PRM/KA/RERA/1251/446/PR/171015/000219',
    developerName: 'Prestige Group',
    locality: 'Whitefield',
    address: 'ECC Road, Near ITPL, Whitefield, Bangalore 560066',
    price: 1.25,
    priceLabel: '₹1.25 Lakh / month',
    bhk: 4,
    propertyType: 'Villa',
    purpose: 'rent',
    areaSqft: 3400,
    baths: 4,
    possession: 'Ready to Move',
    status: 'Ready to Move',
    featured: true,
    heroSlide: false,
    heroOfferText: 'Independent Garden Villa · 5 Mins to ITPL Tech Corridor',
    description: 'Serene gated 4 BHK independent duplex villa with private landscaped backyard lawn, modular German kitchen, hardwood wardrobes, and clubhouse access.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: null,
    amenities: ['Private Garden', 'Clubhouse & Heated Pool', 'Tennis Court', 'High-speed Fiber', '24/7 Security Patrol'],
    latitude: 12.9782,
    longitude: 77.7412
  },
  {
    id: 'prop-14',
    title: 'EBD Embassy TechVillage — Grade-A Commercial Office Floor',
    slug: 'embassy-techvillage-commercial-office-bellandur',
    kreraRegNo: 'PRM/KA/RERA/1251/103/PR/181120/002155',
    developerName: 'Embassy Office Parks',
    locality: 'Sarjapur Road',
    address: 'Outer Ring Road (ORR), Devarabeesanahalli, Bellandur, Bangalore 560103',
    price: 850.0,
    priceLabel: '₹8.50 Cr',
    bhk: 0,
    propertyType: 'Commercial',
    purpose: 'buy',
    areaSqft: 6500,
    baths: 4,
    possession: 'Ready to Move',
    status: 'Ready to Move',
    featured: true,
    heroSlide: false,
    heroOfferText: 'Grade-A IT Park Space · Pre-Leased 8.2% Rental Yield',
    description: 'Premium corporate office floor with dedicated reception, 120 work desks, 4 conference suites, and executive cabins inside Bangalore’s flagship Outer Ring Road tech ecosystem.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: null,
    amenities: ['100% DG Power Backup', 'LEED Platinum Certified', 'Multi-level Car Parking', 'High-Speed Elevators', 'Food Court & Cafes'],
    latitude: 12.9288,
    longitude: 77.6897
  },
  {
    id: 'prop-15',
    title: 'Indiranagar 100ft Road Prime Retail & Commercial Space',
    slug: 'indiranagar-100ft-road-commercial-retail',
    kreraRegNo: 'PRM/KA/RERA/1251/310/PR/190412/002521',
    developerName: 'Bangalore Commercial Realty',
    locality: 'Koramangala',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bangalore 560038',
    price: 2.20,
    priceLabel: '₹2.20 Lakh / month',
    bhk: 0,
    propertyType: 'Commercial',
    purpose: 'rent',
    areaSqft: 2800,
    baths: 2,
    possession: 'Immediate',
    status: 'Ready to Move',
    featured: true,
    heroSlide: false,
    heroOfferText: 'High Footfall High Street Frontage · 40ft Glass Facade',
    description: 'High visibility retail showroom and commercial boutique space on Bangalore’s most prestigious retail boulevard. Ideal for luxury retail brands, flagship studios, or tech innovation hubs.',
    images: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: null,
    amenities: ['Full Glass Facade', 'Heavy Footfall Boulevard', '3-Phase High Load Power', 'Dedicated Customer Parking', 'Valet Area'],
    latitude: 12.9719,
    longitude: 77.6412
  }
];

let dbUnavailableUntil = 0;

export async function getAllProperties(): Promise<PropertyItem[]> {
  if (Date.now() < dbUnavailableUntil) {
    return INITIAL_BANGALORE_PROPERTIES;
  }
  try {
    const fromDb = await db.property.findMany({
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
    if (fromDb.length > 0) return fromDb as PropertyItem[];
  } catch {
    // Graceful fallback to verified in-memory dataset if PostgreSQL not active in local dev
    dbUnavailableUntil = Date.now() + 30000;
  }
  return INITIAL_BANGALORE_PROPERTIES;
}

export async function getPropertyBySlug(slug: string): Promise<PropertyItem | null> {
  if (Date.now() < dbUnavailableUntil) {
    return INITIAL_BANGALORE_PROPERTIES.find((p) => p.slug === slug) || null;
  }
  try {
    const item = await db.property.findUnique({
      where: { slug },
    });
    if (item) return item as PropertyItem;
  } catch {
    dbUnavailableUntil = Date.now() + 30000;
  }
  return INITIAL_BANGALORE_PROPERTIES.find((p) => p.slug === slug) || null;
}

export async function getHeroSlides(): Promise<PropertyItem[]> {
  const all = await getAllProperties();
  return all.filter((p) => p.heroSlide);
}

