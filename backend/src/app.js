// SERVER CREATE KARNA AND SERVER CONFIG KARNA 

const express = require('express')
const cookieParser = require('cookie-parser')
const auhtRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
const identifyingUser = require('./middlewares/auth.middleware')






const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth' , auhtRouter)
app.use('/api/posts' , identifyingUser ,postRouter)





module.exports = app 