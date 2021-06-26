/* MÓDULOS */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
/* MÓDULOS PRIMEFACES */
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button'; 
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { APP_ROUTING } from './app.routes';
/* COMPONENTES */
import { AppComponent } from './app.component';
import { ImageResourcePipe } from './pipes/image-resource.pipe';
import { LoginComponent } from './components/login/login.component';
import { AddReservationComponent } from './components/reservation/add-reservation/add-reservation.component';
import { CancelReservationComponent } from './components/reservation/cancel-reservation/cancel-reservation.component';
import { UpdateReservationComponent } from './components/reservation/update-reservation/update-reservation.component';
/* SERVICIOS */
import { FieldService } from './Services/field.service';
import { ConfirmationService } from 'primeng/api';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AddReservationComponent,
    CancelReservationComponent,
    UpdateReservationComponent,
    ImageResourcePipe,
    LoginComponent,
    HomeComponent
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
    ConfirmDialogModule,
    APP_ROUTING
  ],
  providers: [FieldService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
