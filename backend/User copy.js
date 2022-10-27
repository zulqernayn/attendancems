const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    password:String,
    attendance:{
        type:Array
    }
})

module.exports = mongoose.model("User",userSchema)

function validateEmail(email){
    const regex = new RegExp(/^\s*[a-zA-Z]\w+@[a-zA-z]+.com\s*$/gm)
    return regex.test(email)
}