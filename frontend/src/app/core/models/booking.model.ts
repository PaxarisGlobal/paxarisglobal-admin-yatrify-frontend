export interface Booking {
  id: string;
  bookingReference: string;
  trip?: BookingTripSummary;
  numAdults: number;
  numChildren: number;
  numInfants: number;
  totalTravelers: number;
  baseAmount: number;
  discountAmount: number;
  gstAmount: number;
  totalAmount: number;
  amountPaid: number;
  status: BookingStatus;
  specialRequests?: string;
  cancellationReason?: string;
  cancelledAt?: string;
  confirmedAt?: string;
  travelers?: Traveler[];
  createdAt: string;
}

export interface BookingTripSummary {
  id: string;
  title: string;
  coverImageUrl?: string;
  startDate: string;
  endDate: string;
  departureCity?: string;
  destinations: string[];
  organizerName?: string;
}

export interface Traveler {
  id: string;
  firstName: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  travelerType: 'ADULT' | 'CHILD' | 'INFANT';
  idType?: string;
  idNumber?: string;
  dietaryPreference?: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'REFUNDED';

export interface CreateBookingRequest {
  tripId: string;
  numAdults: number;
  numChildren: number;
  numInfants: number;
  travelers: TravelerRequest[];
  specialRequests?: string;
}

export interface TravelerRequest {
  firstName: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  travelerType: string;
  idType?: string;
  idNumber?: string;
  dietaryPreference?: string;
  medicalConditions?: string;
}
