import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  currentStep = 1;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) return;
    this.isLoading = true;

    const { firstName, lastName, email, phone, password } = this.registerForm.value;
    this.authService.signup({ firstName, lastName, email, phone, password }).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Signup failed. Check Paxaris gateway and Keycloak product config.';
      }
    });
  }
}
