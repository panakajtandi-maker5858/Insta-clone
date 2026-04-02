const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require('multer') // It gives the power or capability to the server to read the files like img , etc,. 
const upload = multer({ storage: multer.memoryStorage()}) // memoryStorage means temporaray sever pe store ho gyi but permanent aggi bej di gyi permanenet storgae tak likewise : S3 , imagekit , cloudinary







// FOR POSTING
postRouter.post('/', upload.single('image') , postController )


module.exports = postRouter