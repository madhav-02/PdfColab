const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true,
        validate: {
          validator: (value) => {
            return validator.isEmail(value);
          },
          message: '{VALUE} is not a valid email address.',
        },
      },
      password : {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;