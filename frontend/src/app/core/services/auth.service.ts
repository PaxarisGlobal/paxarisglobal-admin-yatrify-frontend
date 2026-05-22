import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AuthResponse, LoginRequest, SignupRequest } from '../models/auth.model';
import { AuthUser, UserProfile } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  constructor(private api: ApiService, private router: Router) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const stored = localStorage.getItem('yatrify_user');
    if (stored) {
      try {
        const user = JSON.parse(stored) as AuthUser;
        this.currentUserSubject.next(user);
      } catch {
        localStorage.removeItem('yatrify_user');
      }
    }
  }

  /** Signup via Yatrify backend → Paxaris create user + assign role + login */
  signup(request: SignupRequest): Observable<UserProfile> {
    return this.api.post<AuthResponse>('/auth/signup', request).pipe(
      tap(auth => this.applyAuthResponse(auth)),
      switchMap(() => this.syncProfileAfterAuth(request.phone))
    );
  }

  /** Login via Yatrify backend → Paxaris Keycloak login */
  login(request: LoginRequest): Observable<UserProfile> {
    return this.api.post<AuthResponse>('/auth/login', request).pipe(
      tap(auth => this.applyAuthResponse(auth)),
      switchMap(() => this.syncProfileAfterAuth())
    );
  }

  /** After become-organizer: refresh JWT with organizer roles */
  applyAuthResponse(auth: AuthResponse): void {
    const authUser: AuthUser = {
      genericUserId: auth.genericUserId,
      email: auth.email,
      firstName: auth.firstName,
      lastName: auth.lastName,
      roles: auth.roles || [],
      token: auth.token,
    };
    localStorage.setItem('yatrify_token', auth.token);
    localStorage.setItem('yatrify_user', JSON.stringify(authUser));
    this.currentUserSubject.next(authUser);
  }

  private syncProfileAfterAuth(phone?: string): Observable<UserProfile> {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('No authenticated user');
    }
    return this.api.post<UserProfile>('/users/sync', {
      genericUserId: user.genericUserId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone,
    }).pipe(tap(profile => this.userProfileSubject.next(profile)));
  }

  /**
   * Called after successful login from generic platform.
   * Syncs user to Yatrify and stores token.
   */
  loginWithToken(token: string, userData: Partial<AuthUser>): Observable<UserProfile> {
    const authUser: AuthUser = {
      genericUserId: userData.genericUserId!,
      email: userData.email!,
      firstName: userData.firstName!,
      lastName: userData.lastName,
      roles: userData.roles || [],
      token,
      profilePictureUrl: userData.profilePictureUrl,
    };

    localStorage.setItem('yatrify_token', token);
    localStorage.setItem('yatrify_user', JSON.stringify(authUser));
    this.currentUserSubject.next(authUser);

    return this.api.post<UserProfile>('/users/sync', {
      genericUserId: authUser.genericUserId,
      email: authUser.email,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      profilePictureUrl: authUser.profilePictureUrl,
    }).pipe(
      tap(profile => this.userProfileSubject.next(profile))
    );
  }

  loadUserProfile(): Observable<UserProfile | null> {
    if (!this.isAuthenticated()) return of(null);
    return this.api.get<UserProfile>('/users/me').pipe(
      tap(profile => this.userProfileSubject.next(profile)),
      catchError(() => of(null))
    );
  }

  logout(): void {
    localStorage.removeItem('yatrify_token');
    localStorage.removeItem('yatrify_user');
    this.currentUserSubject.next(null);
    this.userProfileSubject.next(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('yatrify_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  getUserProfile(): UserProfile | null {
    return this.userProfileSubject.value;
  }

  isOrganizer(): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.some(r => {
      const upper = r.toUpperCase();
      return upper.includes('ORGANIZER') || upper === 'PRODORGANIZER';
    }) ?? false;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.some(r => r.toUpperCase().includes('ADMIN')) ?? false;
  }
}
