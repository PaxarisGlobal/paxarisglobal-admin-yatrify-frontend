import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../../core/services/trip.service';
import { Trip } from '../../../core/models/trip.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: false,
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  trip: Trip | null = null;
  isLoading = true;
  selectedTab = 0;
  numAdults = 1;
  numChildren = 0;
  isAuthenticated = false;
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.tripService.getTripBySlug(slug).subscribe({
        next: (trip) => { this.trip = trip; this.isLoading = false; },
        error: () => { this.isLoading = false; this.router.navigate(['/trips']); }
      });
    }
  }

  get totalPrice(): number {
    if (!this.trip) return 0;
    const adultTotal = this.trip.pricePerPerson * this.numAdults;
    const childTotal = (this.trip.childPrice || this.trip.pricePerPerson * 0.7) * this.numChildren;
    return adultTotal + childTotal;
  }

  get effectivePrice(): number {
    if (!this.trip) return 0;
    return this.trip.discountPercentage > 0
      ? this.trip.pricePerPerson * (1 - this.trip.discountPercentage / 100)
      : this.trip.pricePerPerson;
  }

  bookNow(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.router.navigate(['/booking'], {
      queryParams: {
        tripId: this.trip?.id,
        adults: this.numAdults,
        children: this.numChildren
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  }

  shareTrip(): void {
    if (navigator.share) {
      navigator.share({ title: this.trip?.title, url: window.location.href });
    }
  }
}
