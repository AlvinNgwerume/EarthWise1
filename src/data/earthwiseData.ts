import { ServiceItem, TeamMember, GalleryItem, SuburbCoverage, FAQItem } from '../types';

import ecoImg from '../assets/images/eco_pest_treatment_1785463136065.jpg';
import birdImg from '../assets/images/bird_proofing_1785463150744.jpg';
import ceilingImg from '../assets/images/ceiling_hygiene_1785463164905.jpg';
import termiteImg from '../assets/images/termite_barrier_1785463180879.jpg';
import solarImg from '../assets/images/solar_bird_guard_1785463208275.jpg';

import julianImg from '../assets/images/julian_thorne_1785463226431.jpg';
import sarahImg from '../assets/images/sarah_chen_1785463241558.jpg';
import marcusImg from '../assets/images/marcus_vane_1785463256902.jpg';
import elenaImg from '../assets/images/elena_rossi_1785463273469.jpg';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'cockroaches',
    title: 'Cockroaches',
    category: 'Pest Control',
    tagline: 'Targeted gel baiting and complete nest eradication.',
    description: 'Targeted eco-friendly bait gel application and precision micro-sprays that eradicate German and American cockroach nests at the source without toxic fumes or kitchen disruptions.',
    iconName: 'ShieldCheck',
    imageUrl: ecoImg,
    features: [
      'Nest-targeted bio-rational gel baiting',
      'Zero chemical fumes or harsh odours',
      'Child & pet safe formulation within 30 mins',
      'Long-lasting preventive barrier defense'
    ],
    recommendedFor: 'Residential homes, apartments, restaurants, kitchens, commercial food prep.',
    targetPests: ['German Cockroaches', 'American Cockroaches', 'Oriental Cockroaches']
  },
  {
    id: 'ants',
    title: 'Ants',
    category: 'Pest Control',
    tagline: 'Colony eradication and long-term perimeter shielding.',
    description: 'Specialized non-repellent transfer formulas carried directly to the queen by foraging worker ants, eliminating entire subterranean nests and garden colonies permanently.',
    iconName: 'ShieldCheck',
    imageUrl: ecoImg,
    features: [
      'Queen colony transfer technology',
      'Safe for lawns, garden beds, and indoor floors',
      'Perimeter foundation barrier treatment',
      'Effective against sugar ants, black ants & fire ants'
    ],
    recommendedFor: 'Residential properties, garden perimeters, paved areas, kitchens.',
    targetPests: ['Sugar Ants', 'Black House Ants', 'Pugnacious Ants', 'Argentine Ants']
  },
  {
    id: 'rats-mice',
    title: 'Rats & Mice',
    category: 'Rodent Control',
    tagline: 'Exclusion, structural sealing & humane rodent management.',
    description: 'Comprehensive rodent control combining tamper-resistant bait stations, entry point proofing with heavy-duty mesh, and roof cavity sanitisation to prevent re-entry.',
    iconName: 'ShieldAlert',
    imageUrl: ceilingImg,
    features: [
      'Tamper-proof lockable exterior & interior bait stations',
      'Architectural entry sealing (weep holes, eaves, pipe gaps)',
      'Safe placement away from children, pets, and non-target wildlife',
      'Roof space inspection and anti-pheromone sanitisation'
    ],
    recommendedFor: 'Homes, ceiling spaces, restaurants, food stores, coastal properties.',
    targetPests: ['Roof Rats', 'Norway Rats', 'House Mice', 'Field Mice']
  },
  {
    id: 'mole-treatment',
    title: 'Mole Treatment',
    category: 'Garden & Turf Care',
    tagline: 'Subterranean runway management & lawn protection.',
    description: 'Eco-conscious mole treatment and repellent systems designed to protect manicured Cape Town lawns, turf, and flowerbeds from destructive burrowing without toxic poisons.',
    iconName: 'Trees',
    imageUrl: termiteImg,
    features: [
      'Targeted subterranean runway & mound treatment',
      'Protects grass roots, paving, and garden beds',
      'Humane eco-friendly deterrent technology',
      'Safe for pets, earthworms, and beneficial soil organisms'
    ],
    recommendedFor: 'Residential lawns, golf courses, garden estates, agricultural properties.',
    targetPests: ['Golden Moles', 'Cape Dune Molerats', 'Subterranean Burrowers']
  },
  {
    id: 'bedbugs-fleas',
    title: 'Bedbugs & Fleas',
    category: 'Biting Insect Eradication',
    tagline: 'Multi-stage lifecycle elimination & soothing relief.',
    description: 'Targeted insect growth regulators (IGR) and micro-encapsulated treatments that eliminate all lifecycle stages from eggs and larvae to biting adults in mattresses and carpets.',
    iconName: 'Sparkles',
    imageUrl: ecoImg,
    features: [
      'Kills eggs, larvae, and adult biting pests',
      'Deep mattress, upholstery, skirting board & carpet treatment',
      'Rapid re-entry with pet-safe bio-rational products',
      'Immediate relief from persistent bites and skin irritation'
    ],
    recommendedFor: 'Bedrooms, guest houses, rental units, pet-friendly households.',
    targetPests: ['Bedbugs', 'Cat Fleas', 'Dog Fleas', 'Carpet Mites']
  },
  {
    id: 'bird-proofing',
    title: 'Bird Proofing',
    category: 'Avian Management',
    tagline: 'Humane netting, stainless spikes & solar panel mesh guards.',
    description: 'Discreet stone and black HDPE netting, 316 marine-grade stainless spikes, and non-drill solar panel clips that prevent roosting pigeons and starlings from damaging roofs.',
    iconName: 'Bird',
    imageUrl: birdImg,
    features: [
      'Discreet stone & black tensioned HDPE netting',
      'Solar panel wire clip mesh to protect wiring',
      'Marine-grade 316 stainless anti-roosting spikes',
      '100% humane physical exclusion — zero harm to birds'
    ],
    recommendedFor: 'Balconies, solar panels, commercial rooftops, heritage buildings.',
    targetPests: ['Pigeons', 'Starlings', 'Seagulls', 'Sparrows']
  },
  {
    id: 'bat-removal',
    title: 'Bat Removal',
    category: 'Wildlife Exclusion',
    tagline: 'Humane one-way exclusion valves & roof sanitisation.',
    description: 'Humane bat exclusion using custom one-way release funnels that allow bats to safely exit roof cavities without re-entering, followed by full guano cleanup and ceiling sanitisation.',
    iconName: 'Building2',
    imageUrl: ceilingImg,
    features: [
      'Humane one-way exclusion valves (no bats harmed)',
      'Complete roof entry sealing and mesh installation',
      'Bio-hazard guano removal and enzyme sanitisation',
      'Conducted in strict compliance with South African conservation laws'
    ],
    recommendedFor: 'Roof spaces, ceiling cavities, historic chimneys, timber roofs.',
    targetPests: ['Cape Serotine Bats', 'Free-Tailed Bats', 'Fruit Bats']
  }
];

