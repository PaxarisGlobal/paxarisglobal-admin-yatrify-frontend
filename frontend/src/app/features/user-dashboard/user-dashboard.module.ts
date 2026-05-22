import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { UserDashboardComponent } from './user-dashboard.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule, FormsModule, SharedModule,
    RouterModule.forChild([
      { path: '', component: UserDashboardComponent },
      { path: 'bookings', component: UserDashboardComponent },
    ]),
    MatIconModule, MatTabsModule, MatButtonModule
  ]
})
export class UserDashboardModule {}
