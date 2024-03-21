
const express=require("express");

const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();
var app = express();

const server = http.createServer(app);
const io = socketIo(server);

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    // Handle events here
});

var bodyParser = require('body-parser');

const cors = require("cors");
app.use('/uploads', express.static('uploads'));

app.use(cors());

const port = process.env.PORT || 5000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//connect database......
require('./database/db').connectdb();

// Middleware for Socket.io integration
  app.use((req, res, next) => { 
    req.io = io;
    next();
});

//routes
 require('./routes/postRoute')(app)
 require('./routes/userRoute')(app)
 require('./routes/commentRoute')(app)
 require('./routes/adminRoute')(app)



app.use((err, req, res, next) => {
    if(err && err.error && err.error.message){
        res.status(400).send({sucees:false,message:err.error.message})
    }else{
        next()
    }
})
 server.listen(port,() => {
  console.log('Server is listening on Port:', port)
})