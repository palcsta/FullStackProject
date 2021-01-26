const Router = require('express-promise-router')
const logger = require('../utils/logger')
const db = require('../db/db')
const argon2 = require('argon2')
const router = new Router()
const passwordChecker = require('../PasswordRequirements')
const usernameChecker = require('../UsernameRequirements')

router.post('/api/register', async (req, res) => {

  //check if username exists, including different combos of capitalization and spacing for the username
  const existinguserres  = await db.query(
    'SELECT username from users WHERE regexp_replace(LOWER(username), \'[\\s+]\', \'\', \'g\') = regexp_replace(LOWER($1), \'[\\s+]\', \'\', \'g\')',
    [req.body.username])
  
  //check if pw meets length, char requirements
  const checkerRes = passwordChecker(req.body.password)

  if(existinguserres.rows[0]) {
    const existinguser = existinguserres.rows[0].username
    logger.info(`Did not register ${req.body.username} because there was already a user named ${existinguser}`)
    res.status(403).send({error:`User already exists: ${existinguser}`})

  } else if(checkerRes.ok) {
    //check if username obeys min,max, whitespace,special char requirements
    usernameCheck = usernameChecker(req.body.username)
    if(usernameCheck.ok) {
      const pwhash = await argon2.hash(req.body.password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        hashLength: 50,
      })
      //logger.info('pw not being inserted:',req.body.password)
      //logger.info('pwhash being inserted:',pwhash)
      const { rows } = await db.query('INSERT INTO users (username,passwordhash) VALUES ($1,$2)',[req.body.username,pwhash])
      logger.info('Successfully registered:',req.body.username)
      res.send({info:'Registered successfully! Welcome!'})
    } else {
      logger.error(`Did not register the username ${req.body.username} because ${usernameCheck.problems}`)
      const errors = usernameCheck.problems.map(p => { return { error:p } })
      res.status(403).send(errors.length>1?errors:errors[0])
    }
  } else {
    const errors = checkerRes.problems.map(p => { return { error:p } })
    logger.info(`Did not register ${req.body.username} because of a password problem: ${checkerRes.problems}`)
    res.status(403).send(errors.length>1?errors:errors[0])
  }
})

router.post('/api/login/', async (req,res) => { 
  const username = req.body.username
  const password = req.body.password
  //logger.info('Trying to login as user:',username)
  const { rows } = await db.query('SELECT passwordhash FROM users WHERE username = $1',[username])
  if(rows.length>0){
    const hashfromdb = rows[0].passwordhash
    const verifyok = await argon2.verify(hashfromdb, password)
    logger.info(`${username} logged in ${verifyok?'successfully':'unsucessfully'}`)
    if(verifyok){
      //do login stuff
      res.send({info:'Logged in successfully! Welcome!'})
    } else {
      //punish for wrong pw?
      res.status(403).send({error:'Wrong username or password provided',canReg:false})
    }
  } else {
    //username doesn't exist
    logger.info(`${username} tried to login, but user does not exist`)
    res.status(403).send({error:'Wrong username or password provided',canReg:true})
  }
})

module.exports = router
