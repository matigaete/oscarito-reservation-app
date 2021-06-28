import { Component } from '@angular/core';
import { User } from 'src/app/Interface/user';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(public authService : AuthService,
              private router : Router) { }

  email : string = '';
  password : string = '';
  msgs: Message[] = [];
  blockedDocument: boolean = false;

  ingresar(){
    this.blockedDocument = true;
    // Armar usuario
    let user : User = { email : this.email, password : this.password };
    // Loguear    
    this.authService.login(user).subscribe(() => {
      if (!this.authService.isAuthenticated()){
        this.msgs = [{ severity: 'error', summary: '', detail: 'Email o contraseña incorrectas' }];
        this.blockedDocument = false;
      }else{
        this.msgs = [{ severity: 'success', summary: '', detail: 'Acceso correcto' }];
        setTimeout(() => {
          this.blockedDocument = false;
          window.location.hash = '';
          this.router.navigateByUrl('/home').then(() => {
            window.location.reload();
          });
        }, 3000);
      }
      
    });
  }

}
