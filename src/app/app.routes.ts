import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddReservationComponent } from './components/reservation/add-reservation/add-reservation.component';
import { CancelReservationComponent } from './components/reservation/cancel-reservation/cancel-reservation.component';
import { UpdateReservationComponent } from './components/reservation/update-reservation/update-reservation.component';

const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'reservar', component: AddReservationComponent},
    {path: 'modificar', component: UpdateReservationComponent},
    {path: 'eliminar', component: CancelReservationComponent},    
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

/*
    {
        path: 'protegida', 
        component: ProtegidaComponent,
        canActivate:[
            AuthGuardService
        ]
    },
*/

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);