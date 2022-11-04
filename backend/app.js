const mongoose = require("mongoose")
const express = require("express")
const User = require("./models/User")
const cors=require('cors')
const { authenticateUser_MW } = require("./middlewares/authentication")
const { InitializeExpressSession } = require("./middlewares/express-sessions_MW")
const PORT = 5000

const app=express()
// const MONGO_URL="mongodb://localhost:27017"
const MONGO_URL="mongodb://nodeServer:IB5YRlpvCV4SMIUL@cluster0-shard-00-00.n1cqz.mongodb.net:27017,cluster0-shard-00-01.n1cqz.mongodb.net:27017,cluster0-shard-00-02.n1cqz.mongodb.net:27017/?ssl=true&replicaSet=atlas-k4u7us-shard-0&authSource=admin&retryWrites=true&w=majority"
 
// mongoose.connect("mongodb+srv://nodeServer:IB5YRlpvCV4SMIUL@cluster0.n1cqz.mongodb.net/?retryWrites=true&w=majority")
// mongodb+srv://nodeServer:IB5YRlpvCV4SMIUL@cluster0.n1cqz.mongodb.net/test
mongoose.connect(MONGO_URL,err=>console.log(err?"Error connecting to MongoDB":"MongoDB Connected!"))


app.use(
    InitializeExpressSession(),
    express.json(),
    authenticateUser_MW,
    cors({origin:"http://localhost:3000",credentials:true})
)

// Logout controller

const logoutUser = async (req,res)=>{
    req.session.userEmail&&req.session.destroy()
    res
    .status(200)
    .json({
        error:false,
        message:"User Logged Out"
    })
}

// Routes
app.post("/createUser",createuser)

app.get("/getdashboarddata", getDashboardData)

app.post("/authenticateUser",authenticateUser)

app.get("/logout",logoutUser)

app.get("/marktoday",markTodaysAttendance)

app.get("/userAttendance", getUserAttendance)


app.listen(PORT,()=>console.log(`Server started at the port:${PORT}`))
