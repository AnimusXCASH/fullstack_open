const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

console.log('Logging config')
console.log(config)
mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI).then(()=>{
  logger.info("connected to mongodb")
}).catch((error)=>{
  logger.error("error connecting to mongo", error.message);
});

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
