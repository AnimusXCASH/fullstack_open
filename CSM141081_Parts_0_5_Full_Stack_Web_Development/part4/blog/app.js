const config = require("./utils/config")
const express = require("express")
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')

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

// app.use((req, res, next) => {
//   console.log('Headers:', req.headers);
//   console.log('Authorization header:', req.headers.authorization);
//   next();
// });

app.use('/api/login', loginRouter);
app.use(middleware.tokenExtractor);
app.use('/api/users', usersRouter);
app.use('/api/blogs', middleware.userExtractor, blogsRouter);


app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;