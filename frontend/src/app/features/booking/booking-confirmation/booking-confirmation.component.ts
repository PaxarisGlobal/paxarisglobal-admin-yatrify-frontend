import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';

@Component({
  standalone: false,
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.scss']
})
export class BookingConfirmationComponent implements OnInit {
  booking: Booking | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    const ref = this.route.snapshot.paramMap.get('reference');
    if (ref) {
      this.bookingService.getBookingByReference(ref).subscribe({
        next: (b) => { this.booking = b; this.isLoading = false; },
        error: () => { this.isLoading = false; }
      });
    }
  }
}
