const express = require('express');
const app = express();
const userController = require('../controllers/userControllers')

module.exports=(app)=>{
   app.post('/api/user/signUp', userController.userSignUp);
app.post('/api/user/logIn', userController.loginUser); 
}