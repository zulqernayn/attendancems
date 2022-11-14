// GET requests

const getUserAttendance = async (req,res)=>{
    console.log(req.path)
    const user=await User.findOne({email:req.session.userEmail})
    res.status(200).json({
        error:false,
        result:user.attendance
    })
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

module.exports={getUserAttendance,markTodaysAttendance}