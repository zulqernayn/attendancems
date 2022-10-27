const mongoose = require("mongoose")
const express = require("express")
const MongoStore= require("connect-mongo")
const User = require("./User")
const session = require("express-session")
const cors=require('cors')
const PORT = 5000

const app=express()
const MONGO_URL="mongodb://localhost:27017"
 
// mongoose.connect("mongodb+srv://nodeServer:IB5YRlpvCV4SMIUL@cluster0.n1cqz.mongodb.net/?retryWrites=true&w=majority")
// mongodb+srv://nodeServer:IB5YRlpvCV4SMIUL@cluster0.n1cqz.mongodb.net/test
// mongoose.connect("mongodb://nodeServer:IB5YRlpvCV4SMIUL@cluster0-shard-00-00.n1cqz.mongodb.net:27017,cluster0-shard-00-01.n1cqz.mongodb.net:27017,cluster0-shard-00-02.n1cqz.mongodb.net:27017/?ssl=true&replicaSet=atlas-k4u7us-shard-0&authSource=admin&retryWrites=true&w=majority")
mongoose.connect(MONGO_URL)

const MAX_AGE=1000*60*60;

const sessionStore=MongoStore.create({
    mongoUrl:MONGO_URL,
})

app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.urlencoded({extended:false}))
app.use(session({
    secret:"qwerty",
    cookie:{ maxAge:MAX_AGE,httpOnly:true,signed:true},
    saveUninitialized:false,
    resave:false,
    store:sessionStore
}))

// Controller

function checkAuth(req,res,next){
    console.log(req.path!=="/authenticateUser"&&!req.session.userEmail)
    if(req.path!=="/authenticateUser"&&!req.session.userEmail)
        res.status(301).json({error:true,message:"User Not Logged In!"})
    else
        next()
}

// Routes

app.post("/createUser",async (req,res)=>{
    const {email,name,password}=req.body
    try{
        const user=await User.create({email,name,password})
        console.log("user:",user)
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
})

app.get("/getdashboarddata",checkAuth,async (req,res)=>{
    const user=await User.findOne({email:req.session.userEmail})
    if(user){
        const isTodayAttendanceMarked=user.attendance.find(date=>new Date(date).toDateString()===new Date().toDateString())
        res.status(200).json({
            email:user.email,
            name:user.name,
            isTodayMarked:isTodayAttendanceMarked??false
        })
    } else{
        res.status(404).json({
            error:true,
            message:"No data found for the current user!"
        })
    }
})

app.get("/checktoday",checkAuth,async (req,res)=>{
    const today=new Date()
    const user=await User.findOne({
        email:req.session.userEmail,
    })
    if(user)
        res.end(JSON.stringify({marked:true}))
    else
        res.end(JSON.stringify({marked:false}))
})

app.post("/authenticateUser",async (req,res)=>{

    const response={
        error:false,
        authenticated:false,
        message:""
    }

    // if(req.session.userEmail){
    //     response.error=true
    //     response.authenticated=false
    //     response.message="Already Authenticated!"
    //     res.end("Already Authenticated!")
    //     return
    // }
    
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            response.error=true
            response.message="No user against the provided email!"
            res.end(JSON.stringify(response))
            return
        }
        if(user.password===req.body.password){
            response.authenticated=true
            response.message="User Found!"
            response.userId=user._id
            req.session.userEmail=req.body.email
            res.end(JSON.stringify(response))
        } else{
            response.error=true
            response.message="Incorrect Password!"
            res.end(JSON.stringify(response))
        }
    } catch (e){
        res.end(JSON.stringify(response))
        console.log(e)
    }

})

app.get("/logout",async (req,res)=>{
    if(req.session.userEmail){
        req.session.destroy()
    }
    res.status(200).json({error:false,message:"Successfully Logged Out!"})
})

app.get("/marktoday",checkAuth,async (req,res)=>{
    console.log("mark")
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

})

app.listen(PORT,()=>console.log(`Server started at the port:${PORT}`))
