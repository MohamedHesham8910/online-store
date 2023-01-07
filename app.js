const path = require("path");

const express = require("express");
const csrf = require('csurf');
const expressSession = require('express-session');

const sessionConfig = require('./config/session');
const adminRoutes = require("./routes/admin-routes");
const authRoutes = require("./routes/auth-routes");
const cartRoutes = require("./routes/cart-routes");
const baseRoutes = require("./routes/base-routes");
const ordersRoutes = require("./routes/orders-routes");
const csrfMiddleware = require('./middlewares/csrf-token');
const authMiddleware = require('./middlewares/check-auth');
const cartMiddleware = require('./middlewares/cart-init');
const notFoundMiddleware = require('./middlewares/not-found-handler');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthorizationMiddleware = require('./middlewares/authorization');
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(expressSession(sessionConfig()));
app.use(csrf());
app.use(cartMiddleware);
app.use(csrfMiddleware);
app.use(authMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);
app.use('/admin',checkAuthorizationMiddleware, adminRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(app.listen(3000))
  .catch(function (error) {
    console.log("Connection Failed", error);
  });
