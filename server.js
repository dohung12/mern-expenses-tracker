require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// passport auth
const passport = require('passport');
require('./config/passport')(passport);

// connect to database
require('./config/database');

// middleware
const verifyUser = require('./middleware/verifyUser');
const notFoundMiddleware = require('./middleware/not-found');
// routes
const authRoutes = require('./routes/auth.route');
const expensesRoutes = require('./routes/expense.route');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// app.use('/', (req, res) => {
//   res.send('hello world');
// });
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/expenses', verifyUser, expensesRoutes);

app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;
const start = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
start();
