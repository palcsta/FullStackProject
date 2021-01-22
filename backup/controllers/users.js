const usersRouter = require('express').Router()
const argon = require('argon2')
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await argon.hash(body.password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    hashLength: 50,
})

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter


