const { PORT } = require("./config/config")

const app = require("express")()
require("./config/initMiddleWares")(app)
require("./routes/routes")(app)
require("./config/initMongo")()

app.listen(PORT,()=>console.log(`Server started at the port:${PORT}`))