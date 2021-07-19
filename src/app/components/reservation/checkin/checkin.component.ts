import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Reservation } from 'src/app/Interface/reservation';
import { ReservationService } from 'src/app/Services/reservation.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {

  reservations: Reservation[] = [];
  selectedReservation: Reservation = { user : {}, date: new Date(), idBlock: 0 };
  payDialog: boolean = false;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.findReservations();   
  }

  findReservations(){
    const now = new DatePipe('en-CL');
    const date = now.transform(Date.now(), "yyyy-MM-dd");
    this.reservationService.getReservationByDate(date!)
      .pipe(
        map((value) => {
          this.reservations = value;
          console.log(this.reservations);
        })
      ).subscribe();
  }

  showPayDialog(reservation: Reservation){
    this.selectedReservation = reservation;
    this.payDialog = true;
  }

}
