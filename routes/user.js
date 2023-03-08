const { Router } = require('express')
const { usersGet, usersPost, usersDelete, usersPatch, usersPut } = require('../controllers/user')
const { check } = require('express-validator')

const router = Router()

// ---------------------------------------------------------
router.get('/', usersGet)

// ---------------------------------------------------------
router.put('/:id', usersPut)

// ---------------------------------------------------------
router.post('/', [
  check('name', 'El nombre no puede estar vacío').not().isEmpty(),
  check('password', 'El password debe tener longitud de 6').isLength({ min: 6 }),
  check('email', 'Debe ser un correo válido').isEmail(),
  check('rol', 'No es un rol válido').isIn('USER', 'ADMIN')
], usersPost)

// ---------------------------------------------------------
router.delete('/', usersDelete)

// ---------------------------------------------------------
router.patch('/', usersPatch)

module.exports = router
