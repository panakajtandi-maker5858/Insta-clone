const jwt = require('jsonwebtoken')



async function identifyingUser (req ,res , next ){

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

req.user = decoded

next()

}

module.exports = identifyingUser