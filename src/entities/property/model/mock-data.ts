import { Property } from './types';

const agents = [
  { id: 'user1', name: 'Sarah Thompson', phone: '(555) 123-4567', email: 'sarah@cozymls.com' },
  { id: 'user2', name: 'Mike Johnson', phone: '(555) 234-5678', email: 'mike@cozymls.com' },
  { id: 'user3', name: 'Emily Davis', phone: '(555) 345-6789', email: 'emily@cozymls.com' },
  { id: 'user4', name: 'David Rodriguez', phone: '(555) 456-7890', email: 'david@cozymls.com' },
  { id: 'user5', name: 'Lisa Chen', phone: '(555) 567-8901', email: 'lisa@cozymls.com' },
  { id: 'user6', name: 'James Wilson', phone: '(555) 678-9012', email: 'james@cozymls.com' },
  { id: 'user7', name: 'Amanda Foster', phone: '(555) 789-0123', email: 'amanda@cozymls.com' },
  { id: 'user8', name: 'Robert Kim', phone: '(555) 890-1234', email: 'robert@cozymls.com' },
  { id: 'user9', name: 'Jennifer Martinez', phone: '(555) 901-2345', email: 'jennifer@cozymls.com' },
  { id: 'user10', name: 'Michael Brown', phone: '(555) 012-3456', email: 'michael@cozymls.com' }
];

const cities = [
  { name: 'San Francisco', state: 'CA', zip: '94102' },
  { name: 'Oakland', state: 'CA', zip: '94610' },
  { name: 'Berkeley', state: 'CA', zip: '94704' },
  { name: 'Palo Alto', state: 'CA', zip: '94301' },
  { name: 'San Jose', state: 'CA', zip: '95110' },
  { name: 'Mountain View', state: 'CA', zip: '94041' },
  { name: 'Sunnyvale', state: 'CA', zip: '94085' },
  { name: 'Fremont', state: 'CA', zip: '94536' },
  { name: 'Hayward', state: 'CA', zip: '94541' },
  { name: 'Union City', state: 'CA', zip: '94587' },
  { name: 'Redwood City', state: 'CA', zip: '94061' },
  { name: 'Daly City', state: 'CA', zip: '94014' }
];

const streets = [
  'Oak Street', 'Pine Avenue', 'Elm Drive', 'Maple Lane', 'Cedar Boulevard',
  'Birch Way', 'Willow Court', 'Ash Street', 'Poplar Avenue', 'Spruce Drive',
  'Walnut Lane', 'Cherry Boulevard', 'Magnolia Way', 'Hickory Court', 'Cypress Street',
  'Redwood Avenue', 'Sequoia Drive', 'Laurel Lane', 'Jasmine Boulevard', 'Rose Way'
];

const propertyTypes = ['single-family', 'condo', 'townhouse', 'multi-family'] as const;
const statuses = ['active', 'pending', 'sold'] as const;

const features = [
  'Hardwood Floors', 'Updated Kitchen', 'Garden', 'Parking', 'Bay Views', 'Modern Kitchen',
  'In-unit Laundry', 'Gym Access', 'Large Backyard', 'Updated Bathrooms', 'Near Schools',
  'Deck', 'Pool', 'Fireplace', 'Walk-in Closet', 'Granite Counters', 'Stainless Appliances',
  'Central Air', 'High Ceilings', 'Balcony', 'Storage', 'Pet Friendly', 'Elevator',
  'Security System', 'Solar Panels', 'Smart Home', 'Wine Cellar', 'Home Office'
];

const descriptions = [
  'Beautiful Victorian home with original hardwood floors and modern updates.',
  'Modern condo with stunning bay views and premium finishes throughout.',
  'Spacious family home with large backyard and updated amenities.',
  'Charming craftsman style home with original details and character.',
  'Contemporary townhouse with open floor plan and designer finishes.',
  'Elegant colonial home with mature landscaping and premium location.',
  'Luxurious penthouse with panoramic city views and top-tier amenities.',
  'Cozy cottage style home perfect for first-time buyers.',
  'Investment opportunity with multiple units and stable rental income.',
  'Historic property with period features and modern conveniences.'
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
  const city = getRandomElement(cities);
  const agent = getRandomElement(agents);
  const propertyType = getRandomElement(propertyTypes);
  const status = getRandomElement(statuses);
  const houseNumber = Math.floor(Math.random() * 9999) + 1;
  const street = getRandomElement(streets);
  const address = `${houseNumber} ${street}`;
  
  // Price ranges based on property type
  const priceRanges = {
    'single-family': [800000, 2500000],
    'condo': [500000, 1500000],
    'townhouse': [600000, 1800000],
    'multi-family': [1000000, 3500000]
  };
  
  const [minPrice, maxPrice] = priceRanges[propertyType];
  const price = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);
  
  // Bedrooms and bathrooms based on property type
  const bedroomOptions = propertyType === 'condo' ? [1, 2, 3] : [2, 3, 4, 5, 6];
  const bedrooms = getRandomElement(bedroomOptions);
  const bathrooms = Math.max(1, bedrooms - Math.floor(Math.random() * 2));
  
  // Square footage
  const sqftBase = propertyType === 'condo' ? 800 : 1200;
  const squareFeet = sqftBase + (bedrooms * 400) + Math.floor(Math.random() * 800);
  
  // Lot size (condos have smaller lots)
  const lotSize = propertyType === 'condo' ? 
    0.05 + Math.random() * 0.1 : 
    0.1 + Math.random() * 0.4;
  
  // Year built
  const yearBuilt = 1960 + Math.floor(Math.random() * 64); // 1960-2024
  
  // Days on market
  const daysOnMarket = status === 'sold' ? 
    Math.floor(Math.random() * 60) + 30 : 
    Math.floor(Math.random() * 120) + 1;
  
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
    mlsId: `MLS${String(index + 1).padStart(3, '0')}`,
    address,
    city: city.name,
    state: city.state,
    zipCode: city.zip,
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
    description: getRandomElement(descriptions),
    features: getRandomElements(features, 3 + Math.floor(Math.random() * 5)),
    images: [`https://images.unsplash.com/${photoIds[index]}`],
    agent,
    createdAt,
    updatedAt
  };
});