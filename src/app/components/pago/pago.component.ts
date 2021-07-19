import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/Interface/reservation';
import { User } from 'src/app/Interface/user';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  @Input() reservation: Reservation = { user : {}, date: new Date(), idBlock: 0 };

  user: User;
  showAllMethod: boolean = true;

  constructor(private authService: AuthService) { 
    this.user = this.authService.getLocalUser()!;
  }

  ngOnInit(): void {

    if(this.user.userType?.idUserType! === 3){
      this.showAllMethod = false;
    }
  }

  pay(method: String){
    console.log('método:', method, 'reserva:', this.reservation.idReservation!);
  }

}
