//import required libraries and files
const express = require('express');
var cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');


dotenv.config({ path: 'backend/config/config.env' })

//implement middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//Import all routes
const auth = require('./routers/auth');
const permissionRoute = require('./routers/permissionRoute');





//API Route Middleware 
app.use('/api/accounts/v1/', auth); 
app.use('/api/accounts/v1/', permissionRoute);






module.exports = app;