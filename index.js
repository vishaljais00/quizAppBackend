const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./Models");
const dotenv = require("dotenv").config();
const userRoute = require('./routes/userRoutes');
const quizMasterRoutes = require('./routes/quizMasterRoutes');
const userQuizMasterRoutes = require('./routes/userQuizMasterRoutes');
const userAttendRoutes = require('./routes/userAttendRoutes');
const emailRoutes = require('./routes/emailRoutes');
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");



// Import Socket.IO
const socketIO = require('socket.io');
const http = require('http'); // Import http module
//setting up your port
const PORT = process.env.PORT || 8080;

//assigning the variable app to express
const app = express();
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "10kb" }));
app.use(
  fileUpload({
    limits: {
      fileSize: 50 * 1024 * 1024,
      useTempFiles: true,
      tempFileDir: "/tmp/",
    },
  })
);

//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync().then(() => {
  console.log("db has been re sync");
});

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:3000", "http://campaigns.cybermatrixsolutions.com", "http://campaigns.cybermatrixsolutions.com/", "http://localhost:3000/"],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Initialize Socket.IO


// Socket.IO logic
io.on('connection', socket => {
  console.log('A user connected');

  socket.on('adminMessage', message => {
    // Broadcast the message to all connected clients
    io.emit('userMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// db.sequelize.sync({alter: true ,force: true}).then(() => {
//   console.log("db has been re sync");
// });

//await sequelize.sync();
//routes for the user API
app.use('/api/user',userRoute);
app.use('/api/quiz',quizMasterRoutes);
app.use('/api/userquiz',userQuizMasterRoutes);
app.use('/api/attend',userAttendRoutes);
app.use('/api/email', emailRoutes);



// __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//listening to server connection
server.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
