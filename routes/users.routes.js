const { Router } = require('express')
const {
  usersGet,
  usersPost,
  usersDelete,
  usersPatch,
  usersPut
} = require('../controllers/user.controller')
const {
  isValidRole,
  existEmail,
  existUserID
} = require('../helpers/db-validators')
const { check } = require('express-validator')
const { validateJWT, validarCampos, hasRole } = require('../middlewares/')

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
router.delete(
  '/:id',
  validateJWT,
  // isAdmin,
  hasRole('ADMIN', 'VENTAS'),
  [
    check('id', 'el ID tiene que ser mongodb id valido').isMongoId(),
    check('id').custom(existUserID),
    validarCampos
  ],
  usersDelete
)

// ---------------------------------------------------------
router.patch('/', usersPatch)

module.exports = router
