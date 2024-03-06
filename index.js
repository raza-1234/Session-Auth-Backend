const Express = require("express");
const session = require("express-session");
const body_parser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./src/routes/routes");
const userRoutes = require("./src/routes/userRoute");

const app = Express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" })); 

//bodyparser middleware
app.use(body_parser.urlencoded({
  extended: true
}));

app.use(Express.json());
app.use(cookieParser());

const PORT = 3001;
const session_life = 1000 * 60 * 60 * 3; 

//express session middleware
app.use(session({
  name: "session_id",
  resave: false,
  saveUninitialized: false,
  secret: "session_secret_key",
  cookie: {
    domain:"localhost",
    path: "/",
    secure: false,
    maxAge: session_life, // take milliseconds....
    httpOnly: true, //will not allow to read cookie using document.cookie in front end  
  }
}))


app.use("/", routes);
app.use("/user", userRoutes)

app.listen(PORT, () => {
  console.log(`server start successfully on port ${PORT}`);
})