const { Role } = require('../models/role')
const User = require('../models/user')

// Validar si el rol existe. Añade por default el rol 'USER' si no se envia role
const isValidRole = async (role = 'USER') => {
  const existRole = await Role.findOne({ role })
  if (!existRole) {
    throw new Error(`El rol ${role} no esta registrado en la base de datos`)
  }
}

const existEmail = async email => {
  const exist = await User.findOne({ email })
  console.log(email)

  if (exist) {
    throw new Error(`El email: ${email} ya esta registrado en la bd`)
  }
}

const existUserID = async id => {
  const exist = await User.findById(id)
  console.log(id)

  if (!exist) {
    throw new Error(`El ID: ${id} ya no existe en la bd`)
  }
}

module.exports = { isValidRole, existEmail, existUserID }
