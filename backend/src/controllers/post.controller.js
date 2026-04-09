const { default: ImageKit, toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const postModel = require('../models/post.model')
const likeModel = require('../models/like.model')





const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

async function createPostController(req, res) {
  console.log(req.body, req.file)


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
    user : req.user.id
  })

  res.status(201).json({
    message : " Post created successfully " ,
    post
  })
}


async function getPostController(req, res) {


const userId = req.user.id

const posts = await postModel.find({
  user : userId
})

res.status(200).json({
  message : 'Posts fetched successfully' ,
  posts 
})


}


async function getPostDetailsController(req, res) {




const userId = req.user.id
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


async function likePostController (req , res) {

const username = req.user.username 
const postId = req.params.postId

const post = await postModel.findById(postId)

if(!post){
  return res.status(404).json({
    message : 'Post not found !'
  })
}

const isPostAlreadyLiked = await likeModel.findOne({
    post : postId ,
    user : username
})

if(isPostAlreadyLiked){
    return res.status(200).json({
        message : `You have already liked the post ` 
      
    })
}

const like = await likeModel.create({
  post : postId ,
  user : username 
})

res.status(200).json({
  message : 'Post liked successfully .' ,
  like 
})



}

async function unLikePostController(req, res) {
    const postId = req.params.postId
    const username = req.user.username

    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    })

    if (!isLiked) {
        return res.status(400).json({
            message: "Post didn't like"
        })
    }

    await likeModel.findOneAndDelete({ _id: isLiked._id })

    return res.status(200).json({
        message: "post un liked successfully."
    })
}



async function getFeedController ( req, res){

  const user = req.user 

const posts = await Promise.all(( await postModel.find().populate("user").lean())
  .map(async (post)=>{
    const isLiked = await likeModel.findOne({
      user : user.username ,
      post : post._id 
    })
    post.isLiked  = Boolean(isLiked)
    return post

  })
)

res.status(200).json({
  message : 'Posts fetched successfully' ,
  posts 
})

}




module.exports = {
  createPostController ,
  getPostController ,
  getPostDetailsController ,
  likePostController ,
   unLikePostController ,
  getFeedController

}