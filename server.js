//import required files and libraries
const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');

//handling uncaught exception
process.on('uncaughtException', err => {
    console.log(`Error: ${err.stack}`);
    console.log(`Shutting Down Due to uncaught exception}`);
    process.exit(1)
})


//set up config file path
dotenv.config({ path: 'config/config.env' })


//connect to database 
connectDatabase();



const server = app.listen(process.env.PORT || 4000, () => {
    console.log(`Backend Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`);
})

//handling unhandled promise rejection
process.on('unhandledRejection', err => {
    // console.log(`Error: ${err.message}`);
    console.log(`Error: ${err.stack}`);
    console.log(`Shutting Down the server due to unhandle promise rejection}`);
    server.close(() => {
        process.exit(1)
    })
})