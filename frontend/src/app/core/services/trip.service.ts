import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, PageResponse } from './api.service';
import { Trip, TripSearchFilter } from '../models/trip.model';

@Injectable({ providedIn: 'root' })
export class TripService {
  constructor(private api: ApiService) {}

  getTrips(page = 0, size = 12, sortBy = 'startDate', sortDir = 'asc'): Observable<PageResponse<Trip>> {
    return this.api.get<PageResponse<Trip>>('/trips', { page, size, sortBy, sortDir });
  }

  searchTrips(filter: TripSearchFilter): Observable<PageResponse<Trip>> {
    return this.api.get<PageResponse<Trip>>('/trips/search', filter);
  }

  getTripBySlug(slug: string): Observable<Trip> {
    return this.api.get<Trip>(`/trips/${slug}`);
  }

  getFeaturedTrips(): Observable<Trip[]> {
    return this.api.get<Trip[]>('/trips/featured');
  }

  getTrendingTrips(): Observable<Trip[]> {
    return this.api.get<Trip[]>('/trips/trending');
  }

  getMyTrips(page = 0, size = 10): Observable<PageResponse<Trip>> {
    return this.api.get<PageResponse<Trip>>('/trips/my-trips', { page, size });
  }

  createTrip(data: any): Observable<Trip> {
    return this.api.post<Trip>('/trips', data);
  }

  publishTrip(id: string): Observable<Trip> {
    return this.api.post<Trip>(`/trips/${id}/publish`);
  }
}
