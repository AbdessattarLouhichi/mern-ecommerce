import express from "express";
import passport from "passport";
import {register,accountActivation,login,logout,forgotPassword,resetPassword} from "../controllers/authentication.Controller.js";

const router = express.Router();
router.post('/register',register);
router.get('/account-activation/:activationCode',accountActivation);
router.post('/login',login);
router.get('/logout',passport.authenticate('bearer', {session : false}),logout);
router.post('/forgot-password',forgotPassword);
router.post('/password-reset/:userId/:token',resetPassword);

export default router
