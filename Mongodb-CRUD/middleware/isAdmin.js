
exports.isAdmin = async (req,res,next)=>{
    try {
        req.user = user.isAdmin

        if(!req.user || !user.isAdmin){
            return res.status(404).json({message : "Admin not found"})
        }
        next()
    } catch (error) {
        console.error("something went wrong", error)
    }
}