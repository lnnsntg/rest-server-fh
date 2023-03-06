const { connect } = require('mongoose')
const uri = process.env.MONGODB_CONN

const dbConnection = async () => {
  try {
    await connect(uri)
    console.log('Conexión exitosa a la base de datos')
  } catch (error) {
    throw new Error('Error al conectar a la base de datos')
  }
}

module.exports = {
  dbConnection
}
