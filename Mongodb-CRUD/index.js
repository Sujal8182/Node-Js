const express = require("express")
const dotenv = require("dotenv")
const { connectDB } = require("./config/db")
const useRoutes = require("./routes/useRoutes")
const adminroutes = require("./routes/adminroutes")
const cookieParser = require("cookie-parser")
dotenv.config()


const app = express("")
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended : true}))

app.use('/api/users', useRoutes)
app.use('/api/admin', adminroutes)
app.use(cookieParser())

app.listen(process.env.PORT , ()=> {
    console.log(`It is working on : ${process.env.PORT}`);
    
})
