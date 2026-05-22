import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TripService } from '../../../core/services/trip.service';
import { Trip, TripType, TRIP_TYPE_CONFIG } from '../../../core/models/trip.model';
import { PageResponse } from '../../../core/services/api.service';

@Component({
  standalone: false,
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss']
})
export class TripsListComponent implements OnInit {
  trips: Trip[] = [];
  isLoading = true;
  pageData: Omit<PageResponse<Trip>, 'content'> | null = null;
  currentPage = 0;
  pageSize = 12;
  Math = Math;

  filterForm!: FormGroup;

  readonly TRIP_TYPE_OPTIONS = [
    { value: '', label: 'All Types' },
    ...Object.entries(TRIP_TYPE_CONFIG).map(([k, v]) => ({
      value: k, label: `${v.emoji} ${v.label}`
    }))
  ];

  readonly SORT_OPTIONS = [
    { value: 'startDate-asc', label: 'Upcoming First' },
    { value: 'pricePerPerson-asc', label: 'Price: Low to High' },
    { value: 'pricePerPerson-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Top Rated' },
    { value: 'totalBookings-desc', label: 'Most Popular' },
  ];

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      keyword: [''],
      tripType: [''],
      departureCity: [''],
      minPrice: [null],
      maxPrice: [null],
      seats: [1],
      sortBy: ['startDate-asc'],
    });

    this.route.queryParams.subscribe(params => {
      if (params['tripType']) this.filterForm.patchValue({ tripType: params['tripType'] });
      if (params['keyword']) this.filterForm.patchValue({ keyword: params['keyword'] });
      if (params['departureCity']) this.filterForm.patchValue({ departureCity: params['departureCity'] });
      this.loadTrips();
    });

    this.filterForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 0;
      this.loadTrips();
    });
  }

  loadTrips(): void {
    this.isLoading = true;
    const values = this.filterForm.value;
    const [sortBy, sortDir] = (values.sortBy || 'startDate-asc').split('-');

    this.tripService.searchTrips({
      keyword: values.keyword || undefined,
      tripType: values.tripType || undefined,
      departureCity: values.departureCity || undefined,
      minPrice: values.minPrice || undefined,
      maxPrice: values.maxPrice || undefined,
      seats: values.seats || 1,
      page: this.currentPage,
      size: this.pageSize,
      sortBy,
      sortDir: sortDir as 'asc' | 'desc',
    }).subscribe({
      next: (response) => {
        this.trips = response.content;
        const { content, ...meta } = response;
        this.pageData = meta;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadTrips();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearFilters(): void {
    this.filterForm.reset({ sortBy: 'startDate-asc', seats: 1 });
  }

  get hasActiveFilters(): boolean {
    const v = this.filterForm.value;
    return !!(v.keyword || v.tripType || v.departureCity || v.minPrice || v.maxPrice);
  }
}
