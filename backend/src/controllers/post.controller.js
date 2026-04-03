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

module.exports = createPostController