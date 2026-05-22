import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripType } from '../../../../core/models/trip.model';

@Component({
  standalone: false,
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  searchQuery = '';
  selectedTripType: TripType | '' = '';
  departurCity = '';

  readonly HERO_SLIDES = [
    {
      title: 'Discover Sacred <span>Pilgrimages</span>',
      subtitle: 'Visit the holiest temples, dargahs, and shrines across India. Expert guides, comfortable stays.',
      backgroundImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80',
      badge: '🛕 Religious Tours',
      tripType: 'RELIGIOUS' as TripType
    },
    {
      title: 'Your Dream <span>Honeymoon</span> Awaits',
      subtitle: 'Romantic getaways tailored just for you. Luxury stays, candlelit dinners, and magical memories.',
      backgroundImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1600&q=80',
      badge: '💍 Honeymoon',
      tripType: 'HONEYMOON' as TripType
    },
    {
      title: 'Unforgettable <span>Family</span> Adventures',
      subtitle: 'Create lasting memories with your loved ones. Kid-friendly trips with comfort and fun.',
      backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
      badge: '👨‍👩‍👧 Family Trips',
      tripType: 'FAMILY' as TripType
    }
  ];

  currentSlide = 0;

  readonly POPULAR_DESTINATIONS = [
    'Varanasi', 'Kedarnath', 'Tirupati', 'Shirdi', 'Amritsar',
    'Goa', 'Kerala', 'Rajasthan', 'Himachal', 'Ladakh'
  ];

  readonly TRIP_TYPES = [
    { value: '', label: 'All Trip Types' },
    { value: 'RELIGIOUS', label: '🛕 Religious' },
    { value: 'HONEYMOON', label: '💍 Honeymoon' },
    { value: 'FAMILY', label: '👨‍👩‍👧 Family' },
    { value: 'ADVENTURE', label: '🏔️ Adventure' },
    { value: 'BACHELOR', label: '🎉 Bachelor' },
    { value: 'WELLNESS', label: '🧘 Wellness' },
    { value: 'SOLO', label: '🎒 Solo' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.autoSlide();
  }

  private autoSlide(): void {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.HERO_SLIDES.length;
    }, 5000);
  }

  search(): void {
    this.router.navigate(['/trips'], {
      queryParams: {
        keyword: this.searchQuery || undefined,
        tripType: this.selectedTripType || undefined,
        departureCity: this.departurCity || undefined,
      }
    });
  }

  searchByType(type: TripType): void {
    this.router.navigate(['/trips'], { queryParams: { tripType: type } });
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}
