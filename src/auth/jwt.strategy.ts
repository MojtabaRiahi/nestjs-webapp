import { PassportStrategy } from '@nestjs/passport'
import { Injectable,HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Strategy, ExtractJwt,VerifiedCallback } from 'passport-jwt'
import { JwtPayload } from 'src/auth/dto/jwt.dto';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        })
    }
    async validate(payload: JwtPayload,done: VerifiedCallback) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done(
                new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
                false,
              );
        }
        return done(null, user, payload.email);
    }
}

