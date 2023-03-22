const { Role } = require('../models/role')
const User = require('../models/user')

// Validar si el rol existe. Añade por default el rol 'USER' si no se envia role
const isValidRole = async (role = 'USER') => {
  const existRole = await Role.findOne({ role })
  if (!existRole) {
    throw new Error(`El rol ${role} no esta registrado en la base de datos`)
  }
}


const existEmail = async (email) => {
  exist = await User.findOne({ email })
  if (exist) {
    throw new Error(`El email ${email} ya esta registrado en la bd`)
  }
}


module.exports = { isValidRole, existEmail }
