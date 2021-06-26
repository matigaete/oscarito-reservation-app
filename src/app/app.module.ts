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
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { FieldService } from './Services/field.service';
import { ImageResourcePipe } from './pipes/image-resource.pipe';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    AddReservationComponent,
    CancelReservationComponent,
    UpdateReservationComponent,
    ImageResourcePipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,  
    DialogModule,
    CalendarModule,
    FormsModule,
    ListboxModule,
    MessagesModule,
    ConfirmDialogModule
  ],
  providers: [FieldService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
