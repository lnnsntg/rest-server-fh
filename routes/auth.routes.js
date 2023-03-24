const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const login = require('../controllers/auth.controller')
const {
  isValidRole,
  existEmail,
  existUserID
} = require('../helpers/db-validators')

const { validarCampos } = require('../middlewares/validar-campos')

router.post(
  '/login',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'Contraseña válida requerida').not().isEmpty()
  ],
  validarCampos,
  login
)

module.exports = router
