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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'tutor'],
    required: true,
},
  
  classGrade : {
    type: String, 
        required: function () {
            return this.role === 'student';
        },
  },
  language: {
    type: String,
    required: false,
  },
  token: {
    type: String
},
allowedDoubtSubjectTypes: {
  type: [String], 
  required: function () {
      return this.role === 'tutor';
  },
},

});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
