import express from "express";
import passport from "passport";
import {register,accountActivation,login,logout,forgotPassword,resetPassword} from "../controllers/authentication.Controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
router.post('/register',upload.single('photo'), register);
router.get('/accountActivation/:activationCode',accountActivation);
router.post('/login',login);
router.get('/logout',passport.authenticate('bearer', {session : false}),logout);
router.post('/forgotPassword',forgotPassword);
router.post('/resetPassword/:token',resetPassword);

export default router
