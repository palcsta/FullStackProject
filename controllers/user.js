const Router = require('express-promise-router')
const logger = require('../utils/logger')
const db = require('../db/db')
const argon2 = require('argon2')
const router = new Router()
const passwordChecker = require('../PasswordRequirements')

router.post('/api/register', async (req, res) => {
  logger.info('trying to register:',req.body.username)

  //check if username exists
  const existinguserres  = await db.query('SELECT username from users WHERE username=$1',[req.body.username])
  //check if pw meets requirements
    const checkerRes = passwordChecker(req.body.password)
  if(existinguserres.rows[0]) {
    const existinguser = existinguserres.rows[0].username
    logger.info('there was already a user named',existinguser)
    res.status(400).send({error:`user already exists: ${existinguser}`})

  } else if(checkerRes.ok) {
    const pwhash = await argon2.hash(req.body.password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 50,
    })
    logger.info('pw not being inserted:',req.body.password)
    logger.info('pwhash being inserted:',pwhash)
    const { rows } = await db.query('INSERT INTO users (username,passwordhash) VALUES ($1,$2)',[req.body.username,pwhash])
    res.send('updated users')
  } else {
    const errors = checkerRes.problems.map(p => { return { error:p } })
    logger.info(errors)
    res.status(400).send(errors)
  }
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
