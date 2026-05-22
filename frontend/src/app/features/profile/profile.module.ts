import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../../core/guards/auth.guard';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ProfileComponent },
      { path: 'documents', component: ProfileComponent },
    ]),
    MatIconModule,
    MatButtonModule,
  ]
})
export class ProfileModule {}
