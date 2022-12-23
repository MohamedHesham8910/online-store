const User = require("../models/user-model");

function getSignup(req, res) {
  res.render("auth/signup");
}

function getLogin(req, res) {
  res.render("auth/login");
}

async function signup(req, res) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.street,
    req.body.city,
    req.body.zipCode
  );

  await user.signup();

  res.redirect('/login');
}

module.exports = {
  getLogin: getLogin,
  getSignup: getSignup,
  signup: signup,
};
