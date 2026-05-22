import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

import { TripsListComponent } from './trips-list/trips-list.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    TripsListComponent,
    TripDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: TripsListComponent },
      { path: ':slug', component: TripDetailComponent },
    ]),
    MatIconModule, MatButtonModule, MatSelectModule, MatSliderModule,
    MatChipsModule, MatProgressSpinnerModule, MatPaginatorModule,
    MatTooltipModule, MatTabsModule, MatExpansionModule,
  ]
})
export class TripsModule {}
