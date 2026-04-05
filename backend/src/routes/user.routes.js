const express = require('express')
const userController = require('../controllers/user.controller')
const identifyingUser = require('../middlewares/auth.middleware')





const userRouter = express.Router()


// FOLLOW AND UNFOLLOW API'S 
userRouter.post('/follow/:username' , identifyingUser , userController.followUserController)
userRouter.post('/unfollow/:username' , identifyingUser , userController.unfollowUserController)







module.exports = userRouter ;
