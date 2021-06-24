import { Field } from "./field";

export interface Schedule {
    idSchedule: number,
    field?: Field,
    date?: Date,
    initTime?: Date,
    finalTime?: Date,
    available?: boolean
}
