import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Trip } from '../../core/models/trip.model';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistItems: any[] = [];
  isLoading = true;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.isLoading = true;
    this.api.get<any[]>('/wishlist').subscribe({
      next: (items) => {
        this.wishlistItems = items;
        this.isLoading = false;
      },
      error: () => {
        this.wishlistItems = [];
        this.isLoading = false;
      }
    });
  }

  removeFromWishlist(tripId: string): void {
    this.api.delete(`/wishlist/${tripId}`).subscribe({
      next: () => {
        this.wishlistItems = this.wishlistItems.filter(w => w.trip?.id !== tripId);
      }
    });
  }

  viewTrip(slug: string): void {
    this.router.navigate(['/trips', slug]);
  }

  bookNow(slug: string): void {
    this.router.navigate(['/trips', slug]);
  }
}
