import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Field } from 'src/app/Interface/field';
import { Reservation } from 'src/app/Interface/reservation';
import { Schedule } from 'src/app/Interface/schedule';
import { User } from 'src/app/Interface/user';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { FieldService } from 'src/app/Services/field.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { ScheduleService } from 'src/app/Services/schedule.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  user: User = {};
  fields$: Observable<Field[]>;
  schedules$: Observable<Schedule[]> | undefined;
  schedules: Schedule[] = [];

  fieldModel: Field = { idState: 0, fieldType: { capacity: 0, name: "" }, amount: 0 };
  reservationModel: Reservation = { idReservation : 0 ,date: new Date(), idBlock: 0, user : {} };
  scheduleModel: Schedule;

  display: boolean = false;
  dateModel: Date = new Date();
  dateMin: Date = new Date();
  dateMax: Date = new Date();

  constructor(private authService: AuthService,
    private confirmationService: ConfirmationService,
    private fieldService: FieldService,
    private scheduleService: ScheduleService,
    private reservartionService: ReservationService,
    private messageService: MessageService) {

    this.fields$ = this.fieldService.getFields();    
    this.dateMax.setDate(this.dateMin.getDate() + 7); 
    this.scheduleModel = this.schedules[1];    
  }

  ngOnInit(): void {
    this.user = this.authService.getLocalUser()!;
  }

  ngOnSubmit(): void {
    this.saveReservation();
  }

  saveReservation(){
    this.confirmationService.confirm({
      message: `Está seguro de reservar cancha de ${this.fieldModel.fieldType.name} a las ${this.scheduleModel.initTime}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      accept: () => {
        if(this.scheduleModel === undefined){
          this.messageService.add({severity:'error', summary:'Horario', detail:`No se ha seleccionado un bloque de horario.`, life: 3000});
          return;
        }
        this.display = false;
        this.reservationModel = {
          idReservation : 0,
          field: this.fieldModel,
          date: this.dateModel,
          idBlock: this.scheduleModel.idSchedule,
          user: this.user,
          state: {idState : 4, description : "" },
          schedule: this.scheduleModel,
        };
        this.scheduleModel.available = false;
        this.reservartionService.addReservation(this.reservationModel).subscribe(() => {
          this.scheduleService.updateSchedule(this.scheduleModel).subscribe(() => {
            this.messageService.add({severity:'success', summary:'Reserva confirmada', detail:`Se ha realizado una reserva desde las ${this.scheduleModel.initTime} hasta las ${this.scheduleModel.finalTime}`, life: 3000});
          });
        });
      }
    });
  }

  onSelect(field: Field): void {
    this.showSchedules(field);
  }

  showDialog(field: Field) {
    this.showSchedules(field);
    this.fieldModel = field;
    this.display = true;
  }

  showSchedules(field: Field): void {
    let dateString = `${this.dateModel.getFullYear()}-${this.dateModel.getMonth() + 1}-${this.dateModel.getDate()}`
    this.schedules$ = this.scheduleService.getSchedules(field.idField, dateString);
    this.schedules$.forEach(s => { this.schedules = s });
  }

}
