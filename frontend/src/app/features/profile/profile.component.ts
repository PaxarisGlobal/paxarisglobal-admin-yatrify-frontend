import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { UserProfile } from '../../core/models/user.model';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  activeTab = 'profile';
  profile: UserProfile | null = null;
  isLoading = true;
  isSaving = false;
  saveSuccess = false;

  profileForm!: FormGroup;
  documents: any[] = [];
  isUploadingDoc = false;
  selectedDocType = 'AADHAAR';

  readonly DOC_TYPES = [
    { value: 'AADHAAR', label: 'Aadhaar Card' },
    { value: 'PAN', label: 'PAN Card' },
    { value: 'PASSPORT', label: 'Passport' },
    { value: 'DRIVING_LICENSE', label: 'Driving License' },
    { value: 'VOTER_ID', label: 'Voter ID' },
  ];

  readonly LANGUAGES = ['Hindi', 'English', 'Marathi', 'Gujarati', 'Tamil', 'Telugu', 'Bengali', 'Kannada', 'Punjabi'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.authService.userProfile$.subscribe(profile => {
      this.profile = profile;
      if (profile) {
        this.initForm(profile);
      }
      this.isLoading = false;
    });

    if (!this.profile) {
      this.authService.loadUserProfile().subscribe();
    }

    this.loadDocuments();
  }

  private initForm(p: UserProfile): void {
    this.profileForm = this.fb.group({
      firstName: [p.firstName, Validators.required],
      lastName: [p.lastName],
      phone: [p.phone, [Validators.pattern('^[6-9][0-9]{9}$')]],
      dateOfBirth: [p.dateOfBirth],
      gender: [p.gender],
      preferredLanguage: [p.preferredLanguage || 'Hindi'],
      city: [p.city],
      state: [p.state],
      bio: [p.bio],
    });
  }

  loadDocuments(): void {
    this.api.get<any[]>('/documents/my').subscribe({
      next: (docs) => this.documents = docs,
      error: () => this.documents = []
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    this.isSaving = true;
    this.api.put('/users/me', this.profileForm.value).subscribe({
      next: (updated) => {
        this.isSaving = false;
        this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 3000);
      },
      error: () => { this.isSaving = false; }
    });
  }

  onDocumentFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.isUploadingDoc = true;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', this.selectedDocType);

    this.api.postFormData('/documents/upload', formData).subscribe({
      next: (doc: any) => {
        this.isUploadingDoc = false;
        this.documents = [...this.documents, doc];
      },
      error: () => { this.isUploadingDoc = false; }
    });
  }

  getDocLabel(type: string): string {
    return this.DOC_TYPES.find(d => d.value === type)?.label ?? type;
  }
}
