const db = require('./db')
const logger = require('../utils/logger')

const createTableText = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  passwordhash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS blocs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID REFERENCES users (id) NOT NULL,
  data jsonb
);
`

const createUsersTable = async () => {
  logger.info('creating tables!')
  await db.query(createTableText)
}

module.exports = createUsersTable
