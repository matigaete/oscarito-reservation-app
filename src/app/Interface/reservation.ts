import { unescapeIdentifier } from "@angular/compiler";
import { Field } from "./field";
import { Payment } from "./payment";
import { StateReservation } from "./reservation-state";
import { Schedule } from "./schedule";

export interface Reservation {
    idUser: number,
    date: Date,
    idBlock: number,
    idState?: number | undefined,
    idPayment?: number, 
    idField?: number | undefined,
    field?: Field | undefined,
    payment?: Payment | undefined,
    state?: StateReservation | undefined,
    schedule?: Schedule | undefined
}
