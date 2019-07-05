import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose'
import { postSchema } from '../models/post.schema'
import { AuthModule } from 'src/auth/auth.module';
import {PassportModule} from '@nestjs/passport'
@Module({
  imports: [MongooseModule.forFeature([{name: 'Post', schema: postSchema}]),AuthModule],
  controllers: [PostController],
  providers: [PostService]
})

export class PostModule { }
