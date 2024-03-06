const checkSession = (req, res, next) => {
  const { session } = req;
  if (!session) return res.status(401).json({"message": "You are not logged in"});  
  next();
}

module.exports = { checkSession }
