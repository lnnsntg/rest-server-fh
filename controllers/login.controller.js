const { request, response } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const { existEmail } = require('../helpers/db-validators')

const login = async (req = request, res = response) => {
  res.status(200).json({
    message: 'hola desde login'
  })
}

module.exports = login
