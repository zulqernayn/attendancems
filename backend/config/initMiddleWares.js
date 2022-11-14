const cors=require('cors')
const { CORS_ORIGIN_URL } = require("./config/config")
const { authenticateUser_MW } = require("./middlewares/authentication")
const { InitializeExpressSession } = require("./middlewares/express-sessions_MW")

module.exports= function (app){
    app.use(
        InitializeExpressSession(),
        express.json(),
        authenticateUser_MW,
        cors({origin:CORS_ORIGIN_URL,credentials:true})
    )
}