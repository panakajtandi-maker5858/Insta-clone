const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username : {
        type : String ,
        unique : [ true , "Username already exists"],
        required : [ true , "Username is requried"]
    },

  email : {
    type : String ,
    unique : [true , "Email already exists"],
    required: [ true , 'Email is required']
  } ,

  password :{
    type : String ,
required : [ true , "Password is required"]
  } ,

  bio : String ,

  profileImage: {
    type : String ,
    default: 'https://ik.imagekit.io/qz0i01cnk5/insta-deafult.jpg'
  }

})

const userModel = mongoose.model('users' , UserSchema)

module.exports = userModel