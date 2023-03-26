const jwt = require('jsonwebtoken')

// La función de abajo funciona pero voy a crear una promesa para manejar el error si es que existe
// const getToken = uid => {
//   return (token = jwt.sign(uid, process.env.SECRET))
// }

const getToken = uid => {
  return new Promise((resolve, reject) => {
    const payload = { uid }

    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: '4h' },
      (error, token) => {
        if (error) {
          console.log(error)
          reject(new Error('La generación del token falló'))
        } else {
          resolve(token)
        }
      }
    )
  })
}

module.exports = getToken
