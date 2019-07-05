import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose'
import {userSchema} from '../models/user.schema'
import { UsersService } from './users.service';
import {PassportModule} from '@nestjs/passport'
@Module({
    imports:[MongooseModule.forFeature([{ name:'User' ,schema:userSchema}])],
    providers:[UsersService],
    exports: [UsersService]
})
export class SharedModule {}
