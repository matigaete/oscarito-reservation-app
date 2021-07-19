import { unescapeIdentifier } from "@angular/compiler";
import { Field } from "./field";
import { Payment } from "./payment";
import { StateReservation } from "./reservation-state";
import { Schedule } from "./schedule";
import { User } from "./user";

export interface Reservation {
    idReservation?: number,
    user: User,
    date: Date,
    idBlock: number | undefined,
    field?: Field | undefined,
    payment?: Payment | undefined,
    state?: StateReservation | undefined,
    schedule?: Schedule | undefined
}
 