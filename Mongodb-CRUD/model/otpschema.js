const mongoose = require("mongoose")

const otpschema = new mongoose.Schema({
       
        email : {
            type : String,
            required : [true, "Email is require"],
            unique : true
        },
        otp : {
            type: String,
        },
        expireAt :{
            type : Date
        }
},{timestamps : true})

module.exports = mongoose.model("OTP", otpschema)