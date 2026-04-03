const { default: ImageKit, toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const postModel = require('../models/post.model')




const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

async function createPostController(req, res) {
  console.log(req.body, req.file)

const token  = req.cookies.token

if(!token){
  return res.status(401).json({
    message : 'Token Invalid , Unauthorized access ...'
  })
}

let decoded = null ;

try{
  decoded = jwt.verify(token , process.env.JWT_SECRET)
} catch (err){
  res.status(401).json({
    message:"User not Authorized ..."
  })
}


console.log(decoded)




  //  .files.upload() aur toFile(buffer) - latest SDK
  const file = await imagekit.files.upload({
    file: await toFile(req.file.buffer, 'file'),
    fileName: 'Test',
    folder : 'Insta-Clone'
  })




  // CREATING AN POST 
  const post = await postModel.create({
    caption : req.body.caption ,
    imageUrl : file.url ,
    user : decoded.id 
  })

  res.status(201).json({
    message : " Post created successfully " ,
    post
  })
}


async function getPostController(req, res) {

const token = req.cookies.token 

 if (!token){
  return res.status(401).json({
    message:"UnAuthorized Access ..."
  })
}



let decoded ;
try{
  decoded = jwt.verify(token , process.env.JWT_SECRET)

}catch (err){
  res.status(401).json({
    message : "Token Invalid"
  })
}

const userId = decoded.id

const posts = await postModel.find({
  user : userId
})

res.status(200).json({
  message : 'Posts fetched successfully' ,
  posts 
})


}


async function getPostDetailsController(req, res) {

const token = req.cookies.token 


 if (!token){
  return res.status(401).json({
    message:"UnAuthorized Access ..."
  })
}

let decoded ;
try {
decoded = jwt.verify(token , process.env.JWT_SECRET)
}catch (err){
  res.status(401).json({
    message:"Invalid Token"
  })
}


const userId = decoded.id 
const postId = req.params.postId


const post = await postModel.findById(postId)

if(!post){
  return res.status(404).json({
    message: 'Post not found !'
  })
}

const isValidUser = post.user.toString() === userId

if(!isValidUser){
  return res.status(403).json({
    message:"Forbidden Content."
  })
}

res.status(200).json({
message:'Post fetched successfully ',
post 
})




}














module.exports = {
  createPostController ,
  getPostController ,
  getPostDetailsController

}