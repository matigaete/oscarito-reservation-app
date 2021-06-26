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
  public schedules$: Observable<Schedule[]> | undefined;
  public schedules: Schedule[];

  public fieldModel: Field;
  public reservationModel: Reservation;
  public scheduleModel: Schedule;

  public display: boolean;
  public dateModel: Date;
  public dateMin: Date;
  public dateMax: Date;

  constructor(private fieldService: FieldService,
    private scheduleService: ScheduleService,
    private reservartionService: ReservationService) {

    this.fields$ = this.fieldService.getFields();
    this.fieldModel = { idState: 0, fieldType: { capacity: 0, name: "" }, amount: 0 };
    this.display = false;
    this.reservationModel = { idBlock: 0, idState: 0, date: new Date(), idPayment: 0, idUser: 0 };
    this.dateModel = this.dateMin = new Date();
    this.dateMax = new Date();
    this.dateMax.setDate(this.dateMin.getDate() + 7);
    this.schedules = [];
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
      idState: 1,
      idBlock: this.scheduleModel.idSchedule,
    };
    this.scheduleModel.available = false;
    this.reservartionService.addReservation(this.reservationModel).subscribe(() => {
      this.scheduleService.updateSchedule(this.scheduleModel).subscribe(() => {
        // mensaje de reserva exitosa
      });
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
    let dateString = `${this.dateModel.getFullYear()}-${this.dateModel.getMonth()+1}-${this.dateModel.getDate()}`
    this.schedules$ = this.scheduleService.getSchedules(field.idField, dateString);
    this.schedules$.forEach(s => { this.schedules = s }); 
  }

}
