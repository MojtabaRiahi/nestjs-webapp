import {IsString,IsEmail,MaxLength,MinLength,} from 'class-validator'
import { isString } from 'util';
export class LoginDto{
    @IsString()
    @IsEmail()
    @MaxLength(300)
    email:string;
    @IsString()
    @MaxLength(20)
    @MinLength(5)
    password:string;
}