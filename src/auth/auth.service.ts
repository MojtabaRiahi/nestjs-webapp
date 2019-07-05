import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/shared/users.service';
import { Payload } from '../type/payload.interface'
import { JwtPayload } from '../auth/dto/jwt.dto'
@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService) { }
    async signUser(payload: Payload) {
        //return await sign(payload, 'MyKey', { expiresIn: '12h' })
        return await this.jwtService.sign(payload);
    }
    async validateToken(token: string) {
        try {
            return await this.jwtService.verify(token);

        } catch (ex) {
            return ex;
        }
    }
    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.findByEmail(payload)
    }
    async createToken(result: any): Promise<string> {
        let token;

        if (result._id) {
            const payload: Payload = {
                id: result._id,
                role: result.role
            }
            token = await this.signUser(payload);
            return token;
        }
        throw new HttpException('error', HttpStatus.UNAUTHORIZED)


    }
}
