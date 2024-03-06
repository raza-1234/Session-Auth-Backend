const Express = require("express");
const route = Express.Router();

const users = require("../../model/userData");
const { redirectToLogin_Middleware, redirectToDashboard_Middleware } = require("../../src/middleware/sessionValidation");

// route.get("/", (req, res) => {
//   const {user} = req.session;
//   res.send(`
//   <h1> Welcome To Home Page Brother!</h1>
//     ${ user? 
//       `
//         <a href= "/">Home</a>
//         <a href = "/dashboard">  dashboard </a>
//         <form method = "get" action = "/logout">
//           <button>Logout</button>
//         </form>
//       `
//     : 
//       `
//         <a href= "/logIn">Login</a>
//         <a href= "/register">Register</a>
//       `
//     }
//   `)
// })

// route.get("/dashboard",  redirectToLogin_Middleware, (req, res) => {
//   console.log("sessionID", req.sessionID);
//   const { user } = req.session;

//   req.sessionStore.get(req.sessionID, (error, sessionData) => {
//     if (error){
//       return console.log("error!! session not found")
//     }
//     return console.log("session infoooo", sessionData); 
//   });

//   res.send(
//   `
//     <h1> Dashboard </h1>
//     <a href = "/"> Main </a>
//     <p>Name: ${user?.name}</p>
//     <p>Email: ${user?.email}</p> 
//   `)
// })

// route.get("/register", redirectToDashboard_Middleware,  (req, res) => {
//   res.send(
//     `
//       <h1> Register </h1>
//       <form method = "post" action = "/register">
//       <input type = "text" name="name" placeholder = "name" required/>
//         <input type = "email" name="email" placeholder = "email" required/>
//         <input type = "password" name="password" placeholder = "password" required/>
//         <input type = "submit"/>
//       </form>
//       <a href = "/"> main </a>
//     `
//     )
// })

// route.get("/logIn", redirectToDashboard_Middleware,  (req, res) => {
//   res.send(
//   `
//     <h1> Login </h1>
//     <form method = "post" action = "/logIn">
//       <input type = "email" name="email" placeholder = "email" required/>
//       <input type = "password" name="password" placeholder = "password" required/>
//       <input type = "submit"/>
//     </form>
//     <a href = "/"> main </a>
//   `
//   )

// })

route.post("/logIn",  (req, res) => {
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
})

route.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("session_id", { path: "/"});
  return res.status(200).json({"message": "logout successfully"});
})

module.exports = route;

