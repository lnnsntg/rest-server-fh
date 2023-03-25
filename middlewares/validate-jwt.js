const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async (req, res, next) => {
  try {
    const token = req.header('x-token')

    // Verifico si el token ha sido enviado
    if (!token) {
      return res.status(404).json({ message: 'No se recibió el token' })
    }

    // Recibido el token verifico firma y extraigo id
    const { uid } = jwt.verify(token, process.env.SECRET)

    // Verifico si el usuario existe en la base de datos
    const user = await User.findById(uid)
    if (!user) {
      return res.status(404).json({
        message:
          'Fallo de autenticación, el usuario no fue encontrado en la base de datos'
      })
    }

    // Verificar si el usuario existe en true state (esto quiere decir que el usuario no ha sido dado de baja)
    if (!user.state) {
      return res.status(401).json({
        message: 'El usuario autenticado tiene state false'
      })
    }

    // Añado el usuario a la request para que lo reciba el controlador
    req.user = user

    next()
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' })
  }
}

module.exports = { validateJWT }
