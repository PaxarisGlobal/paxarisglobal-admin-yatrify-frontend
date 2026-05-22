export interface AuthResponse {
  token: string;
  genericUserId: string;
  email: string;
  firstName: string;
  lastName?: string;
  roles: string[];
}

export interface SignupRequest {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface OrganizerRegistrationResult {
  organizer: unknown;
  auth: AuthResponse;
}
