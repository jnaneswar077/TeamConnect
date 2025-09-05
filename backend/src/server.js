import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './config/env.js';
dotenv.config();

const app = express();



app.get('/', (req, res) => {
    res.send('Hello World');
});



app.listen(ENV.PORT, () => {
    console.log("server is runnig on port: ", ENV.PORT);
});