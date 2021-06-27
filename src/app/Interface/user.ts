import { UserType } from "./user-type";

export interface User{
    idUser? : number,
    userType? : UserType,
    name? : string,
    lastName? : string,
    email? : string,
    phone? : number,
    password? : string
}