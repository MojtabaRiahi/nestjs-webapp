import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterDto } from 'dist/auth/dto/register.dto';
import { HttpException } from '@nestjs/common';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  
  });
  describe('register method', async () => {
    let user;
    beforeEach(async () => {
       user = {
      fullname:{
        firstName:'mojtaba',
        lastName:'riahi'
      },
      password:'12',
      email:'mojtaba@gmail.com'
      }
    })
    //register method:
    //if register dto is not valide should return error 401
    //if username is exist return error 401
    //if token not valide return error 401
    // if valide data return 200
    // it('should return 401 if register dto not valide', () => {
    //   const result=controller.register(user);
    //   expect(result).toEqual(HttpException);
    // })
  })
});

