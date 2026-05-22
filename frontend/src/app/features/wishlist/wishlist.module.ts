import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistComponent } from './wishlist.component';

@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: WishlistComponent },
    ]),
    MatIconModule,
  ]
})
export class WishlistModule {}
