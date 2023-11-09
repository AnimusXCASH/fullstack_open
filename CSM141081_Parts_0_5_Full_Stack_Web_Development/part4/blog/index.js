const config = require('./utils/config')
const app = require('./app')
const logger = require('./utils/logger')

app.listen(config.PORT, () =>{
  logger.info(`Server running on port ${config.PORT} and mongodb connection to ${config.MONGODB_URI}`)
})

