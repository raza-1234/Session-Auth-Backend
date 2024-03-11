const users = require("../../model/userData");

 const logIn =  (req, res) => {
  const { user } = req;

  console.log("checkingggggggg loginnnnnnn controller");

  console.log("checking req.user infooooooooo", req.user);

  if (user){
    res.status(200).json({"message": "successfully log in", sessionId: req.sessionID});
    return;
  }

  res.status(404).json({"message": "user not found"});
  return;
}

module.exports = { logIn };