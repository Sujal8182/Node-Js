const mongoose = require("mongoose")

const userSchma = new mongoose.Schema({
        name : {
            type : String,
            required : [true, "Name is require"]
        },
        email : {
            type : String,
            required : [true, "Email is require"],
            unique : true
        },
        password : {
            type : String,
            required : [true, "Password is require"],
            select : false 
        },
        isAdmin : {
            type : Boolean,
            default : false
        }
},{timestamps : true})

module.exports = mongoose.model("User", userSchma)