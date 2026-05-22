import { Component, OnInit } from '@angular/core';
import { TripService } from '../../../../core/services/trip.service';
import { Trip } from '../../../../core/models/trip.model';

@Component({
  standalone: false,
  selector: 'app-featured-trips',
  templateUrl: './featured-trips.component.html',
  styleUrls: ['./featured-trips.component.scss']
})
export class FeaturedTripsComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getFeaturedTrips().subscribe({
      next: (trips) => { this.trips = trips; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }
}
