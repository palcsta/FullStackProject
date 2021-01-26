require('dotenv').config()

const config = {
				produrl: process.env.PRODURL,
				development: process.env.DEVELOPMENT
}

module.exports = config
