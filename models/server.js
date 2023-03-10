const express = require('express')
const cors = require('cors')
const router = require('../routes/user')
const { dbConnection } = require('../db/config')

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

    // CORS
    this.app.use(cors())

    // Parse and read body
    this.app.use(express.json())

    this.app.use('*', (req, res, next) => {
      console.log(req.method, req.baseUrl /* req.headers */)
      next()
    })
  }

  // ---------------------------------------------------------
  routes () {
    this.app.use('/api/users', router)
  }

  // ---------------------------------------------------------
  listen () {
    this.app.listen(this.port || 8080, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }
}

module.exports = Server
