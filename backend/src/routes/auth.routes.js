const express = require('express')
const authRouter = express.Router()
const { registerController , loginController ,getMeController} = require('../controllers/auth.controller')
const identifyingUser = require('../middlewares/auth.middleware')





// FOR REGISTER
authRouter.post('/register', registerController )


// FOR LOGIN
authRouter.post('/login' , loginController )


// FOR GEETTING - ME
authRouter.get("/get-me", identifyingUser, getMeController)








module.exports = authRouter
