const User = require("../models/user.model");
const Doubt = require("../models/doubt.model");
const Tutor = require('../models/tutor.model');


exports.findMatchingTutors = async (student) => {
    try {
      const matchingTutors = await Tutor.find({
        allowedSubjectTypes: student.subjectType,
        teachingClassGrade: student.classGrade,
        teachingLanguage: student.language,
      });
  
      return matchingTutors;
    } catch (error) {
      console.error('Error finding matching tutors:', error.message);
      throw error;
    }
  };
exports.createDoubt = async (req, res) => {
    try {
        const { subjectType } = req.body;
        const studentId = req.params._id
        const studentDoubt = new Doubt({ studentId, subjectType });
        await studentDoubt.save();
    
        const student = await User.findById(studentId);
        const matchingTutors = await findMatchingTutors(student);
        matchingTutors.forEach((tutor) => {
          io.to(tutor.socketId).emit('doubtNotification', {
            studentId,
            subjectType,
          });
        });
        res.status(201).json({ message: 'Doubt created successfully' });
      } catch (error) {
        console.error('Error creating doubt:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

exports.doubtHistory = async (req, res) => {
    try {
        const studentId = req.user._id; 
        const doubtHistory = await Doubt.find({ studentId })
        .sort({ createdAt: -1 })
        .exec();
        res.status(200).json(doubtHistory);
      } catch (error) {
        console.error('Error fetching doubt history:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

