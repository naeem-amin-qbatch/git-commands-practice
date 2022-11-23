import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return v.length === 11
      },
      message: val => `${val.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
},
  {
    timestamps: true
  })

const User = new model('User', userSchema)
export default User;