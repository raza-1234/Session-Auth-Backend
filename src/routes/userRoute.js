const Express = require("express");
const route = Express.Router();

const users = require("../../model/userData");
const { checkSession } = require("../middleware/sessionValidation");

route.get("/getUser", checkSession, (req, res) => {
  const { userId } = req.session;
  const { sessionID } = req;
  const userExist = users.find((user) => user.id === userId);

  if (!userExist) return res.status(404).json({"message": "user not found"}); 

  return res.status(200).json({userExist, sessionID});
})

module.exports = route;