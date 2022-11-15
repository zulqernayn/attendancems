const cors=require('cors')
const { authenticateUser_MW } = require('../middlewares/authentication')
const { CORS_ORIGIN_URL } = require("./config")
const {InitializeExpressSession} = require("./initExpressSessions")
const express=require('express')

module.exports= function (app){
    // app.use(
    //     InitializeExpressSession(),
    //     express.json(),
    //     authenticateUser_MW,
    //     cors({origin:CORS_ORIGIN_URL,credentials:true})
    // )
        app.use(express.json())
        app.use(InitializeExpressSession)
        app.use(authenticateUser_MW)
        app.use(cors({origin:CORS_ORIGIN_URL,credentials:true}))
}