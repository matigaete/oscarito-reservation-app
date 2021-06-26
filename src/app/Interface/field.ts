import { FieldType } from "./field-type";

export interface Field {
    idState: number,
    fieldType: FieldType,
    amount: number,
    idField?: number | undefined
}
