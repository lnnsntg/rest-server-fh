const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { existEmail } = require('../helpers/db-validators')

// GET USERS --------------------------------------------

const usersGet = async (req = request, res = response) => {
  const { limit, desde } = req.query

  const [users, total] = await Promise.all([
    await User.find({}).skip(Number(desde)).limit(Number(limit)),
    await User.countDocuments({ state: true })
  ])

  res.status(200).json({
    total,
    users
  })
}

// CREATE USER ------------------------------------------------
const usersPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body

  try {
    const user = new User({ name, email, password, role })

    // Verificar si el correo existe
    existEmail(email)

    // Hashear la contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()
    res.json({
      user
    })
  } catch (error) {
    console.log('consolelog====', error.message)
    res.send(error)
  }
}

// UPDATE USER -------------------------------------------------------
// Actualiza un los campos name, password role, state

const usersPut = async (req = request, res = response) => {
  const { id } = req.params
  const { _id, password, google, email, ...rest } = req.body

  // Todo validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, rest)
  // console.log(user)

  res.status(201).json({
    user
  })
}

// USER DELETE--------------------------------------------------
// Este controlador no borra el usuario sino que marca su estado a false

const usersDelete = async (req, res) => {
  const { id } = req.params

  const user = await User.findByIdAndUpdate(id, { state: false })
  res.status(200).json(user)
}

// --------------------------------------------------
const usersPatch = (req = request, res = response) => {
  res.status(201).json({
    msg: 'patch API'
  })
}

// --------------------------------------------------
module.exports = {
  usersGet,
  usersPost,
  usersDelete,
  usersPatch,
  usersPut
}
