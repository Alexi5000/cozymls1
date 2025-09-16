import { Property } from './types';

const agents = [
  { id: 'user1', name: 'Siobhan O\'Sullivan', phone: '+353 1 456 7890', email: 'siobhan@dublinestate.ie' },
  { id: 'user2', name: 'Cian Murphy', phone: '+353 87 123 4567', email: 'cian@dublinestate.ie' },
  { id: 'user3', name: 'Aoife Kelly', phone: '+353 1 234 5678', email: 'aoife@dublinestate.ie' },
  { id: 'user4', name: 'Padraig O\'Brien', phone: '+353 86 567 8901', email: 'padraig@dublinestate.ie' },
  { id: 'user5', name: 'Niamh Ryan', phone: '+353 1 345 6789', email: 'niamh@dublinestate.ie' },
  { id: 'user6', name: 'Eoin Walsh', phone: '+353 85 234 5678', email: 'eoin@dublinestate.ie' },
  { id: 'user7', name: 'Caoimhe Byrne', phone: '+353 1 567 8901', email: 'caoimhe@dublinestate.ie' },
  { id: 'user8', name: 'Ruairi McCarthy', phone: '+353 83 678 9012', email: 'ruairi@dublinestate.ie' },
  { id: 'user9', name: 'Grainne Fitzgerald', phone: '+353 1 678 9012', email: 'grainne@dublinestate.ie' },
  { id: 'user10', name: 'Oisin Donovan', phone: '+353 87 789 0123', email: 'oisin@dublinestate.ie' }
];

const dublinAreas = [
  { name: 'Temple Bar', county: 'Dublin', eircode: 'D02' },
  { name: 'Ballsbridge', county: 'Dublin', eircode: 'D04' },
  { name: 'Donnybrook', county: 'Dublin', eircode: 'D04' },
  { name: 'Ranelagh', county: 'Dublin', eircode: 'D06' },
  { name: 'Rathmines', county: 'Dublin', eircode: 'D06' },
  { name: 'Sandymount', county: 'Dublin', eircode: 'D04' },
  { name: 'Rathgar', county: 'Dublin', eircode: 'D06' },
  { name: 'Dalkey', county: 'Dublin', eircode: 'A96' },
  { name: 'Dun Laoghaire', county: 'Dublin', eircode: 'A96' },
  { name: 'Blackrock', county: 'Dublin', eircode: 'A94' },
  { name: 'Stillorgan', county: 'Dublin', eircode: 'A94' },
  { name: 'Dundrum', county: 'Dublin', eircode: 'D14' }
];

const dublinStreets = [
  'Grafton Street', 'O\'Connell Street', 'Nassau Street', 'Dame Street', 'Pearse Street',
  'Baggot Street', 'Leeson Street', 'Fitzwilliam Square', 'Merrion Square', 'Stephen\'s Green',
  'Harcourt Street', 'Dawson Street', 'Kildare Street', 'Molesworth Street', 'Burlington Road',
  'Morehampton Road', 'Appian Way', 'Lesson Park', 'Pembroke Road', 'Clyde Road'
];

const propertyTypes = ['house', 'apartment', 'townhouse', 'duplex'] as const;
const statuses = ['active', 'pending', 'sold'] as const;

const dublinFeatures = [
  'Period Features', 'Original Sash Windows', 'Private Garden', 'Off-Street Parking', 'Dublin Bay Views', 'Modern Kitchen',
  'Utility Room', 'DART Access', 'Rear Garden', 'Renovated Bathrooms', 'Near Schools',
  'Patio', 'Fireplace', 'Built-in Wardrobes', 'Granite Worktops', 'Integrated Appliances',
  'Central Heating', 'High Ceilings', 'Balcony', 'Storage Room', 'Pet Friendly', 'Lift Access',
  'Alarm System', 'BER Rating A', 'Smart Home', 'Wine Cellar', 'Home Office',
  'Victorian Features', 'Georgian Character', 'Sea Views', 'City Centre Location'
];

const dublinDescriptions = [
  'Stunning Victorian period home with original features and contemporary updates throughout.',
  'Modern apartment with breathtaking Dublin Bay views and premium finishes.',
  'Spacious family home with private rear garden and excellent transport links.',
  'Charming Georgian terrace with original period details and character features.',
  'Contemporary townhouse with open-plan living and designer kitchen.',
  'Elegant Edwardian home with mature gardens in sought-after location.',
  'Luxurious penthouse with panoramic city views and access to Grand Canal.',
  'Charming cottage-style home perfect for first-time buyers near DART.',
  'Excellent investment opportunity with strong rental yield potential.',
  'Historic property with period charm and all modern conveniences.'
];

