const jws = require("jsonwebtoken")
const dotenv = require("dotenv")


dotenv.config()

exports.Tokengenerate =  (id,res)=>{
    const token = jws.sign({id}, process.env.JWS_CODE, {
        expiresIn : process.env.JWS_EXPIRE
    })

    const options = ({
        expiresIn : new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
        httpOnly : true
    })

    res.cookie("Token",token,options)
}