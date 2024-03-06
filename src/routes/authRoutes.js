const Express = require("express");
const route = Express.Router();

const { logIn } = require("../controller/login");
const { logout } = require("../controller/logout");

route.post("/logIn", logIn);
route.get("/logout", logout);

module.exports = route;