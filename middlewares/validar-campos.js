const { request, response } = require('express')
const { validationResult } = require('express-validator')

const validarCampos = (req = request, res = response, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('log middlewares.validar-campos', errors)
    return res.status(400).json(errors)
  }
  next()
}

module.exports = {
  validarCampos
}
