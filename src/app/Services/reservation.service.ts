import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Reservation } from '../Interface/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public url = environment.baseUrl;

  constructor(private http: HttpClient) { }  
  
  public getReservation(idUser: number) {
    return this.http.get<Reservation[]>(`${this.url}reservation/list/{idUser}?idUser=${idUser}`);
  }

  public addReservation(reservation: Reservation) {
    return this.http.post(`${this.url}reservation/add`, reservation);
  }

  public updateReservation(reservationUpdate: Reservation) {
    return this.http.patch(`${this.url}reservation/update`, reservationUpdate);
  }

  public cancelReservation(reservation: Reservation) {
    return this.http.put(`${this.url}reservation/cancel`, reservation);
  }
}
