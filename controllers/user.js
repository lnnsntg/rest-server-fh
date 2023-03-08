const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { validationResult } = require('express-validator')

// --------------------------------------------------
const usersGet = (req = request, res = response) => {
  const { name, lastname } = req.query

  res.status(200).json({
    msg: 'get API - controlador',
    name,
    lastname
  })
}

// CREATE USER
const usersPost = async (req = request, res = response) => {
  const errorValidator = validationResult(req)

  if (!errorValidator.isEmpty()) {
    console.log(errorValidator)
    return res.status(400).json(errorValidator)
  }

  const { name, email, password, rol } = req.body

  try {
    const user = new User({ name, email, password, rol })

    // Verificar si el correo existe
    const existEmail = await User.findOne({ email })
    if (existEmail) {
      return res.status(400).json({
        message: 'El usuario ya existe'
      })
    }

    // Hasherar la contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)
    console.log('conlog===', user.password)

    await user.save()
    res.send({
      user
    })
  } catch (error) {
    console.log('console====', error.message)
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
const usersPut = (req = request, res = response) => {
  const { id } = req.params
  res.status(201).json({
    msg: 'put API',
    id
  })
}

module.exports = {
  usersGet,
  usersPost,
  usersDelete,
  usersPatch,
  usersPut
}
