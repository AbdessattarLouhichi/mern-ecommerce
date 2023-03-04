import express from "express";
import passport from "passport";
import upload from "../middlewares/upload.js";
import authRole from "../config/authRole.js";
import { deleteUser, getAllCustomers, getAllUsers, getUser, updateUser } from "../controllers/user.Controller.js";

const router = express.Router();

router.get('/users',passport.authenticate('bearer', {session : false}), authRole(["admin","superAdmin"]), getAllUsers);
router.get('/customers',passport.authenticate('bearer', {session : false}), authRole(["admin","superAdmin"]), getAllCustomers);
router.get('/users/:id',passport.authenticate('bearer', {session : false}), getUser);
router.put('/users/:id',passport.authenticate('bearer', {session : false}), upload.single('photo'), updateUser);
router.delete('/users/:id',passport.authenticate('bearer', {session : false}),authRole(["admin","superAdmin"]), deleteUser)

export default router