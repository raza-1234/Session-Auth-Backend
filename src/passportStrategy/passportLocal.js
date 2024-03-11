const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const users = require("../../model/userData");

passport.use(new LocalStrategy(
  { usernameField: "email"}, 
  ( email, password, done ) => {
    const userExist = users.find((user) => user.email === email && user.password === password);

    if (userExist){
      return done(null, { ...userExist, password: undefined});
    }
    return done(null, false, { "message": "Incorrect username or password"});
  }
));

passport.serializeUser((user, done) => {
  console.log("checkinggg user in serializeeee", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("in deesrializeee user", );
  const user = users.find((user) => user.id === id);
  if (user){
    return done(null, {...user, password: undefined});
  }
  return done(err, null);
})