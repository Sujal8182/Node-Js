const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

exports.connectDB =  ()=>{
    try {
         mongoose.connect(process.env.URL)
        .then(()=> console.log("connected successfully"))
        .catch((err)=> console.log("failed to connect", err))
    } catch (error) {
        console.error("Server Error !", error)
    }
}