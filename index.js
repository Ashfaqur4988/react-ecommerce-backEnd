const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session"); //session
const passport = require("passport"); //passport
const LocalStrategy = require("passport-local").Strategy; //local strategy
const app = express();
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy; //jwt  strategy already present in passport
const ExtractJwt = require("passport-jwt").ExtractJwt; // extract jwt from client request

const productsRouters = require("./routes/Products"); //'/products' is the base path
const brandsRouters = require("./routes/Brands");
const categoryRouters = require("./routes/Categories");
const userRouters = require("./routes/User");
const authRouters = require("./routes/Auth");
const cartRouters = require("./routes/Cart");
const orderRouters = require("./routes/Order");
const { User } = require("./model/User");
const crypto = require("crypto");
const { isAuth, sanitizeUser } = require("./services/common");

const secret_key = "secret";

//jwt options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret_key; //TODO: should not be in code

//middlewares

//session
app.use(
  session({
    secret: "keyboard cat",
    resave: false, //don't save session if unmodified
    saveUninitialized: false, //don't create session until something is stored
  })
);

app.use(passport.authenticate("session")); //adding session

//cors
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

app.use(express.json()); //to parse req.body
app.use("/products", isAuth(), productsRouters.router);
app.use("/brands", isAuth(), brandsRouters.router);
app.use("/category", isAuth(), categoryRouters.router);
app.use("/users", isAuth(), userRouters.router);
app.use("/auth", authRouters.router);
app.use("/cart", isAuth(), cartRouters.router);
app.use("/orders", isAuth(), orderRouters.router);

//passport strategies
passport.use(
  "local",
  new LocalStrategy(
    //by default passport uses username
    { usernameField: "email" },
    async function (username, password, done) {
      try {
        const user = await User.findOne({ email: username }).exec();

        if (!user) {
          done(null, false, { message: "No such user" }); //when no such user found
        }

        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false, { message: "invalid credentials" }); //when wrong credentials
            }
            const token = jwt.sign(sanitizeUser(user), secret_key);
            return done(null, token); //when user found
          }
        );
      } catch (error) {
        done(error);
      }
    }
  )
);

//jwt strategy
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, sanitizeUser(user)); //this calls serializer
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

//this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      role: user.role,
    });
  });
});

//this changes session variable req.user on being called from authorized request
passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

//db connection
try {
  mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("DB connection done");
} catch (error) {
  console.log(error);
}

//listener code to run the server
app.listen(8080, (req, res) => {
  console.log("Server is running on port 8080");
});
