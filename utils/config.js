require('dotenv').config()

let CONNECTIONSTRING = process.env.CONNECTIONSTRING

const parse = require('pg-connection-string').parse;
let config = parse(CONNECTIONSTRING)

let httpsPaths = { keyFilePath:process.env.KEYFILEPATH, certFilePath:process.env.CERTFILEPATH }

module.exports = {
  ...config, ...httpsPaths
}
