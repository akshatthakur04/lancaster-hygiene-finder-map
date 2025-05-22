
export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  latitude: number;
  longitude: number;
  hygieneRating: number;
  lastInspection: string;
  cuisine: string;
  priceRange: string;
  description: string;
  phone?: string;
  website?: string;
  openingHours?: {
    [day: string]: string;
  };
  reviews?: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FilterOptions {
  minRating: number;
  cuisine: string | null;
  priceRange: string | null;
}
