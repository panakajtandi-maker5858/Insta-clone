const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require('multer') // It gives the power or capability to the server to read the files like img , etc,. 
const identifyingUser = require('../middlewares/auth.middleware')
const upload = multer({ storage: multer.memoryStorage()}) // memoryStorage means temporaray sever pe store ho gyi but permanent aggi bej di gyi permanenet storgae tak likewise : S3 , imagekit , cloudinary







// FOR POSTING
postRouter.post('/', upload.single('image') ,identifyingUser,  postController.createPostController )



// FOR FETCHING ALL POSTS FOR PARTICULAR USER 
postRouter.get('/' ,identifyingUser , postController.getPostController)


// FOR FETCHING UNIQUE POST OF UNIQUE USER 
postRouter.get('/details/:postId' ,identifyingUser ,  postController.getPostDetailsController)


// TO LIKE ANY POST BY THE USER 
postRouter.post('/like/:postId' , identifyingUser , postController.likePostController)


// TO GET ALL THE POSTS CREATED IN DB 
postRouter.get("/feed" , identifyingUser , postController.getFeedController)













module.exports = postRouter