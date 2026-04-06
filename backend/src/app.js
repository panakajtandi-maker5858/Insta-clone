// SERVER CREATE KARNA AND SERVER CONFIG KARNA 

const express = require('express')
const cookieParser = require('cookie-parser')
const auhtRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
const identifyingUser = require('./middlewares/auth.middleware')
const userRouter = require('./routes/user.routes')
const cors = require('cors')








const app = express()

app.use(cors({
    origin:'http://localhost:5173' ,
    credentials : true 
}))

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth' , auhtRouter)
app.use('/api/posts' , identifyingUser ,postRouter)
app.use('/api/users' , userRouter)




module.exports = app 