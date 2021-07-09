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
  reservationSelected: any;

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
      message: '¿Segur@ quieres anular esta reserva?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.reservationService.cancelReservation(reservation).subscribe();
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
          this.reload();
      }
    });    
  }

  editReservation(reservation: Reservation) {
    this.reservationSelected = {...reservation};
    let dateString = reservation.schedule!.date!.toString();
    this.scheduleService.getSchedules(reservation.idReservation, dateString!)
    .subscribe((value) => {
      this.schedules = value;
    });

    this.reservationDialog = true;
  }

  hideDialog(){
    this.schedules = [];
    this.reservationDialog = false;
  }

  saveReservation(){
    let reservationToUpdate: Reservation = this.reservationSelected; 
    reservationToUpdate.idBlock = this.scheduleModel.idSchedule;
    this.reservationService.updateReservation(reservationToUpdate).subscribe();
    this.reservationSelected = null;
    this.schedules = [];
    this.reservationDialog = false;
    this.reload();
  }

  reload(){
    setTimeout(() => {
      window.location.hash = '';
      this.router.navigateByUrl('/verReservas').then(() => {
        window.location.reload();
      });
    }, 0);
  }

}
