const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { existEmail } = require('../helpers/db-validators')

// Get users ------------------------------------------------
const usersGet = async (req = request, res = response) => {
  const users = await User.find({})

  res.status(200).json({
    msg: 'get API - controlador',
    users
  })
}

// CREATE USER
const usersPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body

  try {
    const user = new User({ name, email, password, role })

    // Verificar si el correo existe
    existEmail(email)

    // Hasherar la contraseña
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

// --------------------------------------------------
const usersPatch = (req = request, res = response) => {
  res.status(201).json({
    msg: 'patch API'
  })
}

// USER DELETE--------------------------------------------------
// Este controlador no borra el usuario sino que marca su estado a false
const usersDelete = async (req = request, res = response) => {
  const { id } = req.params
  const user = await User.findByIdAndDelete(id)
  res.status(200).json({
    msg: id
  })
}

// Update User Actualiza un los campos name, password role, state, ----------------------------------

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

// --------------------------------------------------
module.exports = {
  usersGet,
  usersPost,
  usersDelete,
  usersPatch,
  usersPut
}
