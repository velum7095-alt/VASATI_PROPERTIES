const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Bangalore properties, settings, and admin user...');

  // 1. Seed Site Settings
  const settings = [
    { key: 'business_name', value: process.env.NEXT_PUBLIC_BUSINESS_NAME || '[BUSINESS_NAME_PLACEHOLDER]' },
    { key: 'legal_entity', value: process.env.NEXT_PUBLIC_BUSINESS_LEGAL_ENTITY || '[LEGAL_ENTITY_NAME_PVT_LTD]' },
    { key: 'office_address', value: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '[REGISTERED_OFFICE_ADDRESS_BANGALORE_KARNATAKA]' },
    { key: 'agency_krera_no', value: process.env.NEXT_PUBLIC_AGENCY_KRERA_NO || 'PRM/KA/RERA/1251/[YEAR]/AG/[NUMBER_PLACEHOLDER]' },
    { key: 'contact_phone', value: '+91 80 4567 8900' },
    { key: 'whatsapp_number', value: '919876543210' },
    { key: 'contact_email', value: 'contact@example.com' },
    { key: 'grievance_officer_name', value: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_NAME || '[GRIEVANCE_OFFICER_NAME_PLACEHOLDER]' },
    { key: 'grievance_officer_email', value: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_EMAIL || 'grievance@example.com' },
    { key: 'grievance_officer_phone', value: '+91 80 4567 8901' },
    { key: 'grievance_response_timeline', value: '7 working days' },
    { key: 'hero_tag', value: '✨ 100% Karnataka RERA Registered Bangalore Properties' },
    { key: 'hero_title', value: 'Curated Residential Homes in Bengaluru Tech Corridors' },
    { key: 'hero_subtitle', value: 'Verified builder developments and luxury gated communities across Whitefield, Sarjapur Road, Hebbal, and Electronic City. DPDP Act 2023 compliant by design.' }
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  // 2. Seed Default Admin
  const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'ChangeMeInProduction#2026!';
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Authorized Compliance & Operations Lead',
      passwordHash,
      role: 'ADMIN',
      twoFactorEnabled: false,
    },
  });

  // 3. Seed Bangalore Properties (All strictly with Karnataka RERA registration)
  const bangaloreProperties = [
    {
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
        'https://images.unsplash.com/photo-160060768739-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80'
      ],
      videoUrl: '',
      amenities: ['Private Terrace Gardens', 'Heated Indoor Pool', 'Organic Cafe', 'Bespoke Handcrafted Interiors', 'Micro-brewery Access'],
      latitude: 13.0658,
      longitude: 77.6432
    },
    {
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
      videoUrl: '',
      amenities: ['Infinity Sky Pool', 'Skate Park', 'Business Centre', 'Jacuzzi', '24/7 Monitored Gated Access'],
      latitude: 12.8912,
      longitude: 77.6415
    },
    {
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
      videoUrl: '',
      amenities: ['Township Central Park', 'Performing Arts Centre', 'Attached Shopping Mall', 'Cycle Tracks', 'Smart City Security'],
      latitude: 13.0784,
      longitude: 77.6253
    },
    {
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
      videoUrl: '',
      amenities: ['6-Acre Green Park', '38,000 sq ft Club', 'Indoor Badminton Courts', 'Pet Park', 'Amphitheatre'],
      latitude: 13.0012,
      longitude: 77.7654
    },
    {
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
      videoUrl: '',
      amenities: ['Senior Living Facilities', 'National Public School Inside', 'Olympic Pool', 'Hospital Healthcare Pod', 'Bowling Alley'],
      latitude: 13.2145,
      longitude: 77.7123
    }
  ];

  for (const p of bangaloreProperties) {
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  console.log(`✓ Seeded ${settings.length} site settings`);
  console.log(`✓ Seeded default admin: ${adminEmail}`);
  console.log(`✓ Seeded ${bangaloreProperties.length} Bangalore RERA-compliant properties`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

