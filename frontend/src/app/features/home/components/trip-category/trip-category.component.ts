import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TripType, TRIP_TYPE_CONFIG } from '../../../../core/models/trip.model';

@Component({
  standalone: false,
  selector: 'app-trip-category',
  templateUrl: './trip-category.component.html',
  styleUrls: ['./trip-category.component.scss']
})
export class TripCategoryComponent {
  readonly CATEGORIES: Array<{
    type: TripType;
    label: string;
    emoji: string;
    description: string;
    image: string;
    count: number;
  }> = [
    {
      type: 'RELIGIOUS', label: 'Religious Tours', emoji: '🛕',
      description: 'Spiritual journeys to temples, dargahs & shrines',
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80',
      count: 450
    },
    {
      type: 'HONEYMOON', label: 'Honeymoon', emoji: '💍',
      description: 'Romantic escapes for newlyweds',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400&q=80',
      count: 280
    },
    {
      type: 'FAMILY', label: 'Family Trips', emoji: '👨‍👩‍👧',
      description: 'Fun-filled holidays for the whole family',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
      count: 320
    },
    {
      type: 'ADVENTURE', label: 'Adventure', emoji: '🏔️',
      description: 'Thrilling treks, rafting & camping',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
      count: 180
    },
    {
      type: 'BACHELOR', label: 'Bachelor Party', emoji: '🎉',
      description: 'Epic bachelor & bachelorette experiences',
      image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400&q=80',
      count: 120
    },
    {
      type: 'WELLNESS', label: 'Wellness Retreats', emoji: '🧘',
      description: 'Yoga, meditation & rejuvenation retreats',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80',
      count: 90
    },
    {
      type: 'SOLO', label: 'Solo Travel', emoji: '🎒',
      description: 'Independent journeys for lone explorers',
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&q=80',
      count: 140
    },
    {
      type: 'EDUCATIONAL', label: 'Educational', emoji: '📚',
      description: 'Learning journeys for students & curious minds',
      image: 'https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?w=400&q=80',
      count: 60
    },
  ];

  constructor(private router: Router) {}

  navigate(type: TripType): void {
    this.router.navigate(['/trips'], { queryParams: { tripType: type } });
  }
}
