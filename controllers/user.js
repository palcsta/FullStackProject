const Router = require('express-promise-router')

const logger = require('../utils/logger')
const db = require('../db/db')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const router = new Router()
const passwordChecker = require('../PasswordRequirements')
const usernameChecker = require('../UsernameRequirements')
const {failqueueInsert, failqueueCheck} = require('../failqueue')

router.post('/api/register', async (req, res) => {

  if(typeof req.body.username!=="string"||typeof req.body.password!=="string"){
    return res.status(400).send([{error:"syntax error",concerning:"login"}])
  }


  //check if username exists, including different combos of capitalization and spacing for the username
  const existinguserres  = await db.query(
    'SELECT username from users WHERE regexp_replace(LOWER(username), \'[\\s+]\', \'\', \'g\') = regexp_replace(LOWER($1), \'[\\s+]\', \'\', \'g\')',
    [req.body.username])

  //check if pw meets length, char requirements
  const checkerRes = passwordChecker(req.body.password)
  const userCheckRes =  usernameChecker(req.body.username)

  if(existinguserres.rows[0]) {
    const existinguser = existinguserres.rows[0].username
    logger.info(`Did not register ${req.body.username} because there was already a user named ${existinguser}`)
    res.status(403).send([{error:`User already exists: ${existinguser}`,concerning:"username"}])
  } else if(checkerRes.ok&&userCheckRes.ok) {
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
      res.send([{info:'Registered successfully! Welcome!'}])
    } else {
      logger.error(`Did not register the username ${req.body.username} because ${usernameCheck.problems}`)
      const errors = usernameCheck.problems.map(p => { return { error:p,concerning:"username" } })
      res.status(403).send(errors)
    }
  } else {
    const UNerrors = userCheckRes.problems.map(p => { return { error:p,concerning:"username" } }) 
    const errors = checkerRes.problems.concat(UNerrors)
    logger.info(`Did not register ${req.body.username} because of problem(s): ${checkerRes.problems}`)
    res.status(403).send(errors)
  }
})

router.post('/api/login/', async (req,res) => { 
  const username = req.body.username
  const password = req.body.password
  const noUsername = (typeof username!=="string"||!username.length) 
  const noPassword = (typeof password!=="string"||!password.length)
  if(noUsername||noPassword){
    const missingFieldErrors = []
    noUsername && missingFieldErrors.push({error:`Please enter a username.`,concerning:"username",canReg:false})
    noPassword && missingFieldErrors.push({error:`Please enter a password.`,concerning:"password",canReg:false})
    return res.status(403).send(missingFieldErrors)
  }
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const fingerprint = req.fingerprint.hash
  //logger.info('Trying to login as user:',username)
  if(failqueueCheck(fingerprint,ip)){
    res.status(403).send([{error:`You're doing that too much. Please wait a moment before trying again.`,concerning:"login"}])
  } else {
    const { rows } = await db.query('SELECT id,passwordhash FROM users WHERE username = $1',[username])
    if(rows.length>0){
      const hashfromdb = rows[0].passwordhash
      const verifyok = await argon2.verify(hashfromdb, password)
      logger.info(`${username} logged in ${verifyok?'successfully':'unsucessfully'}`)
      if(verifyok){
        //do login stuff

        const userForToken = {
          username: username,
          id: rows[0].id,

        }

        const token = jwt.sign(userForToken, process.env.SECRET)

<<<<<<< HEAD
        res
          .status(200)
          .send({ token, name: username, info:'Logged in successfully! Welcome!'})

      } else {
        failqueueInsert(fingerprint,ip)
        res.status(401).send({error:'Wrong username or password provided',canReg:false})
=======
        res.send([{token, info:'Logged in successfully! Welcome!'}])
      } else {
        failqueueInsert(fingerprint,ip)
        res.status(403).send([{error:'Wrong username or password provided',canReg:false,concerning:"login"}])
>>>>>>> 0774edcb3a1ebe65a2f9d0ff3f1e5ee5b62768b8
      }
    } else {
      //username doesn't exist
      failqueueInsert(fingerprint,ip)
      logger.info(`${username} tried to login, but user does not exist`)
<<<<<<< HEAD
      res.status(401).send({error:'Wrong username or password provided',canReg:true})
=======
      res.status(403).send([{error:'Wrong username or password provided',canReg:username.length?true:false}])
>>>>>>> 0774edcb3a1ebe65a2f9d0ff3f1e5ee5b62768b8
    }
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

//get user info
router.get('/api/user/', async (req,res) => { 
const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
    const { rows } = await db.query('SELECT username FROM users WHERE id = $1',[decodedToken.id])
    if(rows.length>0){
      return res.send({username:rows[0].username})
    }
})

module.exports = router
