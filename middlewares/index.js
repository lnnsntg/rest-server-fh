const validateJWT = require('../middlewares/validate-jwt')
const validarCampos = require('../middlewares/validar-campos')
const validarRoles = require('../middlewares/validar-role')

module.exports = {
  ...validarCampos,
  ...validarRoles,
  ...validateJWT
}
