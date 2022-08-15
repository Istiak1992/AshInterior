//Database configuration file

const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        // user: process.env.DB_USER,
        // pass: process.env.DB_PASSWORD,
        // dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
}


module.exports = connectDatabase; 