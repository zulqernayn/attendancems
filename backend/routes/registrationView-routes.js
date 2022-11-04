const createUser = async (req,res)=>{
    const {email,name,password}=req.body
    try{
        const user=await User.create({email,name,password})
        res.end(JSON.stringify({
            error:false,
            code:200,
            userCreated:true,
            message:"User created!",
            userId:user._id
        }))
    } catch (e){
        res.end(JSON.stringify({
            error:true,
            code:e.code,
            userCreated:false,
            message:e.code===11000?"Email already exists!":e.message,
            userId:null
        }))
        console.error(e)
    }
}

module.exports={createUser}