import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { User } from '../type/user.interface'
import { FullNameDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/dto/jwt.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    //get all users
    async getAll(): Promise<User[]> {
        try {
            const user = await this.userModel.find().select('-password');
            //user.forEach(user => this.deletePassword(user))
            return user;
        } catch (ex) {
            return ex;
        }
    }
    //create new user
    async create(registerDto: FullNameDto): Promise<User> {
        const user = registerDto;
        try {
            const result = await this.verifyEmail(user.email);
            if (result) {
                const createUser = new this.userModel(user);
                this.setProperty(createUser, user);
                await createUser.save();
                return this.deletePassword(createUser);
            }
        } catch (ex) {
            return ex;
        }

    }
    //set property
    setProperty(createUser: User, user: FullNameDto): void {
        createUser.fullName.firstName = user.firstName;
        createUser.fullName.lastName = user.lastName;
    }
    //verify Email
    async verifyEmail(email: string): Promise<boolean> {
        const checkEmail = await this.userModel.findOne({ email: email });
        if (checkEmail) {
            throw new HttpException('this username isalready exist', HttpStatus.UNAUTHORIZED)
        }
        return true;
    }
    async findByEmail(payload: JwtPayload) {
        const user = await this.userModel
            .findOne({ email: payload.email })
    }
    //login
    async findUserByEmail(userDto: LoginDto): Promise<any> {
        try {
            const user = await this.userModel
                .findOne({ email: userDto.email })
                .select('_id role firstName lastName email password');
            if (!user) {
                throw new HttpException('error', HttpStatus.UNAUTHORIZED);
            }
            if (await bcrypt.compare(userDto.password, user.password)) {
                return this.deletePassword(user);
            } else {
                throw new HttpException('error', HttpStatus.UNAUTHORIZED);
            }
        } catch (ex) {

            throw new HttpException(ex, HttpStatus.BAD_REQUEST);
        }
    }
    deletePassword(user: any) {
        let userObj = user.toObject();
        delete userObj['password']
        return userObj;
    }
}
