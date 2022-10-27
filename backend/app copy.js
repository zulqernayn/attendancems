const mongoose = require("mongoose")
const express = require("express")
const User = require("./User")
const PORT = 5000

const app=express()

// mongoose.connect("mongodb+srv://nodeServer:IB5YRlpvCV4SMIUL@cluster0.n1cqz.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect("mongodb://nodeServer:IB5YRlpvCV4SMIUL@cluster0-shard-00-00.n1cqz.mongodb.net:27017,cluster0-shard-00-01.n1cqz.mongodb.net:27017,cluster0-shard-00-02.n1cqz.mongodb.net:27017/?ssl=true&replicaSet=atlas-k4u7us-shard-0&authSource=admin&retryWrites=true&w=majority")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Routes

app.get("/checktoday",async (req,res)=>{
    const today=new Date()
    const user=await User.findOne({
        email:req.query.email,
        [`attendance.${today.getFullYear()}.${today.getMonth()+1}`]:{"$in":[today.getDate()]}
    })
    if(user)
        res.end(JSON.stringify({marked:true}))
    else
        res.end(JSON.stringify({marked:false}))
})

app.get("/getRecord",async (req,res)=>{
    const records=await User.find({},"-v -_id")
    const response=[]
    records.map(record=>{
        const {email,password}=record
        const attendance=record.attendance["2022"]
        let presents=0
        let leaves=record.attendance.leaves?.approved?.length ?? 0
        for(let month in attendance){
            presents+=attendance[month].length
        }
        response.push({email,password,presents,leaves})
    })
    res.end(JSON.stringify(response))
})

app.get("/getAttendance",async (req,res)=>{
    const user=await User.findOne({email:req.query.email},"attendance -_id")
    res.end(JSON.stringify(user.attendance))
})

app.post("/authenticateUser",authenticateUser)

app.post("/createUser",createNewUSer)

app.post("/markAttendance",markAttendance)

app.post("/requestLeave",requestLeave)

app.post("/getLeaveStatus",getLeaveStatus)

app.listen(PORT,()=>console.log(`Server started at the port:${PORT}`))

async function requestLeave(req,res){
    const user=await User.updateOne({email:req.body.email},{
        "$addToSet":{"attendance.leaves.pendingDates":[new Date().toDateString()]},
    })
    if(user.modifiedCount>0)
        res.end("Requested!")
    else
        res.end("Error requesting leave!")
}

async function getLeaveStatus(req,res){
    const user=await User.findOne({email:req.body.email},"attendance.leaves.status -_id")
    console.log(user)
    res.end("done")

}

async function authenticateUser(req,res){
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user)
            throw new Error("User Not Found!")
        res.end("Signing In...")
    } catch (e){
        res.status(500).end(e.message)
    }
}

async function createNewUSer(req,res){

    try{
        const user = await User.create({email:req.body.email,password:req.body.password,attendance:{[new Date().getFullYear()]:{[new Date().getMonth()]:[]}}})
        user && res.end("User created!")
    } catch (e){
        res.status(500).end(e.code == 11000 ? "Email already exists" : e.message)
        console.log(e)
    }

}

async function markAttendance(req,res){

    const today=new Date()

    const user=await User.findOne({
        email:req.body.email,
        [`attendance.${today.getFullYear()}.${today.getMonth()}`]:{"$in":[today.getDate()]}
    })

    if(user)
        res.end("Attendance Already Marked!")
    else {
        try{
            const result = await User.updateOne({email:req.body.email},{
                "$addToSet":{[`attendance.${today.getFullYear()}.${today.getMonth()}`]:today.getDate()}
            })
            if(result.modifiedCount>0)res.end(JSON.stringify({marked:true}))
            else res.end(JSON.stringify({marked:false}))

        } catch (e){
            console.error(e)
            res.status(500).end(e.message)
        }
    }
}
