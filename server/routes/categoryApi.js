import express from "express";
import passport from "passport";
import authRole from "../config/authRole.js";
import { createCategory, deleteCategory, getcategories, getCategory, updateCategory } from "../controllers/category.Controller.js";



const router = express.Router();

router.post('/createCategory',passport.authenticate('bearer', {session : false}),authRole(["admin","superAdmin"]), createCategory);
router.get('/categories',getcategories);
router.get('/categories/:id', getCategory);
router.put('/categories/:id',passport.authenticate('bearer', {session : false}),authRole(["admin","superAdmin"]), updateCategory);
router.delete('/categories/:id',passport.authenticate('bearer', {session : false}),authRole(["admin","superAdmin"]), deleteCategory);

export default router