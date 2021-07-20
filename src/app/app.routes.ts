import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PagoComponent } from './components/pago/pago.component';
import { AddReservationComponent } from './components/reservation/add-reservation/add-reservation.component';
import { CheckinComponent } from './components/reservation/checkin/checkin.component';
import { ListReservationComponent } from './components/reservation/list-reservation/list-reservation.component';

import { AuthGuard } from './guards/auth.guard';

const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'reservar', component: AddReservationComponent, canActivate: [AuthGuard]},  
    {path: 'verReservas', component: ListReservationComponent, canActivate: [AuthGuard]},  
    {path: 'checkin', component: CheckinComponent, canActivate: [AuthGuard]},
    {path: 'pago', component: PagoComponent, canActivate: [AuthGuard]},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);