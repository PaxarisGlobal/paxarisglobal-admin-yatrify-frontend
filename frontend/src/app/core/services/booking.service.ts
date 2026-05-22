import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, PageResponse } from './api.service';
import { Booking, CreateBookingRequest } from '../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private api: ApiService) {}

  createBooking(request: CreateBookingRequest): Observable<Booking> {
    return this.api.post<Booking>('/bookings', request);
  }

  getMyBookings(page = 0, size = 10): Observable<PageResponse<Booking>> {
    return this.api.get<PageResponse<Booking>>('/bookings/my-bookings', { page, size });
  }

  getBookingByReference(reference: string): Observable<Booking> {
    return this.api.get<Booking>(`/bookings/reference/${reference}`);
  }

  cancelBooking(id: string, reason: string): Observable<Booking> {
    return this.api.post<Booking>(`/bookings/${id}/cancel`, { reason });
  }

  initiatePayment(bookingId: string): Observable<any> {
    return this.api.post<any>(`/payments/initiate/${bookingId}`);
  }

  verifyPayment(orderId: string, paymentId: string, signature: string): Observable<any> {
    return this.api.post<any>('/payments/verify', { orderId, paymentId, signature });
  }
}
