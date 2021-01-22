const Pool = require('pg').Pool
const config = require('../utils/config')
const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}
