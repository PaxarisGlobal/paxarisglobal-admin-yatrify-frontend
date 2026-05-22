import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Trip, TRIP_TYPE_CONFIG } from '../../../core/models/trip.model';

@Component({
  standalone: false,
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss']
})
export class TripCardComponent {
  @Input() trip!: Trip;

  constructor(private router: Router) {}

  navigate(): void {
    this.router.navigate(['/trips', this.trip.slug || this.trip.id]);
  }

  get tripTypeConfig() {
    return TRIP_TYPE_CONFIG[this.trip.tripType] || { label: this.trip.tripType, emoji: '🌏', color: '#gray' };
  }

  get discountedPrice(): number {
    if (this.trip.discountPercentage > 0) {
      return this.trip.pricePerPerson * (1 - this.trip.discountPercentage / 100);
    }
    return this.trip.pricePerPerson;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  }

  get seatsLeft(): string {
    if (this.trip.availableSeats <= 5) return `Only ${this.trip.availableSeats} left!`;
    if (this.trip.availableSeats <= 20) return `${this.trip.availableSeats} seats left`;
    return '';
  }

  get durationLabel(): string {
    return `${this.trip.durationDays}D / ${this.trip.durationNights}N`;
  }
}
