const getDashboardData = async (req,res)=>{
    const user=await User.findOne({email:req.session.userEmail})
    if(user){
        const isTodayMarked=!!user.attendance.find(date=>new Date(date).toDateString()===new Date().toDateString())
        res
        .status(200)
        .json({
            email:user.email,
            name:user.name,
            isTodayMarked
        })
    } else{
        res
        .status(404)
        .json({
            error:true,
            message:"No data found for the current user!"
        })
    }
}

module.exports={getDashboardData}