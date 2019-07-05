import { Controller, HttpException, Get, Post, Put, Delete, Body, Header, UsePipes } from '@nestjs/common';
import { validate } from 'class-validator'
import { FullNameDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/shared/users.service';
import { AuthService } from './auth.service';
import { ValidationPipe } from '../utility/validationPipe'
@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) { }
    
    // @Post('register')
    // async register(@Body() registerDto: FullNameDto): Promise<any> {    
    //     const error = await validate(registerDto)
    //     if(error.length>0) return error
    //     const result = await this.usersService.create(registerDto);

    //     const payload: Payload = {
    //         email: result.email,
    //         role: result.role
    //     }
    //     const token = await this.authService.signUser(payload);
    //     return { result, token };
    // }

    // @Post('login')
    // @UsePipes(new ValidationPipe())
    // async login(@Body() loginDto:LoginDto):Promise<any>{
    //     const error=await validate(loginDto)
    //     if(error.length>0) return error;
    //     const user=await this.usersService.findUserByEmail(loginDto);
    //     const payload:Payload={
    //         email:user.email,
    //         role:user.role
    //     }
    //     const token=await this.authService.signUser(payload);
    //     return {user,token}
    // }

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() registerDto: FullNameDto): Promise<any> {
        let token;
        const result = await this.usersService.create(registerDto);
        token = await this.authService.createToken(result)
        return { result, token };
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() loginDto: LoginDto): Promise<any> {
        let token;
        const user = await this.usersService.findUserByEmail(loginDto);
        token = await this.authService.createToken(user);
        return { user, token };
    }
    

}
