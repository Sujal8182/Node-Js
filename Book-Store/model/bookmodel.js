const mongoose = require("mongoose")

const bookschema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model("Book", bookschema)