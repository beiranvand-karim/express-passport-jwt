
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/APIAuthenticaton');

const app = express();


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.use('/users', require('./routes/users'));

//start server

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server started at port ${port}`);