import { Component } from '@angular/core';
import { User } from 'src/app/Interface/user';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email : string = '';
  password : string = '';
  msgs: Message[] = [];
  blockedDocument: boolean = false;

  constructor(public authService : AuthService,
              private router : Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ingresar(){
    this.blockedDocument = true;
    // Armar usuario
    let user : User = { email : this.email, password : this.password };
    // Loguear    
    this.authService.login(user).subscribe(() => {
      if (!this.authService.isAuthenticated()){
        this.messageService.add({severity:'error', summary:'', detail:'Email o contraseña incorrectas', life: 3000});
        this.blockedDocument = false;
      }else{
        this.messageService.add({severity:'success', summary:'', detail:'Acceso correcto', life: 3000});
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
