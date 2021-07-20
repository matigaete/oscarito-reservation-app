import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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

  constructor(private reservationService: ReservationService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

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
        })
      ).subscribe();
  }

  cancelReservation(reservation: Reservation){
    this.confirmationService.confirm({
      message: '¿Deseas cancelar la reserva?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.reservationService.cancelReservation(reservation).subscribe();
          reservation.state = { idState: 2, description: 'Anulado' }
          this.messageService.add({severity:'info', summary:'Cambios en tu reserva', detail:'Hemos anulado la reserva seleccionada', life: 3000});
      }
    });    
  }

  showPayDialog(reservation: Reservation){
    this.selectedReservation = reservation;
    this.payDialog = true;
  }

  hidePaymentDialog(status: boolean){
    this.payDialog = false;
  }

}
