const c = require('ansi-colors');
const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(c.bgBlue(`データベース接続:${conn.connection.host}`));
};

module.exports = connectDB;