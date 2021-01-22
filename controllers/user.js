const Router = require('express-promise-router')
const logger = require('../utils/logger')
const db = require('../db/db')
const argon2 = require('argon2')
const router = new Router()

router.post('/api/register', async (req, res) => {
  logger.info('username being inserted:',req.body.username)
const pwhash = await argon2.hash(req.body.password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    hashLength: 50,
})
  logger.info('pw not being inserted:',req.body.password)
  logger.info('pwhash being inserted:',pwhash)

  const { rows } = await db.query('INSERT INTO users (username,passwordhash) VALUES ($1,$2)',[req.body.username,pwhash])
  res.send('updated users')
})

router.post('/api/login/', async (req,res) => { 
  const username = req.body.username
  const password = req.body.password
  logger.info('trying to login as user:',username)
  const { rows } = await db.query('SELECT passwordhash FROM users WHERE username=$1',[username])
  const hashfromdb = rows[0].passwordhash
  const verifyok = await argon2.verify(hashfromdb, password)
  logger.info("pw matched hash: ",verifyok)
  if(verifyok){
    //do login stuff
    res.send('login success')
  } else {
    //punish for wrong pw?

  res.send('wrong pw')
  }
})


module.exports = router
