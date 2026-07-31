import { ServiceItem, TeamMember, GalleryItem, SuburbCoverage, FAQItem } from '../types';

import ecoImg from '../assets/images/eco_pest_treatment_1785463136065.jpg';
import birdImg from '../assets/images/bird_proofing_1785463150744.jpg';
import ceilingImg from '../assets/images/ceiling_hygiene_1785463164905.jpg';
import termiteImg from '../assets/images/termite_barrier_1785463180879.jpg';
import commercialImg from '../assets/images/commercial_pest_1785463195028.jpg';
import solarImg from '../assets/images/solar_bird_guard_1785463208275.jpg';

import julianImg from '../assets/images/julian_thorne_1785463226431.jpg';
import sarahImg from '../assets/images/sarah_chen_1785463241558.jpg';
import marcusImg from '../assets/images/marcus_vane_1785463256902.jpg';
import elenaImg from '../assets/images/elena_rossi_1785463273469.jpg';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'eco-treatments',
    title: 'Precision Eco-Treatments',
    category: 'Targeted Pest Control',
    tagline: 'Botanical micro-encapsulation & low-toxicity targeted applications.',
    description: 'Our proprietary plant-based and low-toxicity micro-formulations target insect nervous systems without lingering toxic VOC fumes or chemical residues. Certified Act 36/1947 safe for homes with children, pets, and indoor aquariums.',
    iconName: 'ShieldCheck',
    imageUrl: ecoImg,
    features: [
      'Zero harsh chemical fumes or evacuation requirements',
      'Targeted bait gel matrix for German cockroach nest eradication',
      'Odourless, bio-rational barrier treatments for perimeter defense',
      'Child & pet safe within 30 minutes of application'
    ],
    recommendedFor: 'Residential homes, apartments, nurseries, and sensitive environments.',
    targetPests: ['Ants', 'Cockroaches', 'Fishmoths', 'Fleas', 'Spiders']
  },
  {
    id: 'bird-proofing',
    title: 'Humane Bird Proofing & Exclusion',
    category: 'Avian Management',
    tagline: 'High-tension stone netting, marine-grade spikes & optical gels.',
    description: 'Protect Cape Town heritage facades, solar panels, and commercial ledges from roosting pigeons, starlings, and seagulls. Engineered using UV-stabilised 316 stainless steel fittings that preserve architectural aesthetics while guaranteeing 100% roost prevention.',
    iconName: 'Bird',
    imageUrl: birdImg,
    features: [
      'Discreet high-density polyethylene (HDPE) netting in stone & black',
      'Solar panel bird barrier mesh to protect wiring & efficiency',
      'Marine-grade 316 stainless steel anti-roosting spike tracks',
      'Humane non-harmful optical magnetic gel deterrent discs'
    ],
    recommendedFor: 'Solar panel installations, commercial rooftops, heritage buildings, coastal balconies.',
    targetPests: ['Pigeons', 'Starlings', 'Seagulls', 'Sparrows']
  },
  {
    id: 'ceiling-hygiene',
    title: 'Ceiling Space Hygiene & Sanitisation',
    category: 'Roof Cavity Restoration',
    tagline: 'HEPA vacuum extraction, virucidal fogging & insulation renewal.',
    description: 'Rodents and birds nesting in Cape Town roof spaces deposit toxic guano, allergens, and mites into your ceiling. Our specialized team performs complete HEPA extraction, misting with eco-friendly virucidal foggers, and reinstalling high-performance thermal insulation.',
    iconName: 'Sparkles',
    imageUrl: ceilingImg,
    features: [
      'Industrial HEPA-filter vacuuming of droppings & nesting debris',
      'Hospital-grade eco-friendly virucidal & bactericidal fogging',
      'Removal & environmentally compliant disposal of ruined insulation',
      'Thermal & acoustic mineral insulation replacement with fire rating'
    ],
    recommendedFor: 'Properties with previous rodent/bird infestation, foul roof odours, or old insulation.',
    targetPests: ['Roof Rats', 'Mice', 'Bird Mites', 'Pigeon Guano']
  },
  {
    id: 'termite-woodborer',
    title: 'Termite & Woodborer Barrier Systems',
    category: 'Timber Protection',
    tagline: 'Subterranean liquid soil barriers & clearance certificates.',
    description: 'Subterranean termites and West Indian drywood borers can silently compromise structural timber and floors. We install deep perimeter liquid soil barriers and conduct timber injections, complete with official SAPCA Timber Inspection Clearance Certificates for property transfers.',
    iconName: 'Trees',
    imageUrl: termiteImg,
    features: [
      'Termiticide soil perimeter barrier around foundation footings',
      'Deep timber pressure injection & protective coat application',
      'Subterranean bait station monitoring grid',
      'Official SAPCA Beetle & Woodborer Clearance Certificates'
    ],
    recommendedFor: 'Home sellers, buyers, historic timber properties, sub-floor wooden structures.',
    targetPests: ['Subterranean Termites', 'Woodborer Beetles', 'Furniture Beetles']
  },
  {
    id: 'commercial-protocol',
    title: 'Commercial & HACCP Pest Management',
    category: 'Business & Hospitality',
    tagline: 'Audit-ready compliance logging, digital trend reports & zero downtime.',
    description: 'Designed specifically for Cape Town restaurants, boutique hotels, wineries, and food processing plants. We maintain strict HACCP, ISO 22000, and Food Safety audit readiness with tamper-resistant monitoring stations and transparent digital inspection logs.',
    iconName: 'Building2',
    imageUrl: commercialImg,
    features: [
      'Audit-ready electronic inspection logs & site mapping',
      'Tamper-resistant lockable rodent stations & UV insect attractors',
      'After-hours service scheduling for zero business disruption',
      'Quarterly trend analysis & structural proofing recommendations'
    ],
    recommendedFor: 'Restaurants, hotels, food factories, office parks, wine estates.',
    targetPests: ['Cockroaches', 'Rodents', 'Store Product Pests', 'Flies']
  },
  {
    id: 'rodent-exclusion',
    title: 'Rodent Exclusion & Proofing',
    category: 'Structural Shielding',
    tagline: 'Architectural entry sealing, mesh barriers & smart trapping.',
    description: 'Eliminating rats and mice requires blocking their access permanently. Our structural proofing team seals weep holes, pipe penetrations, roof joins, and door gaps with stainless copper mesh and expandable mortar compounds.',
    iconName: 'ShieldAlert',
    imageUrl: birdImg,
    features: [
      'Full architectural inspection & entry point mapping',
      'Heavy-duty stainless steel mesh & brush strip installation',
      'Humane multi-catch electronic smart traps',
      'Deodorising anti-pheromone sanitisation treatment'
    ],
    recommendedFor: 'Coastal properties, restaurants, roof-adjacent structures, older homes.',
    targetPests: ['Roof Rats', 'Norway Rats', 'House Mice']
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'julian-thorne',
    name: 'Julian Thorne',
    role: 'Founder & Chief Entomologist',
    bio: 'With over 30 years in South African biological pest control, Julian founded Earthwise in 1994 to pioneer eco-friendly micro-encapsulation techniques in Cape Town.',
    imageUrl: julianImg,
    credentials: ['M.Sc. Entomology (UCT)', 'SAPCA Master Certifier', 'Act 36 Registered PCO'],
    experienceYears: 32
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Head of Eco-Formulation & Compliance',
    bio: 'Sarah leads our chemical safety audits and bio-rational formulation testing, ensuring every compound used is safe for endemic Cape fynbos flora and domestic pets.',
    imageUrl: sarahImg,
    credentials: ['B.Sc. Environmental Science', 'HACCP Lead Auditor', 'Toxicology Specialist'],
    experienceYears: 14
  },
  {
    id: 'marcus-vane',
    name: 'Marcus Vane',
    role: 'Field Operations & Avian Specialist',
    bio: 'Marcus manages our technical field teams across Cape Town, specializing in complex commercial bird proofing installations on high-rise and heritage buildings.',
    imageUrl: marcusImg,
    credentials: ['IRATA Level 3 Rope Technician', 'Advanced Structural Exclusion Specialist'],
    experienceYears: 18
  },
  {
    id: 'elena-rossi',
    name: 'Elena Rossi',
    role: 'Client Services & Hygiene Lead',
    bio: 'Elena oversees our roof space hygiene projects and client care, ensuring seamless scheduling, transparent reports, and post-service follow-up inspections.',
    imageUrl: elenaImg,
    credentials: ['Indoor Air Quality Professional', 'Customer Success Director'],
    experienceYears: 11
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Commercial Bird Proofing Netting',
    category: 'Bird Proofing',
    location: 'Camps Bay Hotel Facade',
    description: 'Discreet stone-colored HDPE netting installed along 40m hotel courtyard to prevent pigeon nesting without obstructing panoramic ocean views.',
    imageUrl: birdImg,
    details: ['316 Marine Grade Stainless Cable', '10-Year Tension Warranty', 'Zero View Distortion']
  },
  {
    id: 'gal-2',
    title: 'Precision Micro-ULV Botanical Fogging',
    category: 'Eco-Treatments',
    location: 'Constantia Wine Estate Cellar',
    description: 'Ultra-low volume botanical fogging treatment applied during grape harvesting to control vinegar flies while preserving organic wine integrity.',
    imageUrl: ecoImg,
    details: ['100% Organic Act 36 Approved', 'Zero Alcohol Contamination', 'Rapid 1-Hour Re-entry']
  },
  {
    id: 'gal-3',
    title: 'Residential Roof Space HEPA Restoration',
    category: 'Ceiling Hygiene',
    location: 'Bishops Court Heritage Villa',
    description: 'Complete removal of contaminated 25-year-old fibreglass insulation, guano extraction, virucidal misting, and installation of eco-cellulose thermal batts.',
    imageUrl: ceilingImg,
    details: ['HEPA Air Scrubber Deactivation', 'Fire-Rated Mineral Batts', 'Thermal Efficiency +40%']
  },
  {
    id: 'gal-4',
    title: 'Solar Panel Bird Guard Installation',
    category: 'Bird Proofing',
    location: 'Durbanville Residential Roof',
    description: 'Custom perimeter steel wire clip mesh installed around 24 solar panels, stopping starlings from building fire-hazard nests under hot panel wiring.',
    imageUrl: solarImg,
    details: ['No Drilling - Clips to Panel Frame', 'Preserves Solar Warranty', 'UV-Coated Steel Wire']
  },
  {
    id: 'gal-5',
    title: 'Subterranean Termite Soil Barrier',
    category: 'Eco-Treatments',
    location: 'Tamboerskloof Victorian Home',
    description: 'Perimeter trenching and high-pressure sub-slab liquid termiticide barrier injection protecting original Oregon pine wooden floors.',
    imageUrl: termiteImg,
    details: ['5-Year Guarantee Certificate', 'Sub-Slab Injection Ports', 'Non-Repellent Colony Eradication']
  },
  {
    id: 'gal-6',
    title: 'HACCP Digital Monitoring Setup',
    category: 'Commercial',
    location: 'V&A Waterfront Restaurant',
    description: 'Installation of QR-coded lockable rodent stations and non-toxic sticky monitors with real-time digital logging for food compliance audits.',
    imageUrl: commercialImg,
    details: ['QR Scan Log System', 'Tamper-Proof Lockable Stations', 'Monthly Audit Reporting']
  }
];

