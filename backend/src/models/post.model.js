const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type:String ,
        default:""
    },

    imageUrl :{
        type : String ,
        default : [ true , "ImageUrl is required for creating a post "]
    } ,

    user: {
        ref: 'users',
        type : mongoose.Schema.ObjectId ,
        required : [true , "UserId is requried for creating a post "]
    }
})

const postModel = mongoose.model('posts' , postSchema)



module.exports = postModel

