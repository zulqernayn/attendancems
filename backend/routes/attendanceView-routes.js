const getUserAttendance = async (req,res)=>{
    console.log(req.path)
    const user=await User.findOne({email:req.session.userEmail})
    res.status(200).json({
        error:false,
        result:user.attendance
    })
}

module.exports={getUserAttendance}