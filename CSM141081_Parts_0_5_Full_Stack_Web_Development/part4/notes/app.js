const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = required("cors");
const notesRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to mongo db");
  })
  .catch((error) => {
    logger.error("erro conecting to mongodb", error.message);
  });


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app