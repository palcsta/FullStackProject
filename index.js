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
const users = require('./controllers/user')

app.use(users)

app.get('/', (request, response) => {
  response.json({ info: 'Auth' })
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