// Unique Unsplash photo IDs for variety
const photoIds = [
  'photo-1568605114967-8130f3a36994', 'photo-1560448204-e02f11c3d0e2', 'photo-1570129477492-45c003edd2be',
  'photo-1600596542815-ffad4c1539a9', 'photo-1600607687920-4e2a09cf159d', 'photo-1600607687939-ce8a6c25118c',
  'photo-1600566753190-17f0baa2a6c3', 'photo-1600566753376-12c8ab7fb75b', 'photo-1600573472549-de0bb2e5a04d',
  'photo-1600585154340-be6161a56a0c', 'photo-1600596542815-ffad4c1539a9', 'photo-1600607687644-aac4cc92b3ec',
  'photo-1586023492125-27b2c045efd7', 'photo-1600047509807-ba8f99d2cdde', 'photo-1600210492486-724fe5c67fb0',
  'photo-1600210492493-0946911123ea', 'photo-1600566752355-35792bedcfea', 'photo-1600566752734-d1d394c71883',
  'photo-1600566753086-00f18fb6b3ea', 'photo-1600566753190-17f0baa2a6c3', 'photo-1600566752355-35792bedcfea',
  'photo-1600585154363-67eb9e2e2099', 'photo-1600566752734-d1d394c71883', 'photo-1600566753086-00f18fb6b3ea',
  'photo-1600566753190-17f0baa2a6c3', 'photo-1600566753376-12c8ab7fb75b', 'photo-1600573472549-de0bb2e5a04d',
  'photo-1600585154340-be6161a56a0c', 'photo-1600585154363-67eb9e2e2099', 'photo-1600596542815-ffad4c1539a9',
  'photo-1586023492125-27b2c045efd7', 'photo-1600047509807-ba8f99d2cdde', 'photo-1600210492486-724fe5c67fb0',
  'photo-1600210492493-0946911123ea', 'photo-1600566752355-35792bedcfea', 'photo-1600566752734-d1d394c71883',
  'photo-1600566753086-00f18fb6b3ea', 'photo-1600566753190-17f0baa2a6c3', 'photo-1600566753376-12c8ab7fb75b',
  'photo-1600573472549-de0bb2e5a04d', 'photo-1600585154340-be6161a56a0c', 'photo-1600585154363-67eb9e2e2099',
  'photo-1600596542815-ffad4c1539a9', 'photo-1600607687644-aac4cc92b3ec', 'photo-1600607687920-4e2a09cf159d',
  'photo-1600607687939-ce8a6c25118c', 'photo-1568605114967-8130f3a36994', 'photo-1560448204-e02f11c3d0e2',
  'photo-1570129477492-45c003edd2be', 'photo-1493663284031-b7e3adf4808e', 'photo-1494526585095-c41746248156',
  'photo-1512917774080-9991f1c4c750', 'photo-1513584684374-8bab748fbf90', 'photo-1516455207990-7a41ce80f7ee',
  'photo-1520637836862-4d197d17c18a', 'photo-1549517045-bc93de075e53', 'photo-1554995207-c18c203602cb',
  'photo-1558618666-fcd25c85cd64', 'photo-1564013799919-ab600027ffc6', 'photo-1565538810643-b5bdb714032a',
  'photo-1572120360610-d971b9d7767c', 'photo-1582407947304-fd86f028f716', 'photo-1583608205776-bfd35f0d9f83',
  'photo-1586023492125-27b2c045efd7', 'photo-1588854337236-6889d631faa8', 'photo-1592595896616-c37162298647',
  'photo-1600047509807-ba8f99d2cdde', 'photo-1600210492486-724fe5c67fb0', 'photo-1600210492493-0946911123ea',
  'photo-1600566752355-35792bedcfea', 'photo-1600566752734-d1d394c71883', 'photo-1600566753086-00f18fb6b3ea',
  'photo-1600566753190-17f0baa2a6c3', 'photo-1600566753376-12c8ab7fb75b', 'photo-1600573472549-de0bb2e5a04d',
  'photo-1600585154340-be6161a56a0c', 'photo-1600585154363-67eb9e2e2099', 'photo-1600596542815-ffad4c1539a9',
  'photo-1600607687644-aac4cc92b3ec', 'photo-1600607687920-4e2a09cf159d', 'photo-1600607687939-ce8a6c25118c',
  'photo-1601760562234-9814eea6663a', 'photo-1605276373954-0c4a0dac5cc0', 'photo-1613490493576-7fde63acd811',
  'photo-1613977257363-707ba9348227', 'photo-1616486338812-3dadae4b4ace', 'photo-1628744448840-55bdb2497bd4',
  'photo-1630699144867-37acec97df5a', 'photo-1631049307264-da0ec9d70304', 'photo-1631049421857-465af1e3a12d',
  'photo-1633505322744-5f9ad47651e4', 'photo-1636378885639-0e1c59bf89b5', 'photo-1640806846959-5dd39e0965e6',
  'photo-1641141635536-4df51b82e7c6', 'photo-1648737154547-b0dfd281c51e', 'photo-1653408400813-6e0beacbedf9',
  'photo-1658967742784-b7b9b7c7b6b4', 'photo-1663652655806-d35066b5e25c', 'photo-1668123212115-27b5ec12c0f3',
  'photo-1669635038962-54baa9ad4b52', 'photo-1672144001889-d3e863d23598', 'photo-1675788324158-4b48ac1da40c',
  'photo-1679678691006-0ad24fecb769', 'photo-1683009427666-340595e57e43', 'photo-1684181395845-9db6e46da58d',
  'photo-1686848686543-43c3f0b5c7f3', 'photo-1689847982408-5f93b5b91b63', 'photo-1691845654555-5f2f2b7de0f4',
  'photo-1694008321322-d651b90b5a2b', 'photo-1696004432525-0fe8ea2fa2b1', 'photo-1697888850736-2e8efef52b51',
  'photo-1699023543461-9b5f616b62ed', 'photo-1700158391234-12f4e6e7d89a', 'photo-1701234856789-0a1b2c3d4e5f',
  'photo-1702345967890-1b2c3d4e5f6a', 'photo-1703456678901-2c3d4e5f6a7b', 'photo-1704567789012-3d4e5f6a7b8c'
];

