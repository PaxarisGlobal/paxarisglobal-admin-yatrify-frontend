import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  readonly TESTIMONIALS = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      avatar: 'PS',
      rating: 5,
      trip: 'Char Dham Yatra 2024',
      review: 'Absolutely divine experience! The organizer arranged everything perfectly. The temples, the accommodation, the transport - everything was top class. My elderly parents felt completely safe and comfortable throughout the journey.',
      color: '#E35B2A'
    },
    {
      name: 'Rahul & Deepika Verma',
      location: 'Delhi',
      avatar: 'RV',
      rating: 5,
      trip: 'Kerala Honeymoon Package',
      review: 'Our honeymoon was beyond our dreams! The houseboat stay in Alleppey, the Munnar tea gardens, the Kovalam beach — everything was perfectly coordinated. Yatrify made it stress-free and memorable.',
      color: '#ec4899'
    },
    {
      name: 'The Mehta Family',
      location: 'Ahmedabad',
      avatar: 'MF',
      rating: 5,
      trip: 'Rajasthan Family Tour',
      review: 'Best family vacation ever! The kids loved the camel ride, our parents loved the heritage hotels. The organizer was patient and accommodating to all our needs. Booking was so easy on Yatrify!',
      color: '#10b981'
    },
    {
      name: 'Arjun Singh',
      location: 'Pune',
      avatar: 'AS',
      rating: 5,
      trip: 'Spiti Valley Adventure',
      review: 'As a solo traveler, I was nervous but the Yatri AI assistant helped me choose the perfect trip. The adventure was incredible - Spiti Valley is breathtaking. The organizer ensured my safety throughout.',
      color: '#3b82f6'
    }
  ];
}
