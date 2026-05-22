export interface UserProfile {
  id: string;
  genericUserId: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  profilePictureUrl?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  preferredLanguage?: string;
  accessibilityNeeds?: string;
  bio?: string;
  travelPreferences?: string[];
  isVerified?: boolean;
  verificationStatus?: 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED';
  onboardingCompleted?: boolean;
  isActive?: boolean;
  createdAt?: string;
}

export interface OrganizerProfile {
  id: string;
  userProfileId: string;
  organizationName: string;
  organizationType: 'INDIVIDUAL' | 'AGENCY' | 'NGO' | 'TEMPLE_TRUST' | 'CORPORATE';
  gstin?: string;
  panNumber?: string;
  website?: string;
  description?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  isVerified?: boolean;
  verificationStatus?: 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED';
  verificationNotes?: string;
  rating?: number;
  totalReviews?: number;
  totalTripsConducted?: number;
  isActive?: boolean;
  ownerName?: string;
  ownerEmail?: string;
  createdAt?: string;
}

export interface AuthUser {
  genericUserId: string;
  email: string;
  firstName: string;
  lastName?: string;
  roles: string[];
  token: string;
  profilePictureUrl?: string;
}
