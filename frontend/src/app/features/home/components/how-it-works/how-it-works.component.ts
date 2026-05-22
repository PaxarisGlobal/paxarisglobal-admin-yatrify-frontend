import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent {
  activeTab: 'traveler' | 'organizer' = 'traveler';

  readonly TRAVELER_STEPS = [
    {
      step: 1, icon: 'search', color: '#3b82f6',
      title: 'Discover Trips',
      description: 'Browse thousands of curated trips by type, destination, price, and dates. Use our AI assistant Yatri for personalized recommendations.'
    },
    {
      step: 2, icon: 'how_to_reg', color: '#10b981',
      title: 'Register & Verify',
      description: 'Create your account in under 2 minutes. Upload your Aadhaar card for verification to access all features.'
    },
    {
      step: 3, icon: 'confirmation_number', color: '#f59e0b',
      title: 'Book Your Trip',
      description: 'Select seats, add traveler details, and book in just a few taps. Secure payment via UPI, card, or net banking.'
    },
    {
      step: 4, icon: 'luggage', color: '#ef4444',
      title: 'Pack & Go!',
      description: 'Receive confirmation instantly. Get trip updates, itinerary details, and 24/7 support until you\'re back home.'
    }
  ];

  readonly ORGANIZER_STEPS = [
    {
      step: 1, icon: 'app_registration', color: '#8b5cf6',
      title: 'Register as Organizer',
      description: 'Create your organizer profile with organization details. Individual, agency, or trust — all are welcome.'
    },
    {
      step: 2, icon: 'verified_user', color: '#10b981',
      title: 'Get Verified',
      description: 'Submit your GSTIN, PAN, and ID documents. Our team verifies within 2-3 business days.'
    },
    {
      step: 3, icon: 'add_circle', color: '#f59e0b',
      title: 'Create Your Trip',
      description: 'Use our intuitive trip creator or let our AI assistant generate itineraries. Set pricing, capacity, and dates.'
    },
    {
      step: 4, icon: 'payments', color: '#ef4444',
      title: 'Earn & Grow',
      description: 'Manage bookings, track payments, and build your reputation. Get paid directly to your bank account.'
    }
  ];
}
