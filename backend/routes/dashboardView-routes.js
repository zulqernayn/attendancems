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

const markTodaysAttendance = async (req,res)=>{
    try{
        const result=await User.updateOne({email:req.session.userEmail},{
            "$addToSet":{attendance:new Date().toISOString()}
        })
        if(result.modifiedCount>0)
            res.status(200).json({error:false,message:"Attendance Marked!"})
        else 
            throw new Error("Server Error: Unable to mark attendance!")

    } catch (e){
        console.error(e)
        res.status(500).json({error:true,message:e.message})
    }

}

module.exports={getDashboardData,markTodaysAttendance}