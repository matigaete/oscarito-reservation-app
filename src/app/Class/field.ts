export class Field {

    constructor(private _idState: number,
        private _idType: number,
        private _amount: number,
        private _idField?: number | undefined) {
    }
    
    public get idField(): number | undefined {
        return this._idField;
    }
    public set idField(value: number | undefined) {
        this._idField = value;
    }
    public get amoun(): number {
        return this._amount;
    }
    public set amount(value: number) {
        this._amount = value;
    }
    public get idType(): number {
        return this._idType;
    }
    public set idType(value: number) {
        this._idType = value;
    }
    public get idState(): number {
        return this._idState;
    }
    public set idState(value: number) {
        this._idState = value;
    }
    
}
