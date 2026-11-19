export interface TriageExtractionState {
  pest: string | null;
  propertyType: string | null;
  suburb: string | null;
  fullName: string | null;
  phone: string | null;
  email: string | null;
}

export const CAPE_TOWN_SUBURBS = [
  'City Bowl', 'Gardens', 'Camps Bay', 'Sea Point', 'Green Point', 'Atlantic Seaboard',
  'Claremont', 'Rondebosch', 'Newlands', 'Constantia', 'Southern Suburbs', 'Hout Bay',
  'Durbanville', 'Bellville', 'Northern Suburbs', 'Blouberg', 'Table View',
  'Somerset West', 'Helderberg', 'Strand', "Gordon's Bay", 'Pinelands', 'Kenilworth',
  'Waterfront', 'Bantry Bay', 'Fresnaye', 'Pelican Park'
];

const NON_NAME_WORDS = new Set([
  'seeing', 'calling', 'looking', 'wondering', 'noticing', 'having', 'dealing',
  'urgent', 'emergency', 'residential', 'commercial', 'interested', 'asking',
  'checking', 'booking', 'trying', 'worried', 'concerned', 'located', 'based',
  'in', 'at', 'from', 'for', 'a', 'an', 'the', 'about', 'experiencing', 'reporting'
]);

export function extractTriageUpdates(
  input: string,
  prev: TriageExtractionState
): Partial<TriageExtractionState> {
  const text = input.toLowerCase();
  const updates: Partial<TriageExtractionState> = {};

  // 1. Detect Pest Issue
  if (!prev.pest) {
    if (text.includes('rat') || text.includes('rodent') || text.includes('mice') || text.includes('mouse') || text.includes('dropping')) {
      updates.pest = 'Rats & Rodents';
    } else if (text.includes('cockroach') || text.includes('roach')) {
      updates.pest = 'Cockroaches';
    } else if (text.includes('termite') || text.includes('wood')) {
      updates.pest = 'Termites';
    } else if (text.includes('ant')) {
      updates.pest = 'Ants';
    } else if (text.includes('bedbug') || text.includes('bed bug') || text.includes('flea') || text.includes('bite')) {
      updates.pest = 'Bed Bugs & Fleas';
    } else if (text.includes('bird') || text.includes('pigeon') || text.includes('seagull')) {
      updates.pest = 'Bird Proofing';
    } else if (text.includes('bat')) {
      updates.pest = 'Bat Removal';
    } else if (text.includes('mole')) {
      updates.pest = 'Mole Treatment';
    } else if (text.includes('wasp') || text.includes('bee') || text.includes('hornet')) {
      updates.pest = 'Wasps & Bees';
    }
  }

  // 2. Detect Property Type (note: "kitchen" alone can be residential, only match explicit commercial cues)
  if (!prev.propertyType) {
    if (
      text.includes('commercial') ||
      text.includes('office') ||
      text.includes('restaurant') ||
      text.includes('hotel') ||
      text.includes('warehouse') ||
      text.includes('factory') ||
      text.includes('business') ||
      text.includes('commercial kitchen')
    ) {
      updates.propertyType = 'Commercial';
    } else if (
      text.includes('house') ||
      text.includes('home') ||
      text.includes('residential') ||
      text.includes('flat') ||
      text.includes('apartment') ||
      text.includes('cottage')
    ) {
      updates.propertyType = 'Residential';
    }
  }

  // 3. Detect Suburb
  if (!prev.suburb) {
    for (const suburb of CAPE_TOWN_SUBURBS) {
      if (text.includes(suburb.toLowerCase())) {
        updates.suburb = suburb;
        break;
      }
    }
  }

  // 4. Detect Phone Number
  const phoneMatch = input.match(/(?:(?:\+27|0)\s*\d{2}\s*\d{3}\s*\d{4}|\d{10})/);
  if (phoneMatch && !prev.phone) {
    updates.phone = phoneMatch[0].replace(/\s+/g, '');
  }

  // 5. Detect Email
  const emailMatch = input.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch && !prev.email) {
    updates.email = emailMatch[0];
  }

  // 6. Detect Full Name (avoid false positives like "This is urgent", "I am in...")
  if (!prev.fullName) {
    const introMatch = input.match(/(?:my name is|name is|i'm|im|i am|this is)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
    if (introMatch && introMatch[1]) {
      const words = introMatch[1].trim().split(/\s+/);
      const firstWordLower = words[0].toLowerCase();
      if (!NON_NAME_WORDS.has(firstWordLower) && words[0].length >= 2) {
        const cleanWords = words.filter((w) => !NON_NAME_WORDS.has(w.toLowerCase()));
        if (cleanWords.length > 0) {
          updates.fullName = cleanWords.join(' ');
        }
      }
    } else if (phoneMatch) {
      // Support "Sarah, 082 123 4567" format
      const beforePhone = input.slice(0, phoneMatch.index).replace(/[,:-]+/g, ' ').trim();
      const words = beforePhone.split(/\s+/).filter((w) => /^[A-Za-z]{2,}$/.test(w));
      if (words.length >= 1 && words.length <= 3 && !NON_NAME_WORDS.has(words[0].toLowerCase())) {
        updates.fullName = words.join(' ');
      }
    }
  }

  return updates;
}

export function mapPestToServiceId(pest: string | null): string {
  if (!pest) return 'cockroaches';
  const p = pest.toLowerCase();
  if (p.includes('rat') || p.includes('rodent') || p.includes('mice') || p.includes('mouse')) return 'rats-mice';
  if (p.includes('ant')) return 'ants';
  if (p.includes('mole')) return 'mole-treatment';
  if (p.includes('bedbug') || p.includes('bed bug') || p.includes('flea') || p.includes('mite')) return 'bedbugs-fleas';
  if (p.includes('bird') || p.includes('pigeon') || p.includes('seagull')) return 'bird-proofing';
  if (p.includes('bat')) return 'bat-removal';
  return 'cockroaches';
}