export const TEAM_MEMBERS: TeamMember[] = [];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Commercial Bird Proofing Netting',
    category: 'Bird Proofing',
    location: 'Camps Bay Hotel Facade',
    description: 'Discreet stone-colored HDPE netting installed along 40m hotel courtyard to prevent pigeon nesting without obstructing panoramic ocean views.',
    imageUrl: birdImg,
    details: ['316 Marine Grade Stainless Cable', 'Max 2 - Years', 'Zero View Distortion']
  },
  {
    id: 'gal-2',
    title: 'Precision Micro-ULV Fogging',
    category: 'Eco-Treatments',
    location: 'Constantia',
    description: 'Ultra-low volume in-house fogging treatment to control flies.',
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
  }
];

export const SUBURB_COVERAGE: SuburbCoverage[] = [
  {
    name: 'Pelican Park & False Bay',
    zone: 'Southern Suburbs',
    dispatchTime: 'Under 30 mins',
    popularServices: ['Eco-Treatments', 'Rodent Exclusion', 'Perimeter Defense'],
    isAvailable: true
  },
  {
    name: 'City Bowl & CBD',
    zone: 'City Bowl',
    dispatchTime: 'Under 45 mins',
    popularServices: ['Rodent Exclusion', 'Commercial Pest Prevention', 'Bird Proofing'],
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
    popularServices: ['Termite Soil Barrier', 'Ceiling Hygiene', 'Winery Pest Management'],
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
    answer: 'We stand firmly behind our craftsmanship. Standard eco-treatments carry a 3-month to 6-month complimentary re-service warranty. Subterranean termite liquid barriers are guaranteed for 5 years, and commercial high-tension bird netting installations include up to 2 years structural warranty.'
  },
  {
    id: 'faq-6',
    category: 'Services & Booking',
    question: 'Do you provide Beetle and Woodborer Clearance Certificates for home sales?',
    answer: 'Yes. Our chief entomologists are SAPCA-certified inspectors qualified to issue official Wood-destroying Insect Clearance Certificates required for property transfers in the Western Cape.'
  }
];
