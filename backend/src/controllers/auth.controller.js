const userModel = require('../models/user.model')
const crypto  = require('crypto')
const jwt = require('jsonwebtoken')





// Register controller function 
async function registerController (req , res){
    const { email , username , password , bio , profileImage } = req.body


    // Cheecking if any user already exists by same email or username 
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

 if (isUserAlreadyExists){
    return res.status(409).json({
        message : "User Already Exists"
    })
 }

// hashing  the password and creating new user 
const hash = crypto.createHash('sha256').update(password).digest('hex')

const user = await userModel.create({
    username ,
    email ,
    bio ,
    profileImage ,
    password : hash 
})


// creating token for user 
const token  = jwt.sign({
    /* conditions for jwt taoken are  -  1 is user ka data hona chaiye and  2nd is  data unique hona chaiye  */
id : user._id ,
username : user.username
},
 process.env.JWT_SECRET ,
 {expiresIn: process.env.JWT_EXPIRE})

res.cookie('token', token)

res.status(201).json({
    message: 'User Registered Successfully ' ,
    user : {
        email : user.email ,
        username : user.username ,
        bio : user.bio ,
        profileImage : user.profileImage
    }
})



}




// Login controller function 
async function loginController(req, res)  {
const { username , email , password} = req.body


// Any user can login via email and passowrd and by username and password
const user = await userModel.findOne({
    $or:[
        {username: username},
        {email : email}
    ]
    
})

if(!user) {
    return res.status(404).json({
        message:"User not found"
    })
}

// Checking password
const hash = crypto.createHash('sha256').update(password).digest('hex')

const isPassword = hash === user.password

if(!isPassword){
    return res.status(401).json({
        message : "Password Invalid"
    })
}
    const token = jwt.sign(
        {id : user._id , username : user.username} ,
        process.env.JWT_SECRET ,
    { expiresIn:process.env.JWT_EXPIRE}
    )

res.cookie('token' , token)

res.status(200).json({
    message: "User loggedIn successfully",
    user : {
        username: user.username ,
        email : user.email ,
        bio : user.bio ,
        profileImage : user.profileImage
    }
})

}


// Get-Me controller function 
async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}



module.exports = { registerController , loginController, getMeController}