const express = require('express')
const authRouter = express.Router()
const { registerController , loginController} = require('../controllers/auth.controller')





// FOR REGISTER
authRouter.post('/register', registerController )


// FOR LOGIN
authRouter.post('/login' , loginController )
module.exports = authRouter
