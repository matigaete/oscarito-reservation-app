import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Payment } from 'src/app/Interface/payment';
import { Reservation } from 'src/app/Interface/reservation';
import { StateReservation } from 'src/app/Interface/reservation-state';
import { User } from 'src/app/Interface/user';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ReservationService } from 'src/app/Services/reservation.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  @Input() reservation: Reservation = { user : {}, date: new Date(), idBlock: 0 };
  @Output() closeModalEvent = new EventEmitter<boolean>();

  user: User;
  showAllMethod: boolean = true;
  isPayOk: boolean = false;

  constructor(private authService: AuthService,
              private reservartionService: ReservationService,
              private confirmationService: ConfirmationService) { 
    this.user = this.authService.getLocalUser()!;
  }

  ngOnInit(): void {

    if(this.user.userType?.idUserType! === 3){
      this.showAllMethod = false;
    }
  }

  confirmPay(method: string){
    this.confirmationService.confirm({
        message: `¿Proseguir con el pago de $${this.reservation.field?.amount!} utilizando ${method}?`,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.pay(method);
        }
    });
  }

  pay(method: string){
    let pay : Payment = { idPayment:0, method: method, value: this.reservation.field?.amount! };
    let stateReservation: StateReservation = { idState: 1, description: 'Reservado' };
    this.reservation.payment = pay;
    this.reservation.state = stateReservation;
    this.reservartionService.payReservation(this.reservation)
                            .subscribe();
    this.isPayOk = true;
  }

  closeDialog(){
    this.closeModalEvent.emit(true);
  }

}
