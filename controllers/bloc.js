const Router = require('express-promise-router')
const logger = require('../utils/logger')
const db = require('../db/db')
const jwt = require('jsonwebtoken')
const containsOnlyAlphaCodes = require('../alphacode.js')

const router = new Router()

const maxBlocNameLength = 70

const getUserIdFromToken = req => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const token = auth.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!decodedToken.id){
      return null
    } else {
      return decodedToken.id
    }
  }
  return null
}

router.post('/api/blocs', async (req, res) => {
  const body = req.body
  if(typeof body.name!=="string"||!Array.isArray(body.countries)){
    console.log("malformed bloc save request!")
    return res.status(401).send({error:`There was a syntax error with the bloc you are trying to save`})
  }
  const userId = getUserIdFromToken(req)
  if(!userId){
    return res.status(401).send({error:`Bad or missing login token`})
  } else if(!body.name){
    return res.status(401).send({error:`Blocs require a name.`})
  }else if(!body.countries.length){
    return res.status(401).send({error:"Bloc cannot be empty."})
  } else if(body.name.length>maxBlocNameLength){
    return res.status(401).send({error:`Bloc name too long. Maximum allowed length is ${maxBlocNameLength}`})
  } else if(!containsOnlyAlphaCodes(body.countries)){
    return res.status(401).send({error:`There was a syntax error with the bloc you are trying to save`})
  } else {
    const { rows } = await db.query(`SELECT id FROM blocs WHERE created_by = $1 AND data ->> 'name' = $2`,[userId,body.name])
    if(rows.length>0){
      logger.info(`found ${rows.length} rows matching created_by = ${userId} AND data ->> 'name' = ${body.name}`)
      res.status(303).send({error:`A bloc with that name already exists`})
    } else {
      const blocToSave =(({ name, countries }) => ({ name, countries }))(body)
      await db.query('INSERT INTO blocs (created_by,data) VALUES ($1,$2)',[userId,blocToSave])
      logger.info('Saved bloc:',body)
      res.status(200).send({info:'Bloc saved'})
    }
  }
})

//update existing bloc
router.put('/api/blocs/:id', async (req, res) => {
  const body = req.body
  const userId = getUserIdFromToken(req)
  const blocId = req.params.id
  if(!userId){
    res.status(401).send({error:`Bad or missing login token`})
  } else if(!body.name){
    res.status(401).send({error:`Blocs require a name`})
  } else if(body.name.length>maxBlocNameLength){
    res.status(401).send({error:`Bloc name too long. Maximum allowed length is ${maxBlocNameLength}`})
  } else if(!containsOnlyAlphaCodes(body.countries)){
    res.status(401).send({error:`There was a syntax error with the bloc you are trying to save`})
  } else {
    const { rows } = await db.query(`SELECT id,data FROM blocs WHERE created_by = $1 AND id = $2`,[userId,blocId])
    if(rows.length>0){
      //bloc exists, lets update
      logger.info(`updating bloc with ID ${blocId} created_by = ${userId}`)
      const blocToSave =(({ name, countries }) => ({ name, countries }))(body)
      await db.query(`UPDATE blocs SET data = $1 WHERE id = $2`,[blocToSave,blocId])
      res.status(200).send({info:'Updated bloc'})
    } else {
      res.status(401).send({error:'No such bloc to update'})
    }
  }
})


router.get('/api/blocs/', async (req,res) => { 
  const userId = getUserIdFromToken(req)
  if(!userId){
    res.status(401).send({error:`Bad or missing login token`})
  } else {
    const { rows } = await db.query('SELECT id,data FROM blocs WHERE created_by = $1',[userId])
    res.status(200).json(rows)
  }
})

router.get('/api/blocs/:id', async (req, res) => {
  const blocId = req.params.id
  const userId = getUserIdFromToken(req)
  if(!userId){
    res.status(401).send({error:`Bad or missing login token`})
  } else {
    const { rows } = await db.query('SELECT created_by,data FROM blocs WHERE id = $1',[blocId])
    if(rows.length>0){
      if(rows[0].created_by === userId){
        res.json(rows[0].data)
      } else {
        res.status(403).end()
      }
    } else {
      res.status(404).end()
    }
  }
})

router.delete('/api/blocs/:id', async (req, res) => {
  const blocId = req.params.id
  const userId = getUserIdFromToken(req)
  if(!userId){
    res.status(401).send({error:`Bad or missing login token`})
  } else {
    const { rows } = await db.query('SELECT created_by FROM blocs WHERE id = $1',[blocId])
    if(rows.length>0){
      if(rows[0].created_by === userId){
        await db.query('DELETE FROM blocs WHERE id = $1',[blocId])
        res.status(204).end()
      } else {
        res.status(403).end()
      }
    } else {
      res.status(404).end()
    }
  }
})

module.exports = router
