import express from "express";
import { accountActivation, forgotPassword, login, logout, register, resetPassword } from "../conrollers/authentication.Controller";

const router = express.Router();
router.post('/register', register);
router.get('/account-activation/:activationCode', accountActivation);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/password-reset/:userId/:token', resetPassword);

export default router;