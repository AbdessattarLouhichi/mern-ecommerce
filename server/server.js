//start a new Express application
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import db from './config/connect.js';


//Configuration and Middlewares
dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json())

// Initialize Routes



// connect to database
db.connect();
const PORT = process.env.PORT || 3000;
app.listen(PORT,(error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    });