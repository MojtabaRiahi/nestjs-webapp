  import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SharedModule } from 'dist/shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[SharedModule,AuthModule],
  controllers: [UserController]
})
export class UserModule {}
