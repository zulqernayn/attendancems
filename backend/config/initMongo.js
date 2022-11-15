const mongoose = require("mongoose")
const { MONGO_URL } = require("./config")

module.exports=function(){
    mongoose.connect(MONGO_URL,err=>console.log(err?"Error connecting to MongoDB":"MongoDB Connected!"))
}