const getRandomElement = <T>(array: readonly T[]): T => array[Math.floor(Math.random() * array.length)];
const getRandomElements = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const mockProperties: Property[] = Array.from({ length: 100 }, (_, index) => {
  const area = getRandomElement(dublinAreas);
  const agent = getRandomElement(agents);
  const propertyType = getRandomElement(propertyTypes);
  const status = getRandomElement(statuses);
  const houseNumber = Math.floor(Math.random() * 199) + 1;
  const street = getRandomElement(dublinStreets);
  const address = `${houseNumber} ${street}`;
  
  // Price ranges based on property type (in Euros)
  const priceRanges = {
    'house': [450000, 1800000],
    'apartment': [280000, 850000],
    'townhouse': [380000, 1200000],
    'duplex': [550000, 2200000]
  };
  
  const [minPrice, maxPrice] = priceRanges[propertyType];
  const price = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);
  
  // Bedrooms and bathrooms based on property type
  const bedroomOptions = propertyType === 'apartment' ? [1, 2, 3] : [2, 3, 4, 5, 6];
  const bedrooms = getRandomElement(bedroomOptions);
  const bathrooms = Math.max(1, bedrooms - Math.floor(Math.random() * 2));
  
  // Square meters (instead of square feet)
  const sqmBase = propertyType === 'apartment' ? 55 : 85;
  const squareMeters = sqmBase + (bedrooms * 25) + Math.floor(Math.random() * 40);
  
  // Convert to square feet for compatibility
  const squareFeet = Math.round(squareMeters * 10.764);
  
  // Lot size in acres (Irish properties often have smaller gardens)
  const lotSize = propertyType === 'apartment' ? 
    0.02 + Math.random() * 0.05 : 
    0.05 + Math.random() * 0.25;
  
  // Year built (Dublin has many period properties)
  const yearBuilt = 1850 + Math.floor(Math.random() * 174); // 1850-2024
  
  // Days on market
  const daysOnMarket = status === 'sold' ? 
    Math.floor(Math.random() * 90) + 45 : 
    Math.floor(Math.random() * 150) + 1;
  
  // Listing date
  const listingDate = new Date();
  listingDate.setDate(listingDate.getDate() - daysOnMarket);
  
  // Created and updated dates
  const createdAt = new Date(listingDate);
  createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
  
  const updatedAt = new Date(listingDate);
  updatedAt.setDate(updatedAt.getDate() + Math.floor(Math.random() * 10));
  
  return {
    id: `${index + 1}`,
    mlsId: `DUB${String(index + 1).padStart(3, '0')}`,
    address,
    city: area.name,
    state: area.county,
    zipCode: area.eircode,
    price,
    bedrooms,
    bathrooms,
    squareFeet,
    lotSize: Math.round(lotSize * 100) / 100,
    yearBuilt,
    propertyType,
    status,
    listingDate,
    daysOnMarket,
    description: getRandomElement(dublinDescriptions),
    features: getRandomElements(dublinFeatures, 3 + Math.floor(Math.random() * 5)),
    images: [`https://images.unsplash.com/${photoIds[index % photoIds.length]}?w=800&h=600&fit=crop&auto=format&q=80`],
    agent,
    createdAt,
    updatedAt
  };
});