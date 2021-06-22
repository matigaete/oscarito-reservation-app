import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddReservationComponent } from './Reservation/add-reservation/add-reservation.component';
import { CancelReservationComponent } from './Reservation/cancel-reservation/cancel-reservation.component';
import { UpdateReservationComponent } from './Reservation/update-reservation/update-reservation.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'; 
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';

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
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,  
    DialogModule,
    CalendarModule,
    FormsModule
  ],
  providers: [FieldService],
  bootstrap: [AppComponent]
})
export class AppModule { }
