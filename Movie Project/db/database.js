const mongoose = require("mongoose")

exports.connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/")
        .then(()=> console.log("connected succesfully"))
        .catch((err)=> console.log("someting went wrong", err))
    } catch (error) {
        console.error(error)
    }
}