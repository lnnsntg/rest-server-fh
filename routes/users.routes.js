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
const {
  isValidRole,
  existEmail,
  existUserID
} = require('../helpers/db-validators')

const router = Router()

// ---------------------------------------------------------
router.get('/', usersGet)

// ---------------------------------------------------------
router.put(
  '/:id',
  [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserID),
    check('role').custom(isValidRole)
  ],
  validarCampos,
  usersPut
)

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
    check('role').custom(isValidRole),
    check('email').custom(existEmail),
    validarCampos
  ],
  usersPost
)

// ---------------------------------------------------------
router.delete('/', usersDelete)

// ---------------------------------------------------------
router.patch('/', usersPatch)

module.exports = router
