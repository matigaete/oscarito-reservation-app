export interface Schedule {
    idSchedule: number,
    idField?: number,
    date?: Date,
    initTime?: Date,
    finalTime?: Date,
    available?: boolean
}
