const session = require("express-session");
const MongoStore= require("connect-mongo");
const { MONGO_URL } = require("../utils/config");

const sessionStore=MongoStore.create({
    mongoUrl:MONGO_URL,
})

const MAX_AGE=1000*60*60;

const expressSessionOptions = {
  secret: "qwerty",
  cookie: { maxAge: MAX_AGE, httpOnly: true, signed: true },
  saveUninitialized: false,
  resave: false,
  store: sessionStore,
};

const InitializeExpressSession = session(expressSessionOptions);

module.exports = {
  InitializeExpressSession,
};
