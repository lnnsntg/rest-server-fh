const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const login = require('../controllers/login.controller')

router.post('/login', login)

module.exports = router
