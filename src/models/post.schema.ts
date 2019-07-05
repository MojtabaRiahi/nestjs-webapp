import * as mongoose from 'mongoose'

export const postSchema=new mongoose.Schema({
    title:{
        type:String,
        maxlength:50,
        minlength:3
    },
    imageUrl:{
        type:String,
    },
    description:{
        type:String,
        maxlength:500,
        minlength:3
    },
    addDate:{
        type:Date,
        default:Date.now
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User' 
    },
    
    
})