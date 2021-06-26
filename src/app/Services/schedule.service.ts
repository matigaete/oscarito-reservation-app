import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Schedule } from '../Interface/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  public url = environment.baseUrl;

  constructor(private http: HttpClient) { }  
  
  public getSchedules(idField: number | undefined, date : string) {
    return this.http.get<Schedule[]>(`${this.url}schedule/list/${idField}/${date}/true`);
  }

  public addSchedule(schedule: Schedule) {
    return this.http.post(`${this.url}(link para API)`, schedule);
  }

  public updateSchedule(schedule: Schedule) {
    return this.http.put(`${this.url}schedule/update`, schedule);
  }
}
