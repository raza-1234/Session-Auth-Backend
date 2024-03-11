const Express = require("express");
const route = Express.Router();
const passport = require("passport");

const { logIn } = require("../controller/login");
const { logout } = require("../controller/logout");

route.post("/logIn", passport.authenticate('local'), logIn);
route.get("/logout", logout);

module.exports = route;