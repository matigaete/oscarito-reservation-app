import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Reservation } from '../Class/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public url = environment.baseUrl;

  constructor(private http: HttpClient) { }  
  
  public getReservation() {
    return this.http.get<Reservation[]>(`${this.url}(link para API)`);
  }

  public addReservation(reservation: Reservation) {
    return this.http.post(`${this.url}(link para API)`, reservation);
  }

  public updateReservation(reservation: Reservation) {
    return this.http.put(`${this.url}(link para API)`, reservation);
  }
}
