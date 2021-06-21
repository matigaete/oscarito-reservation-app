import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddReservationComponent } from './Reservation/add-reservation/add-reservation.component';
import { CancelReservationComponent } from './Reservation/cancel-reservation/cancel-reservation.component';
import { UpdateReservationComponent } from './Reservation/update-reservation/update-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    AddReservationComponent,
    CancelReservationComponent,
    UpdateReservationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
