const User = require("../models/user-model");
const authUtil = require("../util/auth");
const validation = require("../util/validation");
const flashedData = require("../util/flash-session");

function getSignup(req, res) {
  let data = flashedData.getSessionData(req);
  if (!data) {
    data = {
      errorMessage: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      street: '',
      code: '',
      city: ''
    };
  }
  res.render("auth/signup", { ...data });
}

function getLogin(req, res) {
  let data = flashedData.getSessionData(req);
  if (!data) {
    data = {
      errorMessage: '',
      email: '',
      password: ''
    };
  }
  res.render("auth/login", { ...data });
}

async function signup(req, res) {
  const enteredData = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    name: req.body.name,
    street: req.body.street,
    code: req.body.zipCode,
    city: req.body.city,
  };

  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.street,
      req.body.zipCode,
      req.body.city
    ) ||
    !validation.passwordIsConfirmed(req.body.password, req.body.confirmPassword)
  ) {
    flashedData.flashSessionData(
      req,
      {
        errorMessage: "Enter Valid Email & Valid Password",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.street,
    req.body.city,
    req.body.zipCode
  );

  try {
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      flashedData.flashSessionData(
        req,
        {
          errorMessage: "User with Same Email Already Exists",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }
    await user.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUser();
  } catch (error) {
    return next(error);
  }

  if (!existingUser) {
    flashedData.flashSessionData(
      req,
      {
        errorMessage: "Wrong Credentials",
        email: req.body.email,
        password: req.body.password,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }
  const isCorrectPassword = await user.checkPassword(existingUser.password);

  if (!isCorrectPassword) {
    flashedData.flashSessionData(
      req,
      {
        errorMessage: "Wrong Credentials",
        email: req.body.email,
        password: req.body.password,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.endUserSession(req);
  res.redirect("/login");
}

module.exports = {
  getLogin: getLogin,
  getSignup: getSignup,
  signup: signup,
  login: login,
  logout: logout,
};
