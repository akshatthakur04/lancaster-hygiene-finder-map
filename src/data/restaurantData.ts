
import { Restaurant } from "../types/restaurant";

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Lancaster Brasserie",
    address: "14 Market Street",
    city: "Lancaster",
    postcode: "LA1 1HY",
    latitude: 54.0471,
    longitude: -2.8037,
    hygieneRating: 5,
    lastInspection: "2023-09-15",
    cuisine: "British",
    priceRange: "££",
    description: "Modern British cuisine in a stylish setting with locally-sourced ingredients.",
    phone: "01524 123456",
    website: "https://lancasterBrasserie.example.com",
    openingHours: {
      Monday: "12:00 - 22:00",
      Tuesday: "12:00 - 22:00",
      Wednesday: "12:00 - 22:00",
      Thursday: "12:00 - 22:00",
      Friday: "12:00 - 23:00",
      Saturday: "12:00 - 23:00",
      Sunday: "12:00 - 21:00"
    },
    reviews: [
      {
        id: "r1",
        userName: "FoodLover42",
        rating: 4.5,
        comment: "Excellent food and spotlessly clean restaurant. The staff were very attentive.",
        date: "2023-10-05"
      }
    ]
  },
  {
    id: "2",
    name: "Spice Garden",
    address: "27 King Street",
    city: "Lancaster",
    postcode: "LA1 1JE",
    latitude: 54.0483,
    longitude: -2.8003,
    hygieneRating: 4,
    lastInspection: "2023-08-22",
    cuisine: "Indian",
    priceRange: "££",
    description: "Authentic Indian cuisine with a modern twist.",
    phone: "01524 234567",
    website: "https://spicegarden.example.com",
    openingHours: {
      Monday: "17:00 - 22:30",
      Tuesday: "17:00 - 22:30",
      Wednesday: "17:00 - 22:30",
      Thursday: "17:00 - 22:30",
      Friday: "17:00 - 23:00",
      Saturday: "17:00 - 23:00",
      Sunday: "17:00 - 22:00"
    }
  },
  {
    id: "3",
    name: "Bella Italia",
    address: "5 Dalton Square",
    city: "Lancaster",
    postcode: "LA1 1PP",
    latitude: 54.0497,
    longitude: -2.8021,
    hygieneRating: 5,
    lastInspection: "2023-07-10",
    cuisine: "Italian",
    priceRange: "££",
    description: "Family-friendly Italian restaurant offering pasta, pizza and classic Italian dishes.",
    phone: "01524 345678",
    website: "https://bellaitalia.example.com"
  },
  {
    id: "4",
    name: "The Green Room",
    address: "42 Penny Street",
    city: "Lancaster",
    postcode: "LA1 1XT",
    latitude: 54.0461,
    longitude: -2.8018,
    hygieneRating: 5,
    lastInspection: "2023-09-02",
    cuisine: "Vegan",
    priceRange: "££",
    description: "Plant-based cuisine in an eco-friendly setting.",
    phone: "01524 456789",
    website: "https://greenroom.example.com"
  },
  {
    id: "5",
    name: "The Waterfront",
    address: "10 St. George's Quay",
    city: "Lancaster",
    postcode: "LA1 1RD",
    latitude: 54.0514,
    longitude: -2.8046,
    hygieneRating: 4,
    lastInspection: "2023-08-05",
    cuisine: "Seafood",
    priceRange: "£££",
    description: "Fresh seafood restaurant with views of the River Lune.",
    phone: "01524 567890",
    website: "https://waterfront.example.com"
  },
  {
    id: "6",
    name: "Dragon Palace",
    address: "8 Church Street",
    city: "Lancaster",
    postcode: "LA1 1ET",
    latitude: 54.0488,
    longitude: -2.8016,
    hygieneRating: 3,
    lastInspection: "2023-06-20",
    cuisine: "Chinese",
    priceRange: "££",
    description: "Traditional Chinese cuisine in the heart of Lancaster.",
    phone: "01524 678901",
    website: "https://dragonpalace.example.com"
  },
  {
    id: "7",
    name: "The Royal Oak",
    address: "22 Market Street",
    city: "Lancaster",
    postcode: "LA1 1JG",
    latitude: 54.0479,
    longitude: -2.8031,
    hygieneRating: 5,
    lastInspection: "2023-09-25",
    cuisine: "Pub Food",
    priceRange: "££",
    description: "Historic pub serving classic British food and local ales.",
    phone: "01524 789012",
    website: "https://royaloak.example.com"
  },
  {
    id: "8",
    name: "Quick Bites",
    address: "3 Common Garden Street",
    city: "Lancaster",
    postcode: "LA1 1XD",
    latitude: 54.0472,
    longitude: -2.8012,
    hygieneRating: 2,
    lastInspection: "2023-07-18",
    cuisine: "Fast Food",
    priceRange: "£",
    description: "Fast and affordable meals on the go.",
    phone: "01524 890123"
  },
  {
    id: "9",
    name: "University Cafe",
    address: "Lancaster University",
    city: "Lancaster",
    postcode: "LA1 4YW",
    latitude: 54.0104,
    longitude: -2.7877,
    hygieneRating: 4,
    lastInspection: "2023-08-30",
    cuisine: "Cafe",
    priceRange: "£",
    description: "Campus cafe serving sandwiches, snacks and hot drinks.",
    phone: "01524 901234"
  },
  {
    id: "10",
    name: "The Riverside",
    address: "15 Lune Road",
    city: "Lancaster",
    postcode: "LA1 1QW",
    latitude: 54.0522,
    longitude: -2.8054,
    hygieneRating: 1,
    lastInspection: "2023-06-05",
    cuisine: "Mixed",
    priceRange: "££",
    description: "Varied menu with river views. Currently addressing hygiene concerns.",
    phone: "01524 012345"
  }
];

export const getHygieneColor = (rating: number): string => {
  switch(rating) {
    case 5: return "hygiene-excellent";
    case 4: return "hygiene-good";
    case 3: return "hygiene-average";
    case 2: return "hygiene-poor";
    case 1:
    default: return "hygiene-bad";
  }
};

export const getHygieneColorClass = (rating: number): string => {
  switch(rating) {
    case 5: return "bg-hygiene-excellent";
    case 4: return "bg-hygiene-good";
    case 3: return "bg-hygiene-average";
    case 2: return "bg-hygiene-poor";
    case 1:
    default: return "bg-hygiene-bad";
  }
};

export const getCuisines = (): string[] => {
  const cuisineSet = new Set<string>();
  restaurants.forEach(restaurant => {
    if (restaurant.cuisine) {
      cuisineSet.add(restaurant.cuisine);
    }
  });
  return Array.from(cuisineSet).sort();
};

export const getPriceRanges = (): string[] => {
  const priceSet = new Set<string>();
  restaurants.forEach(restaurant => {
    if (restaurant.priceRange) {
      priceSet.add(restaurant.priceRange);
    }
  });
  return Array.from(priceSet).sort();
};
