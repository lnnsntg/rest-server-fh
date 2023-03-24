const jwt = require('jsonwebtoken')

//La funcion de abajo funciona pero voy a crear una promesa para manejar el error si es que existe
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
          reject('La generacion del token falló')
        } else {
          resolve(token)
        }
      }
    )
  })
}

module.exports = getToken
