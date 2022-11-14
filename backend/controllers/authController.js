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

module.exports={authenticateUser}