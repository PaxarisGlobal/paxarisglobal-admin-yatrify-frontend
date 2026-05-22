import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OrganizerDashboardComponent } from './organizer-dashboard.component';
import { CreateTripComponent } from './create-trip/create-trip.component';
import { OrganizerRegisterComponent } from './organizer-register/organizer-register.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [OrganizerDashboardComponent, CreateTripComponent, OrganizerRegisterComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrganizerDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ORGANIZER', 'YATRIFY_ORGANIZER'] }
      },
      {
        path: 'dashboard',
        component: OrganizerDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ORGANIZER', 'YATRIFY_ORGANIZER'] }
      },
      {
        path: 'trips',
        component: OrganizerDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ORGANIZER', 'YATRIFY_ORGANIZER'] }
      },
      {
        path: 'create-trip',
        component: CreateTripComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ORGANIZER', 'YATRIFY_ORGANIZER'] }
      },
      { path: 'register', component: OrganizerRegisterComponent },
    ]),
    MatIconModule, MatTabsModule, MatButtonModule, MatStepperModule, MatInputModule, MatSelectModule,
  ]
})
export class OrganizerDashboardModule {}
