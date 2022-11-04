const publicPaths = ["/authenticateUser", "/createUser"];

const authenticateUser_MW = (req, res, next) => {
  if (!publicPaths.includes(req.path) && !req.session.userEmail)
    res
    .status(301)
    .json({
        error: true,
        message: "User Not Logged In!"
    });
  else next();
};

module.exports={
    authenticateUser_MW
}