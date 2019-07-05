import {Document} from 'mongoose'
export interface Post extends Document{
  title:string;
  description:string;
  addDate:Date;
  userId:string;  
  imageUrl:string;
}