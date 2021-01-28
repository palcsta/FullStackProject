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
app.use(users)

app.get('/', (request, response) => {
  response.json({ info: 'Auth' })
  logger.info('fingerprint :',request.fingerprint.hash)
const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress
  logger.info("ip: ",ip)
})

app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const port = 3003
const postgresPort = config.port
app.listen(port, () => {
  logger.info(`Postgres on port ${postgresPort}.`)
  logger.info(`App running on port ${port}.`)
})
