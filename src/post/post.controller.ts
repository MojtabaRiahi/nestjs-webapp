import { Controller, Post, Get, Put, Body, UseGuards, Headers, Param, UsePipes, Request } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport'
import { User as UserDocument } from '../type/user.interface'
import { User } from '../utility/decoratore/user.decoratore'
import { ValidationPipe } from '../utility/validationPipe'
import { Roles } from '../utility/decoratore/role.decorator'
import { RolesGuard } from '../guard/role.guard'
import { AuthService } from 'src/auth/auth.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService, private readonly authService: AuthService) { }
    @UseGuards(RolesGuard)
    @Roles('admin')
    @Post('createPost')
    @UsePipes(new ValidationPipe())
    async createPost(@Body() postDto: PostDto, @User() user:any): Promise<any> {
        //const user = await this.authService.validateToken(token['auth-token']);
        return this.postService.createPost(postDto, user.id);
    }
}
