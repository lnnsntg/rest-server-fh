const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { existEmail } = require('../helpers/db-validators')

// --------------------------------------------------
const usersGet = (req = request, res = response) => {
  const { name, lastname } = req.query
  console.log(name, lastname)

  res.status(200).json({
    msg: 'get API - controlador',
    name,
    lastname
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
const usersDelete = (req = request, res = response) => {
  res.status(200).json({
    msg: 'delete API'
  })
}

// Update User -------------------------------------

const usersPut = async (req = request, res = response) => {
  const { id } = req.params
  const { _id, password, google, email, ...rest } = req.body

  // Todo validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync()
    rest.password = bcryptjs.hashSync(password, salt)
  }

  console.log(id)
  console.log(rest)
  const user = await User.findByIdAndUpdate(id, rest)
  // console.log(user)

  res.status(201).json({
    msg: 'put API',
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
