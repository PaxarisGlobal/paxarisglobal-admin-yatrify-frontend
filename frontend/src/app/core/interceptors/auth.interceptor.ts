import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('yatrify_token');

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('yatrify_token');
          localStorage.removeItem('yatrify_user');
          this.router.navigate(['/auth/login']);
          this.snackBar.open('Session expired. Please login again.', 'Close', { duration: 4000 });
        } else if (error.status === 403) {
          this.snackBar.open('You do not have permission to perform this action.', 'Close', { duration: 4000 });
        } else if (error.status === 0) {
          this.snackBar.open('Connection error. Please check your internet connection.', 'Close', { duration: 4000 });
        } else if (error.status >= 500) {
          const msg = error.error?.message || 'Server error. Please try again later.';
          this.snackBar.open(msg, 'Close', { duration: 5000 });
        }
        return throwError(() => error);
      })
    );
  }
}
