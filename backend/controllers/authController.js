const User = require("../models/User")

const authenticateUser = async (req,res)=>{
    const responseObj={
        error:false,
        authenticated:false,
        message:""
    }
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user || user.password===req.body.password){
            responseObj.error=true
            responseObj.message="Credentials Invalid!!"
            res.end(JSON.stringify(responseObj))
            return
        }
        else{
            responseObj.authenticated=true
            responseObj.message="Loggin' In"
            responseObj.userId=user._id
            req.session.userEmail=req.body.email
            res.end(JSON.stringify(responseObj))
        }
    } catch (e){
        res.end(JSON.stringify(responseObj))
        console.log(e)
    }

}


const logoutUser = async (req,res)=>{
    req.session.userEmail&&req.session.destroy()
    res
    .status(200)
    .json({
        error:false,
        message:"User Logged Out"
    })
}

module.exports={authenticateUser,logoutUser}