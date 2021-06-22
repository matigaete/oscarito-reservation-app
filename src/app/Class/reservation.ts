export class Reservation {

    constructor(private _idUser: number,
        private _date: Date,
        private _idPayment: number,
        private _idState: number,
        private _initTime: number,
        private _finalTime: number,
        private _idField?: number | undefined) {
    }

    public get idField(): number | undefined {
        return this._idField;
    }
    public set idField(value: number | undefined) {
        this._idField = value;
    }
    public get finalTime(): number {
        return this._finalTime;
    }
    public set finalTime(value: number) {
        this._finalTime = value;
    }
    public get initTime(): number {
        return this._initTime;
    }
    public set initTime(value: number) {
        this._initTime = value;
    }
    public get idState(): number {
        return this._idState;
    }
    public set idState(value: number) {
        this._idState = value;
    }
    public get idPayment(): number {
        return this._idPayment;
    }
    public set idPayment(value: number) {
        this._idPayment = value;
    }
    public get date(): Date {
        return this._date;
    }
    public set date(value: Date) {
        this._date = value;
    }
    public get idUser(): number {
        return this._idUser;
    }
    public set idUser(value: number) {
        this._idUser = value;
    }

}
