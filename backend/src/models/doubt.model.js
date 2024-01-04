const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
  studentId: {
      type: String,
      required: true,
  },
  doubtSubject: {
      type: String,
      required: true,
  },
  classGrade: {
      type: String,
      required: true,
  },
  language: {
      type: String,
      required: true,
  },
  status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
  },
  tutorId: {
      type: String,
      default: null,
  },
}, { timestamps: true });

const Doubt = mongoose.model('Doubt', doubtSchema);

module.exports = Doubt;
