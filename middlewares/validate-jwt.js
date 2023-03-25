const jwt = require('jsonwebtoken')
const validateJWT = (req, res, next) => {
  const token = req.header('x-token')

  try {
    if (!token) {
      return
    }
    next()
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' })
  }
}

module.exports = { validateJWT }
