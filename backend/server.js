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

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use(express.json());

mongoose.connect('mongodb+srv://Srinivas:Srinivas@cluster0.eu5eekh.mongodb.net/revly?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use((req, res, next) => {
  req.io = io; 
  next();
});

app.use("/user", authRoutes);
app.use('/doubt', doubtRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
