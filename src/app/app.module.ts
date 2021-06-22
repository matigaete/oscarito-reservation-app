import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddReservationComponent } from './Reservation/add-reservation/add-reservation.component';
import { CancelReservationComponent } from './Reservation/cancel-reservation/cancel-reservation.component';
import { UpdateReservationComponent } from './Reservation/update-reservation/update-reservation.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'; 
import { FieldService } from './Services/field.service';

@NgModule({
  declarations: [
    AppComponent,
    AddReservationComponent,
    CancelReservationComponent,
    UpdateReservationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CardModule,
    ButtonModule,  
  ],
  providers: [FieldService],
  bootstrap: [AppComponent]
})
export class AppModule { }
