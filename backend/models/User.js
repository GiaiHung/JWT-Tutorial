const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 10,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    admin: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('user', UserSchema)
