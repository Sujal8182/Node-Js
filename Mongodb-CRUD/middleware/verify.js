const jws = require("jsonwebtoken")
const dotenv = require("dotenv")
const User = require("../model/MongoSchema")
dotenv.config()

exports.isAuth = async (req,res,next)=>{
    const { Token } = req.cookies
    console.log(Token)
        if(!token){
            return res.status(404).json({message : "User is not authenticated"})
        }
        const decoded = jws.verify(token,process.env.JWS_CODE)
        req.user = await User.findById(decoded.id)
        if(!req.user){
            return res.status(404).json({message : "User no longer exists"})
        }
        next()
}
