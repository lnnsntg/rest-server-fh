const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { existEmail } = require('../helpers/db-validators')
const getToken = require('../helpers/getToken')

const login = async (req = request, res = response) => {
  const { email, password } = req.body
  try {
    // Verficar si el email existe
    const user = await User.findOne({ email })

    // console.log(user)

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Bad request el usuario no existe' })
    }

    // Verificar si el usuario esta activo
    if (!user.state) {
      return res
        .status(400)
        .json({ message: 'Bad request el usuario esta bloqueado' })
    }

    // Verificar si el usuario esta activo
    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ message: 'Bad request password apestaA' })
    }

    // Generar el JWT
    const token = await getToken(user.id)

    res.status(200).json({
      email,
      password,
      token
    })
  } catch (error) {
    res.status(500).json({ message: 'Bad request' })
  }
}

module.exports = login
