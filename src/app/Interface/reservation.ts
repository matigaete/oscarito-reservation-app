export interface Reservation {
    idUser: number,
    date: Date,
    idPayment: number,
    idState: number,
    initTime: number,
    finalTime: number,
    idField?: number | undefined
}
