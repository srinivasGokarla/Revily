const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const authRoutes = require('./src/routes/userRoutes');
const doubtRoutes = require('./src/routes/doubtRoutes');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);

let users = [];
const doubtHistory = [];

io.on('connection', socket => {
  console.log('User connected', socket.id);
  socket.on('tutorJoin', (tutorId, classGrade, language, doubtSubject) => {
      onlineTutors.push({ tutorId, socketId: socket.id, classGrade, language, doubtSubject });
      console.log(`Tutor ${tutorId} joined`);
  });

  socket.on('addUser', userId => {
      const isUserExist = users.find(user => user.userId === userId);
      if (!isUserExist) {
          const user = { userId, socketId: socket.id };
          users.push(user);
          io.emit('getUsers', users);
      }
  });

  socket.on('createDoubtRequest', (doubtDetails) => {
      const { classGrade, language, doubtSubject } = doubtDetails;

      const matchingTutors = onlineTutors.filter(
          (tutor) =>
              tutor.classGrade === classGrade &&
              tutor.language === language &&
              tutor.doubtSubject === doubtSubject
      );

      if (matchingTutors.length === 0) {

          io.to(socket.id).emit('doubtRequestResult', {
              success: false,
              message: 'No tutors available at the moment',
          });
          doubtHistory.push({
              timestamp: new Date(),
              studentId: socket.id,
              ...doubtDetails,
              status: 'No tutors available',
          });
      } else {

          matchingTutors.forEach((tutor) => {
              io.to(tutor.socketId).emit('newDoubtRequest', doubtDetails);
          });

          io.to(socket.id).emit('doubtRequestResult', {
              success: true,
              message: 'Tutors have been notified',
          });
          doubtHistory.push({
              timestamp: new Date(),
              studentId: socket.id,
              ...doubtDetails,
              status: 'Tutors notified',
          });
      }
  });

  socket.on('acceptDoubtRequest', (doubtDetails) => {

      io.to(socket.id).emit('doubtRequestResult', {
          success: true,
          message: 'A tutor has accepted your doubt request',
          tutorId: doubtDetails.tutorId,
      });
      onlineTutors = onlineTutors.filter(
          (tutor) => tutor.socketId !== socket.id
      );

      doubtHistory.push({
          timestamp: new Date(),
          studentId: socket.id,
          tutorId: doubtDetails.tutorId,
          ...doubtDetails,
          status: 'Tutor accepted',
      });
  });
  socket.on('getDoubtHistory', () => {
      const studentHistory = doubtHistory.filter(
          (entry) => entry.studentId === socket.id
      );

      io.to(socket.id).emit('receiveDoubtHistory', studentHistory);
  });

  socket.on('disconnect', () => {
      onlineTutors = onlineTutors.filter(
          (tutor) => tutor.socketId !== socket.id
      );
      console.log('User disconnected', socket.id);
  });
});


app.use(express.json());

mongoose.connect('mongodb+srv://Srinivas:Srinivas@cluster0.eu5eekh.mongodb.net/assign?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to DB')).catch((e)=> console.log('Error', e));
app.use((req, res, next) => {
  req.io = io; 
  next();
});

app.use("/user", authRoutes);
app.use('/chat', doubtRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
