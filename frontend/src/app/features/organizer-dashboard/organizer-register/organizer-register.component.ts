import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { OrganizerRegistrationResult } from '../../../core/models/auth.model';

@Component({
  standalone: false,
  selector: 'app-organizer-register',
  templateUrl: './organizer-register.component.html',
  styleUrls: ['./organizer-register.component.scss']
})
export class OrganizerRegisterComponent {
  form: FormGroup;
  isSubmitting = false;
  submitted = false;
  errorMsg = '';

  readonly SPECIALIZATIONS = [
    'Religious Trips', 'Honeymoon Packages', 'Family Tours',
    'Adventure Travel', 'Corporate Travel', 'Solo Travel',
    'International Tours', 'Pilgrimage Tours', 'Hill Station Tours',
    'Beach Holidays'
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private authService: AuthService,
    public router: Router
  ) {
    this.form = this.fb.group({
      businessName: ['', [Validators.required, Validators.minLength(3)]],
      displayName: ['', Validators.required],
      businessDescription: ['', [Validators.required, Validators.minLength(50)]],
      businessEmail: ['', [Validators.required, Validators.email]],
      businessPhone: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      website: [''],
      yearsOfExperience: [1, [Validators.required, Validators.min(0)]],
      specializations: [[]],
      licenseNumber: [''],
      gstNumber: [''],
      panNumber: [''],
      address: this.fb.group({
        street: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pinCode: [''],
      }),
      bankAccountNumber: [''],
      bankIfscCode: [''],
      agreeToTerms: [false, Validators.requiredTrue],
    });
  }

  toggleSpecialization(spec: string): void {
    const current: string[] = this.form.get('specializations')!.value || [];
    const idx = current.indexOf(spec);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else {
      current.push(spec);
    }
    this.form.get('specializations')!.setValue([...current]);
  }

  isSelectedSpec(spec: string): boolean {
    return (this.form.get('specializations')!.value || []).includes(spec);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    this.errorMsg = '';

    const v = this.form.value;
    const payload = {
      organizationName: v.businessName,
      organizationType: 'AGENCY',
      description: v.businessDescription,
      website: v.website || undefined,
      gstin: v.gstNumber || undefined,
      panNumber: v.panNumber || undefined,
      bankAccountNumber: v.bankAccountNumber || undefined,
      bankIfscCode: v.bankIfscCode || undefined,
      bankName: v.displayName || undefined,
      bankAccountHolder: v.displayName || undefined,
    };

    this.api.post<OrganizerRegistrationResult>('/organizers/register', payload).subscribe({
      next: (result) => {
        this.isSubmitting = false;
        if (result?.auth) {
          this.authService.applyAuthResponse(result.auth);
        }
        this.submitted = true;
        setTimeout(() => this.router.navigate(['/organizer/dashboard']), 1500);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMsg = err?.error?.message || err?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
