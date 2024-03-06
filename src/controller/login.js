const users = require("../../model/userData");

 const logIn =  (req, res) => {
  const { email, password } = req.body;

  if ( email && password ){
    const userExist = users.find((user) => user.email === email  && user.password === password);
    if (userExist){
      req.session.userId = userExist.id;
      res.status(200).json({"message": "successfully log in", userExist, sessionId: req.sessionID});
      return;
    }
  }
  res.status(404).json({"message": "user not found"});
  return;
}

module.exports = { logIn };