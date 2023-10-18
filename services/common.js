const passport = require("passport");

exports.isAuth = (req, res, next) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

//cookie extractor
exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Mjg0ZDdiY2FlMjZjNzdiZDA4NDNjYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk3NDUyMTU5fQ.Wgw3p2HD_Vc2U5XqYRB1wwFIGs23Jwp402WW2uUd0ug";
  return token;
};
