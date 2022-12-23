const path = require("path");

const express = require("express");
const csrf = require('csurf');
const expressSession = require('express-session');

const sessionConfig = require('./config/session');
const authRoutes = require("./routes/auth-routes");
const csrfMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public/"));
app.use(express.urlencoded({ extended: false }));

app.use(expressSession(sessionConfig()));
app.use(csrf());
app.use(csrfMiddleware);

app.use(authRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(app.listen(3000))
  .catch(function (error) {
    console.log("Connection Failed", error);
  });
