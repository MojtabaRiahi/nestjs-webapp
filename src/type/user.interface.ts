import {Document} from 'mongoose'
export interface User extends Document{
    fullName:{
        firstName:string,
        lastName:string
    } ;
    readonly password: string;
    role:[string];
    email:string;
    created: Date;
}