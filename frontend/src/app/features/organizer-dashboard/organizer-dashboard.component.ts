import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { TripService } from '../../core/services/trip.service';
import { AuthService } from '../../core/services/auth.service';
import { Trip } from '../../core/models/trip.model';

@Component({
  standalone: false,
  selector: 'app-organizer-dashboard',
  templateUrl: './organizer-dashboard.component.html',
  styleUrls: ['./organizer-dashboard.component.scss']
})
export class OrganizerDashboardComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;
  organizerProfile: any = null;

  constructor(
    private tripService: TripService,
    private apiService: ApiService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrganizer();
    this.loadTrips();
  }

  loadOrganizer(): void {
    this.apiService.get<any>('/organizers/me').subscribe({
      next: (org) => this.organizerProfile = org,
      error: () => {}
    });
  }

  loadTrips(): void {
    this.tripService.getMyTrips().subscribe({
      next: (res) => { this.trips = res.content; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  publishTrip(id: string): void {
    this.tripService.publishTrip(id).subscribe({
      next: (updated) => {
        const idx = this.trips.findIndex(t => t.id === id);
        if (idx > -1) this.trips[idx] = updated;
      }
    });
  }
}
