const Express = require("express");
const route = Express.Router();

const { checkSession } = require("../middleware/sessionValidation");

route.get("/getUser", checkSession,  (req, res) => {
  const { user, sessionID } = req;

  if (!user) return res.status(404).json({"message": "user not found"}); 
  return res.status(200).json({user, sessionID});
})

module.exports = route;