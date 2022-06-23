const mongoose = require('mongoose');

/**
 * -------------- DATABASE ----------------
 */

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected', () => {
  console.log('Database connected');
});
