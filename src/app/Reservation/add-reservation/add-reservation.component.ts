import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  public fields$: Observable<Field[]>;
  public schedules$: Observable<Schedule[]>;
  public schedules: Schedule[];

  public fieldModel: Field | undefined;
  public reservationModel: Reservation;
  public display: boolean;
  public dateModel: Date;
  public dateMin: Date;
  public dateMax: Date;

  public scheduleModel: Schedule;

  constructor(private fieldService: FieldService,
    private scheduleService: ScheduleService,
    private reservartionService: ReservationService) {
    this.fields$ = this.fieldService.getFields();
    this.schedules$ = this.scheduleService.getSchedules();
    this.display = false;
    this.reservationModel = { initTime: 0, idState: 0, finalTime: 0, date: new Date(), idPayment: 0, idUser: 0 };
    this.dateModel = this.dateMin = new Date();
    this.dateMax = new Date();
    this.dateMax.setDate(this.dateMin.getDate() + 7);
    this.schedules = [];
    this.scheduleService.getSchedules().subscribe((json: Schedule[]) => this.schedules = json);
    this.scheduleModel = this.schedules[1];
  }

  ngOnInit(): void {

  }

  ngOnSubmit(): void {
    this.display = false;
    this.reservationModel = {
      idField: this.fieldModel?.idField,
      date: this.dateModel, 
      idUser: 1, 
      idPayment : 1, 
      idState : 1, 
      initTime : this.scheduleModel.idSchedule, 
      finalTime : 0
    };
    this.reservartionService.addReservation(this.reservationModel).subscribe(() => {
      // mensaje de reserva exitosa
    });
    console.log(this.reservationModel);
  }

  showDialog(param: Field) {
    this.fieldModel = param;
    this.display = true;
  }

}