export const SUBURB_COVERAGE: SuburbCoverage[] = [
  {
    name: 'City Bowl & CBD',
    zone: 'City Bowl',
    dispatchTime: 'Under 45 mins',
    popularServices: ['Rodent Exclusion', 'Commercial HACCP', 'Bird Proofing'],
    isAvailable: true
  },
  {
    name: 'Camps Bay & Clifton',
    zone: 'Atlantic Seaboard',
    dispatchTime: 'Under 60 mins',
    popularServices: ['Bird Proofing', 'Precision Eco-Treatments', 'Ceiling Hygiene'],
    isAvailable: true
  },
  {
    name: 'Sea Point & Green Point',
    zone: 'Atlantic Seaboard',
    dispatchTime: 'Under 45 mins',
    popularServices: ['Rodent Proofing', 'Apartment Eco-Sprays', 'Bird Netting'],
    isAvailable: true
  },
  {
    name: 'Constantia & Bishopscourt',
    zone: 'Southern Suburbs',
    dispatchTime: 'Under 60 mins',
    popularServices: ['Termite Soil Barrier', 'Ceiling Hygiene', 'Winery HACCP'],
    isAvailable: true
  },
  {
    name: 'Rondebosch & Newlands',
    zone: 'Southern Suburbs',
    dispatchTime: 'Under 45 mins',
    popularServices: ['Ant & Cockroach Control', 'Roof Space Sanitisation', 'Woodborer Inspection'],
    isAvailable: true
  },
  {
    name: 'Hout Bay & Llandudno',
    zone: 'Hout Bay & Deep South',
    dispatchTime: 'Under 60 mins',
    popularServices: ['Humane Bird Proofing', 'Perimeter Defense', 'Rat Exclusion'],
    isAvailable: true
  },
  {
    name: 'Durbanville & Welgemoed',
    zone: 'Northern Suburbs',
    dispatchTime: 'Under 60 mins',
    popularServices: ['Termite Barriers', 'Solar Panel Guards', 'Home Protection'],
    isAvailable: true
  },
  {
    name: 'Blouberg & Table View',
    zone: 'Northern Suburbs',
    dispatchTime: 'Under 60 mins',
    popularServices: ['Coastal Bird Proofing', 'Cockroach Gelling', 'Rodent Control'],
    isAvailable: true
  },
  {
    name: 'Somerset West & Stellenbosch',
    zone: 'Helderberg',
    dispatchTime: 'Under 75 mins',
    popularServices: ['Wine Estate Protocols', 'Woodborer Clearance', 'Guano Cleaning'],
    isAvailable: true
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Safety & Eco',
    question: 'Are Earthwise pest treatments safe for pets and young children?',
    answer: 'Yes, absolutely. We strictly utilize Act 36/1947 registered botanical micro-formulations and targeted bait gels. Unlike traditional indiscriminate spraying, our treatments are odourless, low-toxicity, and localized. Families and pets can remain in the home or re-enter safely within 30 minutes.'
  },
  {
    id: 'faq-2',
    category: 'Safety & Eco',
    question: 'Do we have to vacate our house during the service?',
    answer: 'In 95% of our residential treatments, you do NOT need to leave your property. For specialized treatments such as high-density ULV fogging or ceiling space guano sanitisation, we may recommend stepping out for 1 to 2 hours while our team completes the treatment and ventilates the space.'
  },
  {
    id: 'faq-3',
    category: 'Services & Booking',
    question: 'How quickly can an Earthwise technician respond to an emergency in Cape Town?',
    answer: 'We maintain dedicated mobile teams stationed across the City Bowl, Atlantic Seaboard, Southern Suburbs, and Northern Suburbs. For urgent rodent breaches or wasp nest removals, we offer same-day emergency dispatch, typically arriving within 45 to 60 minutes.'
  },
  {
    id: 'faq-4',
    category: 'Services & Booking',
    question: 'Will bird proofing netting or spikes ruin the look of my building facade?',
    answer: 'Not at all. We specialize in aesthetic structural integration. Our high-density polyethylene netting comes in stone, beige, and transparent options that blend invisibly into plaster and brickwork. Our 316 marine-grade stainless spikes and solar panel wire clips are ultra-discreet.'
  },
  {
    id: 'faq-5',
    category: 'Warranties & Results',
    question: 'What kind of guarantee or warranty do you provide on your services?',
    answer: 'We stand firmly behind our craftsmanship. Standard eco-treatments carry a 3-month to 6-month free re-service warranty. Subterranean termite liquid barriers are guaranteed for 5 years, and commercial high-tension bird netting installations include a 10-year structural warranty.'
  },
  {
    id: 'faq-6',
    category: 'Services & Booking',
    question: 'Do you provide Beetle and Woodborer Clearance Certificates for home sales?',
    answer: 'Yes. Our chief entomologists are SAPCA-certified inspectors qualified to issue official Wood-destroying Insect Clearance Certificates required for property transfers in the Western Cape.'
  }
];
