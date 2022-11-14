const mongoose = require("mongoose")
mongoose.connect(MONGO_URL,err=>console.log(err?"Error connecting to MongoDB":"MongoDB Connected!"))
