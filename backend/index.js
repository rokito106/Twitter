// import express, { json } from 'express'
// import dotenv from 'dotenv'
// // import databaseconnection from './config/database.js';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import userRoute from './routes/userRoute.js'
// import tweetRoute from './routes/tweetRoute.js'
// import cors from "cors";

// dotenv.config({
//     path: ".env"
// })

// const app = express();


// // databaseconnection();
// mongoose.connect('mongodb://127.0.0.1:27017/twitter-app')
//     .then(() => console.log('DB connected'))
//     .catch((err) => console.log(err));

// app.use(express.urlencoded({ extended: true }));
// app.use(json());
// app.use(cookieParser());
// const corsoption={
//     origin:'http://localhost:5173',
//     credentials:true
// }
// app.use('/api/v1/user', userRoute)
// app.use('/api/v1/tweet', tweetRoute)

// app.use(cors(corsoption));


// app.listen(process.env.PORT, () => {
//     console.log(`Server listen at port ${process.env.PORT}`)
// })

import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoute from './routes/userRoute.js';
import tweetRoute from './routes/tweetRoute.js';

dotenv.config({
    path: ".env"
});

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/twitter-app')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

// Route setup
app.use('/api/v1/user', userRoute);
app.use('/api/v1/tweet', tweetRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});