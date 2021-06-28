import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddReservationComponent } from './components/reservation/add-reservation/add-reservation.component';
import { CancelReservationComponent } from './components/reservation/cancel-reservation/cancel-reservation.component';
import { UpdateReservationComponent } from './components/reservation/update-reservation/update-reservation.component';
import { AuthGuard } from './guards/auth.guard';

const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'reservar', component: AddReservationComponent, canActivate: [AuthGuard]},
    {path: 'modificar', component: UpdateReservationComponent, canActivate: [AuthGuard]},
    {path: 'eliminar', component: CancelReservationComponent, canActivate: [AuthGuard]},    
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);