import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { Booking } from '../../core/models/booking.model';
import { UserProfile } from '../../core/models/user.model';

@Component({
  standalone: false,
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userProfile: UserProfile | null = null;
  bookings: Booking[] = [];
  isLoading = true;
  activeTab = 0;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.authService.userProfile$.subscribe(p => this.userProfile = p);
    this.bookingService.getMyBookings().subscribe({
      next: (res) => { this.bookings = res.content; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  cancelBooking(id: string): void {
    this.bookingService.cancelBooking(id, 'Cancelled by user').subscribe({
      next: (updated) => {
        const idx = this.bookings.findIndex(b => b.id === id);
        if (idx > -1) this.bookings[idx] = updated;
      }
    });
  }
}
