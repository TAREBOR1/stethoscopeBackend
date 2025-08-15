const express = require('express');
const { getAllUsers } = require('../controller/userController');

const userRoute = express.Router();

userRoute .get('/all', getAllUsers);

module.exports = userRoute ;
