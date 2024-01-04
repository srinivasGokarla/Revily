# Revily Assignment

## Introduction
Revily is a MERN stack application for Realtime doubt resolution.

## Features
Key features of the application include:

- Validation and error handling for API requests
- Authentication and authorization mechanisms for secure API access
- APIs for user login and registration
- APIs for creating and managing doubts
- APIs for facilitating conversations between students and tutors
- APIs for handling messages

## Deployed Link
[Revily Deployment](https://frontend-iidoxh6bp-srinivasgokarla.vercel.app/)

## Installation or How to Run the App
To run the application locally, follow these steps:

### Backend
1. Clone the repository: `https://github.com/srinivasGokarla/Revily`
2. Navigate to the Backend folder: `cd Backend`
3. Install required Node.js packages: `npm install`
4. Run the server: `npm run server` (Server will listen on port 5000)

### Frontend
1. Navigate to the Frontend folder: `cd frontend`
2. Install required React packages: `npm install`
3. Start the React app: `npm start` (App will open in a new browser window at http://localhost:3000)

### MongoDB
- Open MongoDB Compass and connect to the database using the URL `mongodb://localhost:27017/users`. This will create a database collection named `users`.

Now, you can register, log in, and explore the application.

## API Endpoints
Backend APIs provided by the application:

- POST /api/user/register - Register User
- POST /api/user/login - Login user
- POST /api/chat/doubt - Create doubt
- GET /api/chat/dashboard/:userId - User dashboard
- GET /api/chat/doubt-history/:userId - Doubt history
- POST /api/chat/conversation - Create a conversation
- GET /api/chat/conversations/:userId - User conversations
- POST /api/chat/message - Send a message to the Tutor
- GET /api/chat/message/:conversationId - Messages in a conversation

## Technology Stack
The technology stack includes:

- MongoDB: Database for storing data
- Express JS: Backend framework
- React JS: Frontend library
- Node JS: Server-side scripting
- Socket.io: Real-time communication

### Dependencies and Packages

#### Backend
- mongoose: MongoDB connection
- JSON web token: Token generation
- nodemon: Auto-restart on file changes
- cors: Allowing cross-origin resource sharing

#### Frontend
- axios: HTTP requests
- react-router-dom: Dynamic routing

### Cloud Deployment

- Render: MongoDB and Node.js deployment
- Vercel: React.js deployment

## Notes
- Ensure consistent formatting and follow the provided links for accurate access.

