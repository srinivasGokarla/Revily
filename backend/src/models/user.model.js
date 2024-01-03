const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role : {
    type: String,
    required: true,
  },
  
  classGrade : {
    type: String,
    required: false,
  },
  language: {
    type: String,
    required: false,
  },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
