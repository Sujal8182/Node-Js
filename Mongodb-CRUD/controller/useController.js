const bcrypt = require("bcryptjs")
const User = require("../model/MongoSchema")
const OTP = require("../model/otpschema")
const { Tokengenerate } = require("../utils/token")
const { options } = require("../routes/useRoutes")
const { SendOTP } = require("../utils/sendOTP")

const register = async (req,res)=>{
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({ message : "field is required"})
        }

        
        
        const Extuser = await User.findOne({email})
        if(Extuser){
            return res.status(404).json({message : "user already exists", Extuser})
        }
        
        const HashPass = await bcrypt.hash(password,10)
        const newUser = await User.create({
            name,
            email,
            password : HashPass
        })
        const token = Tokengenerate(newUser._id,res)
        res.status(201).json({ message : "successfully created ", 
            newUser,    
            token
        })

    }
     catch (error) {
        console.error(error)
    }
    
}

const login = async (req,res)=>{
    try {
        
        const { email, password} = req.body
    
        if(!email && !password){
            return res.status(404).json({message : "All fields are required"})
        }


        const user = await User.findOne({email}).select("+password")

        if(!user){
            res.status(404).json({message : "User not found"})
    
        }

        const Pass = await bcrypt.compare(password, user.password)

        if(!Pass){
            res.status(404).json({ message : "Password doest not match"})
        }

        res.status(201).json({message : "Login successfully", user})
    } 
    catch (error) {
        console.error(error)
    }
    
}

const getall = async (req,res)=>{
    try {
        
        const id = req.params.id
    
        const Get = await User.find()
    
        if(!Get){
            return res.status(404).json({ message : "Don't have any data"})
        }

        res.status(201).json({success : true, Get})
    } catch (error) {
        console.error(error)
    }
}

const getbyId = async(req,res) =>{
    try {
        const id = req.params.id

        const GetId = await User.findById(id)

        if(!GetId){
            return res.status(401).json({message : "Doesn't exist"})
        }
        res.status(201).json({success : true, GetId})

    } catch (error) {
        console.error(error)
    }
}

const update = async (req,res)=>{
    try {
        const { name , email} = req.body
        if(!name && !email){
            return res.status(404).json({message : "All fields are require"})
        }

        const Id = req.params.id
        
        const GetUser = await User.findByIdAndUpdate(Id, {name , email}, {
            runValidators : true,
            new : true
        })

        res.status(201).json({ message : "Updated succesfully", GetUser})

    } catch (error) {
        console.error(error)
    }
}

const Delete = async(req,res)=>{
    const Id = req.params.id

    const user = await User.findByIdAndUpdate(Id)
    if (!user){
        return res.status(404).json({message : "Didn't found"})
    }
    res.status(201).json({ message : "Deleted Successfully"})
}

const adminLogin = async (req,res)=>{
    try {
        
        const { email, password} = req.body
    
        if(!email && !password){
            return res.status(404).json({message : "All fields are required"})
        }


        const user = await User.findOne({email, isAdmin : true}).select("+password")

        if(!user){
            res.status(404).json({message : "User not found"})
    
        }

        const Pass = await bcrypt.compare(password, user.password)

        if(!Pass){
            res.status(404).json({ message : "Password doest not match"})
        }

        res.status(201).json({message : "Login successfully", user})
    } 
    catch (error) {
        console.error(error)
    }
    
}

const forgotpassword = async(req,res)=>{
    const {email } = req.body

    if(!email){
        res.status(404).json({message : "Email is required"})
    }
    const otp = Math.floor(10000 +Math.random * 900000).toString()
    await OTP.findOneAndUpdate({email},
        {email, otp, expireAt : Date.now() + 10 * 60 * 1000},
        {upsert : true}
    )
    await SendOTP({
        email,
        subject : "OTP for password reset",
        text : `OTP ${otp}`,
    });
    res.status(201).json({message : "OTP send successfully"})
}

module.exports = {
    register, login,
    getall, getbyId,
    update, Delete,
    adminLogin
}