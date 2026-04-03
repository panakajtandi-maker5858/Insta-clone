const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require('multer') // It gives the power or capability to the server to read the files like img , etc,. 
const upload = multer({ storage: multer.memoryStorage()}) // memoryStorage means temporaray sever pe store ho gyi but permanent aggi bej di gyi permanenet storgae tak likewise : S3 , imagekit , cloudinary







// FOR POSTING
postRouter.post('/', upload.single('image') , postController.createPostController )



// FOR FETCHING ALL POSTS FOR PARTICULAR USER 
postRouter.get('/' , postController.getPostController)


// FOR FETCHING UNIQUE POST OF UNIQUE USER 
postRouter.get('/details/:postId' , postController.getPostDetailsController)


module.exports = postRouter