import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Field } from '../Class/field';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  public url = environment.baseUrl;

  constructor(public http: HttpClient) { }  
  
  public getFields() { 
    return this.http.get<Field[]>(`${this.url}don-oscarito/field/list`);
  }

  public addField(field: Field) {
    return this.http.post(`${this.url}(link para API)`, field);
  }

  public updateField(field: Field) {
    return this.http.put(`${this.url}(link para API)`, field);
  }
}
