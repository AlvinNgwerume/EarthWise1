export type PageId = 'home' | 'services' | 'about' | 'contact' | 'privacy' | 'terms' | 'act36';

export interface NavItem {
  id: PageId;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  iconName: string;
  imageUrl: string;
  features: string[];
  recommendedFor: string;
  targetPests: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  credentials: string[];
  experienceYears: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Bird Proofing' | 'Ceiling Hygiene' | 'Eco-Treatments' | 'Commercial' | 'Inspection';
  location: string;
  description: string;
  imageUrl: string;
  details: string[];
  beforeAfterAvailable?: boolean;
}

export interface SuburbCoverage {
  name: string;
  zone: 'City Bowl' | 'Atlantic Seaboard' | 'Southern Suburbs' | 'Hout Bay & Deep South' | 'Northern Suburbs' | 'Helderberg';
  dispatchTime: string;
  popularServices: string[];
  isAvailable: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Safety & Eco' | 'Services & Booking' | 'Warranties & Results';
}

export interface InspectionBookingData {
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  suburb: string;
  preferredDate: string;
  preferredTime: string;
  propertyType: 'Residential' | 'Commercial' | 'Hospitality / Food Service' | 'Estate / HOA';
  notes: string;
}

export interface PestQuoteEstimate {
  serviceName: string;
  estimatedPriceRange: string;
  recommendedFrequency: string;
  preparationAdvice: string[];
}
