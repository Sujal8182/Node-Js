const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

exports.SendOTP = async (options)=>{

    transporter = nodemailer.createTestAccount({
        services : 'gmail',
        auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    
        mail : {
            to : options.email,
            from : process.env.ADMIN_EMAIL,
            subject : "OTP send",
            text : "OTP sended....",
        }
    })
    transporter.sendMail({mail})
}