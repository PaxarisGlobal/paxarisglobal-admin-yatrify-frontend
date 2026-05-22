import { Component, OnInit } from '@angular/core';
import { TripService } from '../../../../core/services/trip.service';
import { Trip } from '../../../../core/models/trip.model';

@Component({
  standalone: false,
  selector: 'app-trending-trips',
  templateUrl: './trending-trips.component.html',
  styleUrls: ['./trending-trips.component.scss']
})
export class TrendingTripsComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.tripService.getTrendingTrips().subscribe({
      next: (trips) => { this.trips = trips.slice(0, 4); this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }
}
