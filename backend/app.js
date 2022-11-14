const app = require("express")()
require("./config/initMiddleWares")(app)

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

app.listen(PORT,()=>console.log(`Server started at the port:${PORT}`))