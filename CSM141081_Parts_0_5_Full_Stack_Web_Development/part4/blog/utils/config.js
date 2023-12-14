const result = require('dotenv').config();
if (result.error) {
  throw result.error;
}

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}