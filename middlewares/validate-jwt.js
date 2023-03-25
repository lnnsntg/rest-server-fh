const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
  const token = req.header('x-token')

  try {
    if (!token) {
      return res.status(404).json({ message: 'No se recibió el token' })
    }

    const { uid } = jwt.verify(token, process.env.SECRET)

    next()
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' })
  }
}

module.exports = { validateJWT }
