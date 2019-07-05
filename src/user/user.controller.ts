import { Controller, Post, Get, Delete, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../shared/users.service'
import { Roles } from 'src/utility/decoratore/role.decorator';
import { RolesGuard } from 'src/guard/role.guard';
@Controller('user')
export class UserController {
    constructor(private readonly userSevice: UsersService) { }
    @UseGuards(RolesGuard)
    @Roles('admin')
    @Get('Index')
    async getAll(): Promise<any> {
        return await this.userSevice.getAll();
    }
}
