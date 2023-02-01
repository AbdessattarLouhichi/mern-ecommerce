//start a new Express application
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from 'path'
import { fileURLToPath } from 'url';
import db from './config/connect.js';
import authRoutes from "./routes/authApi.js";
import userRoutes from "./routes/userApi.js";
import productRoutes from "./routes/productApi.js";
import categoryRoutes from "./routes/categoryApi.js";
import cartRoutes from "./routes/cartApi.js";
import oderRoutes from "./routes/orderApi.js"
import session from "express-session";
import passport from "passport";
import  "./config/bearer.js"
import { sessionSecret } from "./config/config.js";

//Configuration and Middlewares
dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet({crossOriginResourcePolicy: false}));
app.disable('etag');
app.use(bodyParser.json());
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge : 1000*60*60*2}
  }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/storages/uploads')));
// Initialize Routes
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', cartRoutes)
app.use('/api',oderRoutes)




// connect to database
db.connect();
const PORT = process.env.PORT || 3000;
app.listen(PORT,(error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    });