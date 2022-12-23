const User = require("../models/user-model");
const authUtil = require('../util/auth');

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

  try {
    await user.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect('/login');
}

async function login(req,res){
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUser();
  } catch (error) {
    return next(error);
  }

  if(!existingUser){
    res.redirect('/login');
    return;
  }
  const isCorrectPassword = await user.checkPassword(existingUser.password);

  if(!isCorrectPassword){
    res.redirect('/login');
    return;
  }

  authUtil.createUserSession(req,existingUser,function(){
    res.redirect('/');
  });
}

function logout(req,res){
  authUtil.endUserSession(req);
  res.redirect('/login');
}

module.exports = {
  getLogin: getLogin,
  getSignup: getSignup,
  signup: signup,
  login: login,
  logout: logout
};
