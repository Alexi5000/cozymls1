import { Contact } from './types';

const firstNames = [
  'John', 'Dawn', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Ashley', 'James', 'Amanda',
  'William', 'Jennifer', 'Christopher', 'Lisa', 'Daniel', 'Michelle', 'Matthew', 'Kimberly', 'Andrew', 'Amy',
  'Joshua', 'Angela', 'Anthony', 'Brenda', 'Kevin', 'Emma', 'Brian', 'Olivia', 'Ryan', 'Cynthia',
  'Jacob', 'Marie', 'Nicholas', 'Janet', 'Gary', 'Catherine', 'Steven', 'Frances', 'Kenneth', 'Christine',
  'Paul', 'Samantha', 'Mark', 'Deborah', 'Donald', 'Rachel', 'George', 'Carolyn', 'Jason', 'Janet'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

const companies = [
  'Tech Corp', 'Design Studio', 'Marketing Agency', 'Consulting Group', 'Financial Services',
  'Healthcare Solutions', 'Manufacturing Inc', 'Retail Enterprises', 'Construction Co', 'Legal Associates',
  'Engineering Firm', 'Creative Agency', 'Investment Partners', 'Software Solutions', 'Media Group',
  'Architecture Studio', 'Education Services', 'Transportation LLC', 'Energy Solutions', 'Real Estate Holdings',
  'Hospitality Group', 'Medical Center', 'Technology Solutions', 'Business Consulting', 'Digital Marketing',
  'Property Management', 'Development Corp', 'Investment Fund', 'Strategic Partners', 'Innovation Labs'
];

const statuses = ['lead', 'prospect', 'client'] as const;

const allTags = [
  'VIP', 'Luxury', 'First-time buyer', 'Investor', 'Relocating', 'Downsizing', 'Upsizing',
  'Cash buyer', 'Quick close', 'Flexible timing', 'Price sensitive', 'Location specific',
  'School district', 'Waterfront', 'View property', 'New construction', 'Fixer-upper',
  'Move-in ready', 'Pet owner', 'Home office', 'Large family', 'Retirement', 'Investment property',
  'Commercial buyer', 'International client', 'Referral', 'Past client', 'High priority'
];

const noteTemplates = [
  'Looking for a family home in {city}',
  'Interested in condos under ${price}k',
  'Looking for investment properties',
  'Seeking luxury properties with {feature}',
  'First-time buyer, needs guidance',
  'Relocating from {location} for work',
  'Downsizing after retirement',
  'Growing family, needs more space',
  'Interested in {propertyType} properties',
  'Cash buyer, can close quickly',
  'Flexible on timing, wants perfect home',
  'Price range ${minPrice}k - ${maxPrice}k',
  'Must have {bedrooms} bedrooms minimum',
  'Prefers {neighborhood} area',
  'Looking for properties with {amenity}'
];

const cities = ['San Francisco', 'Oakland', 'Berkeley', 'Palo Alto', 'San Jose', 'Mountain View'];
const features = ['pool', 'garden', 'garage', 'view', 'modern kitchen', 'home office'];
const propertyTypes = ['single-family', 'condo', 'townhouse'];
const neighborhoods = ['downtown', 'suburban', 'waterfront', 'hills', 'historic district'];
const amenities = ['parking', 'storage', 'balcony', 'fireplace', 'walk-in closet'];

const getRandomElement = <T>(array: readonly T[]): T => array[Math.floor(Math.random() * array.length)];
const getRandomElements = <T>(array: T[], minCount: number, maxCount: number): T[] => {
  const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generatePhoneNumber = (): string => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const exchange = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `(${areaCode}) ${exchange}-${number}`;
};

const generateEmail = (firstName: string, lastName: string): string => {
  const domains = ['email.com', 'gmail.com', 'company.com', 'business.net', 'corp.org'];
  const formats = [
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    `${firstName.toLowerCase().charAt(0)}${lastName.toLowerCase()}`,
    `${firstName.toLowerCase()}${Math.floor(Math.random() * 100)}`
  ];
  
  return `${getRandomElement(formats)}@${getRandomElement(domains)}`;
};

const generateNote = (): string => {
  const template = getRandomElement(noteTemplates);
  return template
    .replace('{city}', getRandomElement(cities))
    .replace('{price}', (Math.floor(Math.random() * 1500) + 500).toString())
    .replace('{feature}', getRandomElement(features))
    .replace('{location}', getRandomElement(cities))
    .replace('{propertyType}', getRandomElement(propertyTypes))
    .replace('{minPrice}', (Math.floor(Math.random() * 800) + 400).toString())
    .replace('{maxPrice}', (Math.floor(Math.random() * 1200) + 800).toString())
    .replace('{bedrooms}', (Math.floor(Math.random() * 4) + 2).toString())
    .replace('{neighborhood}', getRandomElement(neighborhoods))
    .replace('{amenity}', getRandomElement(amenities));
};

export const mockContacts: Contact[] = Array.from({ length: 50 }, (_, index) => {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const name = `${firstName} ${lastName}`;
  const email = generateEmail(firstName, lastName);
  const phone = generatePhoneNumber();
  const company = Math.random() > 0.3 ? getRandomElement(companies) : undefined;
  const status = getRandomElement(statuses);
  const tags = getRandomElements(allTags, 1, 4);
  const notes = Math.random() > 0.2 ? generateNote() : undefined;
  
  // Generate dates
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 365)); // Up to 1 year ago
  
  const lastContact = new Date(createdAt);
  lastContact.setDate(lastContact.getDate() + Math.floor(Math.random() * 180)); // Up to 6 months after creation
  
  const updatedAt = new Date(lastContact);
  updatedAt.setDate(updatedAt.getDate() + Math.floor(Math.random() * 30)); // Up to 1 month after last contact
  
  return {
    id: `${index + 1}`,
    name,
    email,
    phone,
    company,
    status,
    tags,
    lastContact,
    notes,
    createdAt,
    updatedAt
  };
});