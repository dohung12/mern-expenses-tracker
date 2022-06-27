require('dotenv').config();
const express = require('express');
require('express-async-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const helmet = require('helmet');
// passport auth
const passport = require('passport');
require('./config/passport')(passport);
// connect to database
require('./config/database');
// connect to media database
const fileUpload = require('express-fileupload');
require('./config/cloudinary');

// middleware
const verifyUser = require('./middleware/verifyUser');
const notFoundMiddleware = require('./middleware/not-found');
// routes
const authRoutes = require('./routes/auth.route');
const expensesRoutes = require('./routes/expense.route');
const uploadRoutes = require('./routes/upload.route');
const userRoutes = require('./routes/user.route');
const categoryRoutes = require('./routes/category.route');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(passport.initialize());
// app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/expenses', verifyUser, expensesRoutes);
app.use('/api/v1/user', verifyUser, userRoutes);
app.use('/api/v1/category', verifyUser, categoryRoutes);
app.use('/api/v1/uploads', verifyUser, uploadRoutes);

// only when ready to deploy
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
// });

app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;
const start = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
start();
