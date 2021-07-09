import { unescapeIdentifier } from "@angular/compiler";
import { Field } from "./field";
import { Payment } from "./payment";
import { StateReservation } from "./reservation-state";
import { Schedule } from "./schedule";

export interface Reservation {
    idReservation?: number,
    idUser: number,
    date: Date,
    idBlock: number | undefined,
    field?: Field | undefined,
    payment?: Payment | undefined,
    state?: StateReservation | undefined,
    schedule?: Schedule | undefined
}
 