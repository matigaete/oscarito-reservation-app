import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserType } from 'src/app/Interface/user-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private url = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  public getUserType(){
    return this.http.get(`${this.url}userType/list`);
  }

  public updateUserType(userType: UserType) {
    return this.http.patch(`${this.url}userType/update`, userType);
  }

  public addUsertType(userType: UserType){
    return this.http.post(`${this.url}userType/add`, userType);
  }

}
