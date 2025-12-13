const { urlencoded } = require("body-parser")
const express = require("express")
const { connectDB } = require("./db/database")
const dotenv = require("dotenv")
const bookRoutes = require("./routes/bookroutes")
dotenv.config()

const app = express()

app.use(express.json())
app.use(urlencoded({extended : true}))
connectDB();

app.use('/api/book', bookRoutes)
app.listen(process.env.PORT, ()=>{
    console.log(`Working on sever ${process.env.PORT}`);
    
})