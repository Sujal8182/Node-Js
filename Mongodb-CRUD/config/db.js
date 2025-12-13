const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

exports.connectDB = ()=>{
    try {
        mongoose.connect(process.env.DBurl)
        .then(()=> console.log("it is connecting successfully"))
        .catch(()=> console.log("failed to connect"))
    } catch (error) {
        console.error("Something went wrong..", error)
    }
}


