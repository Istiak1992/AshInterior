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
const contentheaderRoute = require('./routers/contentHeaderRoute');
const productRoute = require('./routers/productRoute');
const projectRoute = require('./routers/projectRoute');
const galleryRoute = require('./routers/galleryRoute');
const teamRoute = require('./routers/teamRoute');
const contactRoute = require('./routers/contactRoute');





//API Route Middleware 
app.use('/api/accounts/v1/', auth); 
app.use('/api/accounts/v1/', permissionRoute);
app.use('/api/content/v1/', contentheaderRoute);
app.use('/api/product/v1/', productRoute);
app.use('/api/project/v1/', projectRoute);
app.use('/api/gallery/v1/', galleryRoute);
app.use('/api/team/v1/', teamRoute);
app.use('/api/contact/v1/', contactRoute);



module.exports = app;