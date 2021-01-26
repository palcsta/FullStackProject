require('dotenv').config()

let CONNECTIONSTRING = process.env.CONNECTIONSTRING

const parse = require('pg-connection-string').parse;
let config = parse(CONNECTIONSTRING)

module.exports = {
  ...config
}
