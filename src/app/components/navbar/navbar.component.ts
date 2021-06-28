import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  //Items para menubar
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.armarMenu();
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
          {label: 'Ver'}
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
            {label: 'Perfil'},
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

}
