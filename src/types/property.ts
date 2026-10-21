export type PropertyPurpose = 'sale' | 'rent';

export type PropertyType = 'house' | 'flat' | 'plot' | 'shop' | 'land' | 'hotel';

export type AreaUnit = 'Marla' | 'Kanal' | 'Sq. Ft.';

export interface PropertyListing {
  id: string;
  slug: string;
  title: string;
  titleUrdu: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  price: number; // in PKR
  priceFormatted: string;
  areaValue: number;
  areaUnit: AreaUnit;
  beds?: number;
  baths?: number;
  parking?: number;
  furnished: boolean | 'Semi-Furnished';
  location: string;
  areaName: string; // e.g. "Mingora", "Kalam", "Malam Jabba", "Saidu Sharif", "Fizagat", "Madyan", "Bahrain", "Kabal", "Matta", "Charbagh"
  address: string;
  description: string;
  descriptionUrdu: string;
  features: string[];
  images: string[];
  contactPhone: string;
  whatsapp: string;
  postedDate: string;
  isFeatured: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface AreaInfo {
  id: string;
  slug: string;
  name: string;
  nameUrdu: string;
  tagline: string;
  image: string;
  description: string;
  elevation: string;
  distanceFromMingora: string;
  popularFor: string[];
  priceRangeSale: string;
  priceRangeRent: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleUrdu: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  category: string;
  image: string;
  tags: string[];
  content: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  rating: number;
  comment: string;
  commentUrdu: string;
  avatar: string;
  propertyPurchased: string;
}

export interface FaqItem {
  question: string;
  questionUrdu: string;
  answer: string;
  answerUrdu: string;
  category: 'Buying' | 'Selling' | 'Renting' | 'Overseas' | 'Legal';
}

export interface FilterState {
  purpose: PropertyPurpose | 'all';
  type: PropertyType | 'all';
  areaName: string;
  minPrice: number;
  maxPrice: number;
  beds: number | 'any';
  furnished: 'any' | 'yes' | 'no';
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high';
  searchQuery: string;
}
