const redirectToLogin_Middleware = (req, res, next) => {
  if (!req.session.user) return res.redirect("/logIn");
  next();
} 

const redirectToDashboard_Middleware = (req, res, next) => {
  if (req?.session?.user) return res.redirect("/dashboard");
  next();
};

const checkSession = async (req, res, next) => {
  const { session } = req;
  
  if (!session) return res.status(401).json({"message": "You are not logged in"});  
  next();
}

module.exports = { redirectToLogin_Middleware, redirectToDashboard_Middleware, checkSession }
