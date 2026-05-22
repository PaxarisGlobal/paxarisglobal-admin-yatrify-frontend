import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { UserProfile } from '../../../core/models/user.model';

@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  isProfileMenuOpen = false;
  isAuthenticated = false;
  userProfile: UserProfile | null = null;
  isOrganizer = false;
  unreadNotifications = 0;

  private sub = new Subscription();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.sub.add(
      this.authService.currentUser$.subscribe(user => {
        this.isAuthenticated = !!user;
        this.isOrganizer = this.authService.isOrganizer();
      })
    );
    this.sub.add(
      this.authService.userProfile$.subscribe(profile => {
        this.userProfile = profile;
      })
    );
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  logout(): void {
    this.authService.logout();
    this.isProfileMenuOpen = false;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isMobileMenuOpen = false;
    this.isProfileMenuOpen = false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
