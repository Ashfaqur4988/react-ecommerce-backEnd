const express = require("express");
const { createUser, login, checkUser } = require("../controller/Auth");
const passport = require("passport");
const router = express.Router();

router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), login)
  .get("/check", passport.authenticate("jwt"), checkUser);

exports.router = router;
