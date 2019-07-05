import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SharedModule,AuthModule,MongooseModule.forRoot('mongodb://localhost/nest'), PostModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

 }
