//start a new Express application
import express, { application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import db from './config/connect.js';
import authRoutes from "./routes/authApi.js";
import userRoutes from "./routes/userApi.js";
import productRoutes from "./routes/productApi.js";
import categoryRoutes from "./routes/categoryApi.js";
import cartRoutes from "./routes/cartApi.js";
import session from "express-session";
import passport from "passport";
import  "./config/bearer.js"

//Configuration and Middlewares
dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(session({
    secret: '*$#a727e823e58489bbea04@~~#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge : 3600000}
  }))

// Initialize Routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', cartRoutes)



// connect to database
db.connect();
const PORT = process.env.PORT || 3000;
app.listen(PORT,(error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    });