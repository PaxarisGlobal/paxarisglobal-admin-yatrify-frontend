import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.snackBar.open('Please login to continue', 'Login', { duration: 3000 })
        .onAction().subscribe(() => this.router.navigate(['/auth/login']));
      this.router.navigate(['/auth/login']);
      return false;
    }

    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles?.length) {
      const user = this.authService.getCurrentUser();
      const hasRole = requiredRoles.some(role =>
        user?.roles?.some(r => r.toUpperCase().includes(role.toUpperCase()))
      );
      if (!hasRole) {
        this.snackBar.open('You do not have permission to access this page.', 'Close', { duration: 4000 });
        this.router.navigate(['/']);
        return false;
      }
    }

    return true;
  }
}
