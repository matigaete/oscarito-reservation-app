/* MÓDULOS */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTING } from './app.routes';
/* MÓDULOS PRIMEFACES */
import { FormsModule } from '@angular/forms';
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from "primeng/button";
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
/* COMPONENTES */
import { AppComponent } from './app.component';
import { ImageResourcePipe } from './pipes/image-resource.pipe';
import { LoginComponent } from './components/login/login.component';
import { AddReservationComponent } from './components/reservation/add-reservation/add-reservation.component';
import { CancelReservationComponent } from './components/reservation/cancel-reservation/cancel-reservation.component';
import { UpdateReservationComponent } from './components/reservation/update-reservation/update-reservation.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListReservationComponent } from './components/reservation/list-reservation/list-reservation.component';
/* SERVICIOS */
import { FieldService } from './Services/field.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    AppComponent,
    AddReservationComponent,
    CancelReservationComponent,
    UpdateReservationComponent,
    ImageResourcePipe,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ListReservationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,  
    DialogModule,
    CalendarModule,
    FormsModule,
    ListboxModule,
    MessagesModule,
    ConfirmDialogModule,
    MenubarModule,
    ProgressSpinnerModule,
    BlockUIModule,
    TableModule,
    DividerModule,
    APP_ROUTING
  ],
  providers: [FieldService, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
