import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Reservation } from '../Interface/reservation';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public url = environment.baseUrl;

  constructor(private http: HttpClient) { }  
  
  public getReservation(idUser: number) {
    return this.http.get<Reservation[]>(`${this.url}reservation/list/{idUser}?idUser=${idUser}`);
  }

  public getReservationByDate(date: string) {
    return this.http.get<Reservation[]>(`${this.url}reservation/list/date/{fecha}?fecha=${date}`);
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

  public payReservation(reservationPay: Reservation) {
    return this.http.patch(`${this.url}reservation/pay`, reservationPay)
          .pipe(
            catchError(this.handleError)
          );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
