export interface Trip {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  tripType: TripType;
  subType?: string;
  destinations: string[];
  coverImageUrl: string;
  galleryImages?: string[];
  durationDays: number;
  durationNights: number;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  departureCity: string;
  departureLocation?: string;
  totalSeats: number;
  availableSeats: number;
  pricePerPerson: number;
  basePrice: number;
  childPrice?: number;
  infantPrice?: number;
  discountPercentage: number;
  gstPercentage: number;
  currency: string;
  inclusions?: string[];
  exclusions?: string[];
  termsAndConditions?: string;
  cancellationPolicy?: string;
  highlights?: string[];
  languagesSpoken?: string[];
  difficultyLevel: DifficultyLevel;
  ageRestrictionMin?: number;
  ageRestrictionMax?: number;
  isVisaRequired?: boolean;
  isInternational?: boolean;
  status: TripStatus;
  isFeatured?: boolean;
  isTrending?: boolean;
  rating: number;
  totalReviews: number;
  totalBookings: number;
  viewCount?: number;
  organizer?: OrganizerSummary;
  itineraries?: TripItinerary[];
  hotels?: TripHotel[];
  isAvailable?: boolean;
  isWishlisted?: boolean;
  createdAt?: string;
}

export interface OrganizerSummary {
  id: string;
  organizationName: string;
  logoUrl?: string;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
}

export interface TripItinerary {
  id: string;
  dayNumber: number;
  title: string;
  description?: string;
  activities?: string[];
  meals?: { breakfast?: boolean; lunch?: boolean; dinner?: boolean };
  accommodation?: string;
  transport?: string;
  imageUrl?: string;
}

export interface TripHotel {
  id: string;
  hotelName: string;
  city?: string;
  starRating?: number;
  checkInDay?: number;
  checkOutDay?: number;
  roomType?: string;
  imageUrl?: string;
}

export type TripType = 'RELIGIOUS' | 'HONEYMOON' | 'BACHELOR' | 'FAMILY' | 'ADVENTURE' | 'SOLO' | 'CORPORATE' | 'EDUCATIONAL' | 'WELLNESS';
export type TripStatus = 'DRAFT' | 'PUBLISHED' | 'SOLD_OUT' | 'CANCELLED' | 'COMPLETED';
export type DifficultyLevel = 'EASY' | 'MODERATE' | 'CHALLENGING' | 'EXTREME';

export interface TripSearchFilter {
  keyword?: string;
  tripType?: TripType;
  departureCity?: string;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export const TRIP_TYPE_CONFIG: Record<TripType, { label: string; icon: string; color: string; emoji: string }> = {
  RELIGIOUS: { label: 'Religious', icon: 'temple_hindu', color: '#f59e0b', emoji: '🛕' },
  HONEYMOON: { label: 'Honeymoon', icon: 'favorite', color: '#ec4899', emoji: '💍' },
  BACHELOR: { label: 'Bachelor', icon: 'celebration', color: '#8b5cf6', emoji: '🎉' },
  FAMILY: { label: 'Family', icon: 'family_restroom', color: '#10b981', emoji: '👨‍👩‍👧‍👦' },
  ADVENTURE: { label: 'Adventure', icon: 'hiking', color: '#f97316', emoji: '🏔️' },
  SOLO: { label: 'Solo', icon: 'person', color: '#3b82f6', emoji: '🎒' },
  CORPORATE: { label: 'Corporate', icon: 'business', color: '#6b7280', emoji: '💼' },
  EDUCATIONAL: { label: 'Educational', icon: 'school', color: '#14b8a6', emoji: '📚' },
  WELLNESS: { label: 'Wellness', icon: 'spa', color: '#84cc16', emoji: '🧘' },
};
