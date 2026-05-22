import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { CountByStatusPipe, CountByPipe } from './pipes/count-by-status.pipe';

@NgModule({
  declarations: [TripCardComponent, CountByStatusPipe, CountByPipe],
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  exports: [TripCardComponent, CountByStatusPipe, CountByPipe, CommonModule, RouterModule, MatIconModule, MatButtonModule],
})
export class SharedModule {}
