import {IsString,MinLength,MaxLength} from 'class-validator'
export class PostDto{
    @IsString()
    @MaxLength(50)
    @MinLength(3)
    title:string;
    @IsString()
    @MaxLength(500)
    @MinLength(3)
    description:string;
    @IsString()
    imageUrl:string;
}