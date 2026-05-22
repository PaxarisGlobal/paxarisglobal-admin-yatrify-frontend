import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../../core/services/trip.service';
import { AiService } from '../../../core/services/ai.service';

@Component({
  standalone: false,
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss']
})
export class CreateTripComponent {
  currentStep = 1;
  isSubmitting = false;
  isGeneratingAI = false;

  basicForm: FormGroup;
  priceForm: FormGroup;
  itineraryForm: FormGroup;

  readonly TRIP_TYPES = [
    { value: 'RELIGIOUS', label: '🛕 Religious' },
    { value: 'HONEYMOON', label: '💍 Honeymoon' },
    { value: 'FAMILY', label: '👨‍👩‍👧 Family' },
    { value: 'ADVENTURE', label: '🏔️ Adventure' },
    { value: 'BACHELOR', label: '🎉 Bachelor' },
    { value: 'WELLNESS', label: '🧘 Wellness' },
    { value: 'SOLO', label: '🎒 Solo' },
  ];

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private aiService: AiService,
    public router: Router
  ) {
    this.basicForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      tripType: ['', Validators.required],
      description: ['', Validators.required],
      shortDescription: [''],
      destinations: ['', Validators.required],
      durationDays: [5, Validators.required],
      durationNights: [4, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      registrationDeadline: ['', Validators.required],
      departureCity: ['', Validators.required],
      totalSeats: [30, Validators.required],
    });

    this.priceForm = this.fb.group({
      pricePerPerson: ['', Validators.required],
      basePrice: ['', Validators.required],
      childPrice: [''],
      discountPercentage: [0],
      inclusions: [''],
      exclusions: [''],
      highlights: [''],
      cancellationPolicy: [''],
    });

    this.itineraryForm = this.fb.group({
      days: this.fb.array([])
    });
  }

  get daysArray(): FormArray {
    return this.itineraryForm.get('days') as FormArray;
  }

  addDay(): void {
    this.daysArray.push(this.fb.group({
      title: ['', Validators.required],
      description: [''],
      activities: [''],
    }));
  }

  generateWithAI(): void {
    const basic = this.basicForm.value;
    if (!basic.destinations || !basic.tripType) return;
    this.isGeneratingAI = true;

    this.aiService.generateItinerary(
      basic.destinations, basic.durationDays, basic.tripType, ''
    ).subscribe({
      next: (res) => {
        this.isGeneratingAI = false;
        // Parse and populate
        const lines = res.message.split('\n').filter(l => l.trim());
        this.daysArray.clear();
        for (let i = 0; i < basic.durationDays; i++) {
          this.daysArray.push(this.fb.group({
            title: [`Day ${i + 1} - Exploration`],
            description: [lines[i] || ''],
            activities: [''],
          }));
        }
      },
      error: () => { this.isGeneratingAI = false; }
    });
  }

  submitTrip(): void {
    this.isSubmitting = true;
    const basic = this.basicForm.value;
    const price = this.priceForm.value;

    const payload = {
      ...basic,
      ...price,
      destinations: basic.destinations.split(',').map((d: string) => d.trim()),
      inclusions: price.inclusions ? price.inclusions.split('\n').filter((s: string) => s.trim()) : [],
      exclusions: price.exclusions ? price.exclusions.split('\n').filter((s: string) => s.trim()) : [],
      highlights: price.highlights ? price.highlights.split('\n').filter((s: string) => s.trim()) : [],
      itineraries: this.daysArray.value.map((day: any, i: number) => ({
        dayNumber: i + 1,
        title: day.title,
        description: day.description,
        activities: day.activities ? day.activities.split('\n').filter((a: string) => a.trim()) : [],
      })),
    };

    this.tripService.createTrip(payload).subscribe({
      next: (trip) => {
        this.router.navigate(['/organizer/dashboard']);
      },
      error: () => { this.isSubmitting = false; }
    });
  }
}
