export interface Reservation {
    idUser: number,
    date: Date,
    idBlock: number,
    idState: number,
    idPayment?: number, 
    idField?: number | undefined
}
