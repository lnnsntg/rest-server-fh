const { request, response } = require('express')

const isAdmin = (req = request, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ message: 'Error en la verificación del token' })
  }
  const { role, name } = req.user
  if (role !== 'ADMIN') {
    return res
      .status(401)
      .json({ message: `El usuario: ${name} no es administrador` })
  }

  next()
}

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({
        message:
          'Error en la verificación del rol, antes debe verificar el token'
      })
    }
    // console.log(req.user.role)
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ message: 'El rol no tiene los privilegios suficientes' })
    }

    next()
  }
}

module.exports = { isAdmin, hasRole }
