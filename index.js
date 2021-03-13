const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const createUsersTable = require('./db/createtables')
createUsersTable()
const express = require('express')
const cors = require('cors')
const app = express()
const json = express.json()
app.use(json)
app.use(cors())
const fingerprint = require('express-fingerprint')

const users = require('./controllers/user')

app.use(fingerprint())

app.use(middleware.requestLogger)
app.use(users)

const blocs = require('./controllers/bloc')
app.use(blocs)

app.get('/', (request, response) => {
  response.json({ info: 'Auth' })
  logger.info('fingerprint :',request.fingerprint.hash)
  const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
  logger.info("ip: ",ip)
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const myArgs = process.argv.slice(2)
const port = 3003
const postgresPort = config.port

logger.info(`Trying postgres on port ${postgresPort}.`)
logger.info(`Continents backend will be run on port ${port}.`)

if(myArgs[0]==="https"){
  const fs = require('fs')
  const https= require("https")
  logger.info(`Trying to use https, make sure KEYFILEPATH and CERTFILEPATH are correct in .env`)
  const options = {
    key: fs.readFileSync(config.keyFilePath),
    cert: fs.readFileSync(config.certFilePath)
  }
  https.createServer(options, app).listen(port)  
} else {
  logger.info(`Connections to backend will be insecure unless the argument "https" is given.`)
  app.listen(port)
}

