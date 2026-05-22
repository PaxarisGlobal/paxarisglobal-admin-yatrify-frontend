import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BookingFlowComponent } from './booking-flow/booking-flow.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
@NgModule({
  declarations: [BookingFlowComponent, BookingConfirmationComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: BookingFlowComponent },
      { path: 'confirmation/:reference', component: BookingConfirmationComponent },
    ]),
    MatIconModule, MatStepperModule, MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule,
  ]
})
export class BookingModule {}
