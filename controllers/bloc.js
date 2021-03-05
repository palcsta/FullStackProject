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
  const userId = getUserIdFromToken(req)
  if(!userId){
    res.status(401).send({error:`Bad or missing login token`})
  } else if(!body.name){
    res.status(401).send({error:`Blocs require a name`})
  } else if(body.name.length>maxBlocNameLength){
    res.status(401).send({error:`Bloc name too long. Maximum allowed length is ${maxBlocNameLength}`})
  } else if(!containsOnlyAlphaCodes(body.countries)){
    res.status(401).send({error:`There was a syntax error with the bloc you are trying to save`})
  } else {
    await db.query('INSERT INTO blocs (created_by,data) VALUES ($1,$2)',[userId,body])
    logger.info('Saved bloc:',body)
    res.status(200).send({info:'Bloc saved'})
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
