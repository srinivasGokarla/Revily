const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      subjectType: {
        type: String,
        required: true,
      },
     
    }, { timestamps: true });

const Doubt = mongoose.model('Doubt', doubtSchema);

module.exports = Doubt;
