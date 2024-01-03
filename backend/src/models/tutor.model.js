const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  allowedSubjectTypes: {
    type: [String],
    required: true,
  },
  teachingClassGrade: {
    type: String,
    required: true,
  },
  teachingLanguage: {
    type: String,
    required: true,
  },
});

const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;