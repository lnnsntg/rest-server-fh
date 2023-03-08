const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

const User = model('User', userSchema)

module.exports = User
