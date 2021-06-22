export class Field {

    constructor(private _idState: number,
        private _idType: number,
        private _value: number,
        private _idField?: number | undefined) {
    }
    
    public get idField(): number | undefined {
        return this._idField;
    }
    public set idField(value: number | undefined) {
        this._idField = value;
    }
    public get value_1(): number {
        return this._value;
    }
    public set value_1(value: number) {
        this._value = value;
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
