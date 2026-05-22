import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../../core/services/trip.service';
import { BookingService } from '../../../core/services/booking.service';
import { Trip } from '../../../core/models/trip.model';

declare var Razorpay: any;

@Component({
  standalone: false,
  selector: 'app-booking-flow',
  templateUrl: './booking-flow.component.html',
  styleUrls: ['./booking-flow.component.scss']
})
export class BookingFlowComponent implements OnInit {
  trip: Trip | null = null;
  isLoading = true;
  currentStep = 1;
  numAdults = 1;
  numChildren = 0;
  Math = Math;

  travelerForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private tripService: TripService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.numAdults = +(this.route.snapshot.queryParams['adults'] || 1);
    this.numChildren = +(this.route.snapshot.queryParams['children'] || 0);
    const tripId = this.route.snapshot.queryParams['tripId'];

    this.initForms();

    if (tripId) {
      this.tripService.getTripBySlug(tripId).subscribe({
        next: (trip) => { this.trip = trip; this.isLoading = false; this.buildTravelerForms(); },
        error: () => { this.isLoading = false; }
      });
    }
  }

  private initForms(): void {
    this.travelerForm = this.fb.group({ travelers: this.fb.array([]) });
  }

  private buildTravelerForms(): void {
    const travelers = this.travelerForm.get('travelers') as FormArray;
    for (let i = 0; i < this.numAdults; i++) {
      travelers.push(this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        dateOfBirth: [''],
        gender: ['MALE'],
        travelerType: ['ADULT'],
        idType: ['AADHAAR'],
        idNumber: [''],
        dietaryPreference: ['VEG'],
      }));
    }
    for (let i = 0; i < this.numChildren; i++) {
      travelers.push(this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        dateOfBirth: ['', Validators.required],
        gender: ['MALE'],
        travelerType: ['CHILD'],
      }));
    }
  }

  get travelersArray(): FormArray {
    return this.travelerForm.get('travelers') as FormArray;
  }

  get totalAmount(): number {
    if (!this.trip) return 0;
    const ep = this.trip.discountPercentage > 0
      ? this.trip.pricePerPerson * (1 - this.trip.discountPercentage / 100)
      : this.trip.pricePerPerson;
    return ep * this.numAdults + (this.trip.childPrice || ep * 0.7) * this.numChildren;
  }

  confirmAndPay(): void {
    if (!this.trip || this.travelerForm.invalid) return;
    this.isSubmitting = true;

    this.bookingService.createBooking({
      tripId: this.trip.id,
      numAdults: this.numAdults,
      numChildren: this.numChildren,
      numInfants: 0,
      travelers: this.travelersArray.value,
    }).subscribe({
      next: (booking) => {
        this.bookingService.initiatePayment(booking.id).subscribe({
          next: (paymentData) => {
            this.openRazorpay(paymentData, booking.bookingReference);
          },
          error: () => { this.isSubmitting = false; }
        });
      },
      error: () => { this.isSubmitting = false; }
    });
  }

  private openRazorpay(paymentData: any, bookingRef: string): void {
    const options = {
      key: paymentData.gatewayData?.keyId,
      amount: paymentData.gatewayData?.amount,
      currency: 'INR',
      order_id: paymentData.gatewayData?.orderId,
      name: 'Yatrify',
      description: this.trip?.title,
      handler: (response: any) => {
        this.bookingService.verifyPayment(
          response.razorpay_order_id,
          response.razorpay_payment_id,
          response.razorpay_signature
        ).subscribe({
          next: () => this.router.navigate(['/booking/confirmation', bookingRef]),
          error: () => { this.isSubmitting = false; }
        });
      },
      prefill: {},
      theme: { color: '#E35B2A' },
      modal: { ondismiss: () => { this.isSubmitting = false; } }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  }
}
