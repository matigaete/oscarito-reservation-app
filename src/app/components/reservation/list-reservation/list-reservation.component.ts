import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Reservation } from 'src/app/Interface/reservation';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Schedule } from 'src/app/Interface/schedule';
import { ScheduleService } from 'src/app/Services/schedule.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ListReservationComponent implements OnInit {

  reservations: Reservation[] = [];
  schedules: Schedule[] = [];
  scheduleModel: Schedule;
  reservationDialog: boolean = false;
  payDialog: boolean = false;
  reservationSelected: any;
  selectedReservation: Reservation = { user : {}, date: new Date(), idBlock: 0 };
  errorSchedule: boolean = false;

  constructor(private reservationService: ReservationService,
              private scheduleService: ScheduleService,
              private authService: AuthService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router) {
      this.scheduleModel = this.schedules[1];
    }

  ngOnInit(): void {
    this.findReservations();
  }

  findReservations(){
    let user = this.authService.getLocalUser();
    if (user != undefined){
      this.reservationService.getReservation(user.idUser!)
      .pipe(
        map((value) => {
          this.reservations = value;
        })
      ).subscribe();
    }
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

  showReservationDialog(reservation: Reservation) {
    this.reservationSelected = {...reservation};
    let dateString = reservation.schedule!.date!.toString();
    this.scheduleService.getSchedules(reservation.field?.idField, dateString!)
    .subscribe((value) => {
      this.schedules = value;
    });
    this.reservationDialog = true;
  }  

  saveNewScheduleForReservation(){
    this.errorSchedule = false;
    this.confirmationService.confirm({
      message: `¿Proseguir con el cambio de horario?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      accept: () => {
        if(this.scheduleModel === undefined){
          this.messageService.add({severity:'error', summary:'Horario', detail:`No se ha seleccionado un bloque de horario.`, life: 3000});
          this.errorSchedule = true;
          return;
        }

        this.reservationSelected.idBlock = this.scheduleModel.idSchedule;  
        this.reservationSelected.schedule = this.scheduleModel;
        this.reservationService.updateReservation(this.reservationSelected)
                                .subscribe();
        this.messageService.add({severity:'success', summary:'Reserva modificada', detail:`Se ha modificado el horario de la reserva: ${this.scheduleModel.initTime} hasta las ${this.scheduleModel.finalTime}`, life: 3000});
        this.reservationSelected = null;
        this.schedules = [];
        this.reservationDialog = false;
      }
    });
  }

  onChangeDropdown(){
    this.errorSchedule = false;
  }

  hideReservationDialog(){
    this.scheduleModel = { idSchedule: 0  };
    this.reservationSelected = null;
    this.errorSchedule = false;
    this.schedules = [];
    this.reservationDialog = false;
  }

  showPayDialog(reservation: Reservation){
    this.selectedReservation = reservation;
    this.payDialog = true;
  }

  hidePaymentDialog(status: boolean){
    this.payDialog = false;
  }

}
