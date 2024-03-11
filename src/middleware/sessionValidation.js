const checkSession = (req, res, next) => {
  const { isAuthenticated } = req;
  const isUserAuthenticated = isAuthenticated();
  
  if (isUserAuthenticated){
    return res.status(401).json({"message": "You are not logged in"});
  }
  next();
}

module.exports = { checkSession }
