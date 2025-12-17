const express = require("express")
const dotenv = require("dotenv")
const router = require("./routes/movieroutes")
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use('/api/movies', router)


app.listen(process.env.PORT, ()=>{
    console.log(`Working on server ${process.env.PORT}`)
})