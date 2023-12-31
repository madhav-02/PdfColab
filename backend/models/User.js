const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true, minlength: 5},
    email: {type: String, required: true, unique: true,
        validate: {
          validator: (value) => {
            return validator.isEmail(value);
          },
          message: '{VALUE} is not a valid email address.',
        },
      },
      hashedPassword : {type: String, required: true}
},{timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;