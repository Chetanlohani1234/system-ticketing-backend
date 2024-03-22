
const express=require("express");

require('dotenv').config();
var app = express();

var bodyParser = require('body-parser');

const cors = require("cors");
app.use('/uploads', express.static('uploads'));

app.use(cors());

const port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//connect database......
require('./database/db').connectdb();


//routes
 require('./routes/postRoute')(app)
 require('./routes/userRoute')(app)
 //require('./routes/commentRoute')(app)
 require('./routes/adminRoute')(app)



app.use((err, req, res, next) => {
    if(err && err.error && err.error.message){
        res.status(400).send({sucees:false,message:err.error.message})
    }else{
        next()
    }
})
const server = app.listen(port,() => {
  console.log('Server is listening on Port:', port)
})

let io = require('socket.io')(server)

io.on('connection',(socket) => {
    console.log(`New connection:${socket.id}`)
    
    // Recieve event

    socket.on('comment', (data) => {
        console.log(data);
        data.time = Date()
        socket.broadcast.emit('comment',data);

    })
})