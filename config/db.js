const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL);
    console.log('DB connection successful');
  } catch (error) {
    console.log('Could not connect to DB');
  }
};

module.exports = connectDB