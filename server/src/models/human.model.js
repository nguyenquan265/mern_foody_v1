import mongoose from 'mongoose'
import validator from 'validator'

const humanSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photoURL: {
    type: String,
    default: 'https://static.thenounproject.com/png/4154905-200.png'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

export const Human = mongoose.model('Human', humanSchema)
