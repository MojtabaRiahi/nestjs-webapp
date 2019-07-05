import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/type/user.interface';
import { Model } from 'mongoose'
import { Post } from 'src/type/post.interface';
import { PostDto } from './dto/post.dto';
import { User as UserDocument } from '../type/user.interface'
@Injectable()
export class PostService {
    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }
    async createPost(postDto: PostDto, userId: string): Promise<Post> {
        let newPost;
        try {
            newPost = await this.postModel.create({
                ...postDto,
                owner: userId
            });
            await newPost.save();
        } catch (ex) {
            console.log(ex)
            return ex
        }
        return newPost.populate('owner');
    }
}
