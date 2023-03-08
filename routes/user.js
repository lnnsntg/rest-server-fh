const { Router } = require('express')
const {
  usersGet,
  usersPost,
  usersDelete,
  usersPatch,
  usersPut
} = require('../controllers/user')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { Role } = require('../models/role')

const router = Router()

// ---------------------------------------------------------
router.get('/', usersGet)

// ---------------------------------------------------------
router.put('/:id', usersPut)

// ---------------------------------------------------------
router.post(
  '/',
  [
    check('name', 'El nombre no puede estar vacío').not().isEmpty(),
    check('password', 'El password debe tener longitud de 6 ó más').isLength({
      min: 6
    }),
    check('email', 'Debe ser un correo válido').isEmail(),
    // check('role', 'No es un rol válido').isIn(['USER', 'ADMIN']),
    check('role').custom(async (role = '') => {
      const existRole = await Role.findOne({ role })
      if (!existRole) {
        throw new Error('El rol no esta registrado en la base de datos')
      }
    }),
    validarCampos
  ],
  usersPost
)

// ---------------------------------------------------------
router.delete('/', usersDelete)

// ---------------------------------------------------------
router.patch('/', usersPatch)

module.exports = router
