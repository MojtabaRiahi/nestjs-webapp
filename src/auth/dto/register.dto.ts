import {validate,IsString,IsEmail,MinLength,MaxLength,IsNotEmpty} from 'class-validator'
export class RegisterDto{
    @IsString()
    @MinLength(5)
    @MaxLength(300)
    @IsNotEmpty()
    @IsEmail()
    readonly email:string;
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    @IsNotEmpty()
    readonly password:string;  

}
export class FullNameDto extends RegisterDto{
    @IsString()
    @MinLength(5)
    @MaxLength(300)
    readonly firstName:string;
    @IsString()
    @MinLength(5)
    @MaxLength(300)
    readonly lastName:string;
}
