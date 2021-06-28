import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Interface/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public updateSchedule(user: User) {
    return this.http.patch(`${this.url}user/update`, user);
  }


}
