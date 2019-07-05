import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '../shared/shared.module'
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [SharedModule, JwtModule.register({
    secretOrPrivateKey: 'secretKey',
    signOptions: {
      expiresIn: 3600,
    },
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
