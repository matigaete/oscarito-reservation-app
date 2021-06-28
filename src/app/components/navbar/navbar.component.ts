import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ConfirmationService, Message } from 'primeng/api';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  checked : boolean = false;
  perfilDialog : boolean = false;
  userConnect: any;

  //Items para menubar
  items: MenuItem[] = [];
  msgs: Message[] = [];

  constructor(private authService: AuthService,
              private userService: UserService,
              private confirmationService: ConfirmationService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.armarMenu();
    this.userConnect = this.authService.getLocalUser();
  }

  armarMenu(){
    this.items = [
      {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/home']},
      {
        label: 'Reserva', 
        icon: 'pi pi-fw pi-pencil',
        visible: this.authService.isAuthenticated(),
        items: [
          {label: 'Solicitar', routerLink: ['/reservar']},
          {label: 'Ver', routerLink: ['/verReservas']} 
        ]
      },
      {
          label: 'Mi cuenta',
          icon:'pi pi-fw pi-user',
          routerLink: ['/login'],
          visible: !this.authService.isAuthenticated()
      },
      {
          label: 'Mi cuenta',
          icon:'pi pi-fw pi-user',
          visible: this.authService.isAuthenticated(),
          items: [
            {label: 'Perfil', command: () => {
              this.perfilDialog = true;
            }},
            {label: 'Salir', command: () => {
              this.authService.logout();
              window.location.hash = '';
              this.router.navigateByUrl('/home').then(() => {
                window.location.reload();
              });
            }}
          ]
      }
    ];
  }

  editUser(){
    this.confirmationService.confirm({
      message: '¿Segur@ quieres modificar tu perfil?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.userService.updateSchedule(this.userConnect).subscribe();
          this.authService.updateUserLocal(this.userConnect);
          this.msgs = [{
              severity: 'success', summary: '',
              detail: `Se ha realizado con éxito la modificación.`,
              life: 3000
            }];
          this.reload();
      }
    });   
  }

  hideDialog(){
    this.perfilDialog = false;
    this.userConnect = this.authService.getLocalUser();
  }

  reload(){
    setTimeout(() => {
      window.location.hash = '';
      this.router.navigateByUrl('/home').then(() => {
        window.location.reload();
      });
    }, 3000);
  }

}
