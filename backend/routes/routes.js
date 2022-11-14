const { getUserAttendance } = require("../controllers/attendanceView-controller")
const { getDashboardData, markTodaysAttendance } = require("../controllers/dashboardView-controller")
const { authenticateUser } = require("../controllers/loginView-controller")
const { createUser } = require("../controllers/registrationView-controller")

// POST routes
app.post("/createUser",createUser)

app.post("/authenticateUser",authenticateUser)

// GET routes

app.get("/getdashboarddata", getDashboardData)

app.get("/logout",)

app.get("/marktoday",markTodaysAttendance)

app.get("/userAttendance", getUserAttendance)