aconst db = require('./db')

const createTableText = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TEMP TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB
);
`

const createUsersTable = async () => {
  const { rows } = await db.query(createTableText)
  return rows
}


module.exports(createUsersTable)
