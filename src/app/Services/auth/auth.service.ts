import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { User } from 'src/app/Interface/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = environment.baseUrl;

  constructor(public http: HttpClient) {
  }

  public login(user : User){
    return this.verificateUser(user)
    .pipe( 
      map((value) => {
        if(value.length > 0){
          this.saveLocalUser(value[0]);
        }
      }),
      catchError(this.handleError)
    );
  }

  public isAuthenticated(): boolean {
    let user = this.getLocalUser();
    if(user == undefined){
      return false;
    }
    else{
      return true;
    }
  }

  public getLocalUser() : User | undefined{
    let user : User | undefined;
    let userLocal = localStorage.getItem('user');
    if (userLocal != null)
    {
      user = JSON.parse(userLocal);
    }
    return user;
  };

  private saveLocalUser(user : User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  private verificateUser(user : User) : Observable<User[]> {
    return this.http.post<User[]>(`${this.url}user/login`, user);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
