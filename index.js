
const express=require("express");
require('dotenv').config();
var app = express();
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

//routes
 require('./routes/postRoute')(app)
 require('./routes/userRoute')(app)



app.use((err, req, res, next) => {
    if(err && err.error && err.error.message){
        res.status(400).send({sucees:false,message:err.error.message})
    }else{
        next()
    }
})
 app.listen(port,() => {
  console.log('Server is listening on Port:', port)
})