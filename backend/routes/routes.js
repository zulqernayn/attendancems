const { getUserAttendance } = require("../controllers/attendanceController")
const { getDashboardData, markTodaysAttendance } = require("../controllers/dashboardController")
const { authenticateUser } = require("../controllers/authController")
const { createUser } = require("../controllers/registrationController")

module.exports=function(app) {
    
    // POST routes -------------------------*-|

	app.post("/createUser",createUser) // registration route
	
	app.post("/authenticateUser",authenticateUser) //login route
    
	// GET routes -----------------------*-|
    
	app.get("/logout",) // logout user
	
	app.get("/getdashboarddata", getDashboardData) // get dashboard data for user
	
	app.get("/marktoday",markTodaysAttendance) // mark todays attendance for user
	
	app.get("/userAttendance", getUserAttendance) // get all attendance for user
}