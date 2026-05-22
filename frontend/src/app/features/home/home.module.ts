import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HomeComponent } from './home.component';
import { HeroComponent } from './components/hero/hero.component';
import { TripCategoryComponent } from './components/trip-category/trip-category.component';
import { FeaturedTripsComponent } from './components/featured-trips/featured-trips.component';
import { TrendingTripsComponent } from './components/trending-trips/trending-trips.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    TripCategoryComponent,
    FeaturedTripsComponent,
    TrendingTripsComponent,
    HowItWorksComponent,
    TestimonialsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ]
})
export class HomeModule {}
