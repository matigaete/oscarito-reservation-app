import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { Observable } from 'rxjs';
import { Field } from 'src/app/Interface/field';
import { Reservation } from 'src/app/Interface/reservation';
import { Schedule } from 'src/app/Interface/schedule';
import { FieldService } from 'src/app/Services/field.service';
import { ReservationService } from 'src/app/Services/reservation.service';
import { ScheduleService } from 'src/app/Services/schedule.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  msgs: Message[] = [];
  fields$: Observable<Field[]>;
  schedules$: Observable<Schedule[]> | undefined;
  schedules: Schedule[] = [];

  fieldModel: Field = { idState: 0, fieldType: { capacity: 0, name: "" }, amount: 0 };
  reservationModel: Reservation = { idBlock: 0, idState: 0, date: new Date(), idPayment: 0, idUser: 0 };
  scheduleModel: Schedule;

  display: boolean = false;
  dateModel: Date = new Date();;
  dateMin: Date = new Date();;
  dateMax: Date = new Date();;

  constructor(private confirmationService: ConfirmationService,
    private fieldService: FieldService,
    private scheduleService: ScheduleService,
    private reservartionService: ReservationService) {

    this.fields$ = this.fieldService.getFields();    
    this.dateMax.setDate(this.dateMin.getDate() + 7); 
    this.scheduleModel = this.schedules[1];
  }

  ngOnInit(): void {

  }

  ngOnSubmit(): void {
    this.confirmationService.confirm({
      message: `Está seguro de reservar cancha de ${this.fieldModel.fieldType.name} a las ${this.scheduleModel.initTime}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      accept: () => {
        this.display = false;
        this.reservationModel = {
          idField: this.fieldModel?.idField,
          date: this.dateModel,
          idUser: 1,
          idState: 1,
          idBlock: this.scheduleModel.idSchedule,
        };
        this.scheduleModel.available = false;
        this.reservartionService.addReservation(this.reservationModel).subscribe(() => {
          this.scheduleService.updateSchedule(this.scheduleModel).subscribe(() => {
            this.msgs = [{
              severity: 'success', summary: 'Hora confirmada',
              detail: `Se ha realizado la reserva a las ${this.scheduleModel.initTime} hasta las ${this.scheduleModel.finalTime}`
            }];
          });
        });
      }
      // reject: () => {
      //   this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      // }
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
