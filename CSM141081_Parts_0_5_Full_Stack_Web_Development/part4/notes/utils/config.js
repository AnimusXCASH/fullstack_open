require('dotenv').config

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}

// other parts of application can access like this 
/*
 * const config = require('./utils/config')
 * logger.info(`Server running on port ${config.PORT}`)
 */