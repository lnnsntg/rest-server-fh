const { request, response } = require('express')

const isAdmin = (req = request, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ message: 'Error en la verificación del role' })
  }
  const { role, name } = req.user
  if (role !== 'ADMIN') {
    return res
      .status(401)
      .json({ message: `El usuario: ${name} no es administrador` })
  }

  next()
}

module.exports = { isAdmin }
