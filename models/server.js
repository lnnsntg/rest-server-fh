const express = require('express')
const cors = require('cors')
const userRouter = require('../routes/users.routes')
const authRouter = require('../routes/auth.routes')
const { dbConnection } = require('../db/config')
const morgan = require('morgan')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    // Conectar a la base de datos
    this.conectarDB()
    // Middlewares
    this.middlewares()
    // Rutas de mi aplicación
    this.routes()
  }

  // Llamada asíncrona a la conexion de la bd
  async conectarDB () {
    await dbConnection()
  }

  // ---------------------------------------------------------
  middlewares () {
    this.app.use(express.static('public'))
    // Morgan
    this.app.use(morgan('tiny'))

    // CORS
    this.app.use(cors())

    // Parse and read body
    this.app.use(express.json())

    // Este middlewares captura el metodo y url para mostrarlo en consola
    // this.app.use('*', (req, res, next) => {
    //   console.log(req.method, req.baseUrl /* req.headers */)
    //   next()
    // })
  }

  // ---------------------------------------------------------
  routes () {
    this.app.use('/api/users', userRouter)
    this.app.use('/api/auth', authRouter)
  }

  // ---------------------------------------------------------
  listen () {
    this.app.listen(this.port || 8080, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

module.exports = Server
