import express from "express";
import passport from "passport";
import authRole from "../config/authRole.js";
import { addCart, decreaseItem, deleteCart, getcartByCustomerId, getCarts, removeItem, UpdateCart } from "../controllers/cart.Controller.js";

const router = express.Router();

router.post('/cart/addItem',passport.authenticate('bearer', {session : false}), addCart);
router.get('/carts', passport.authenticate('bearer', {session : false}),authRole(["admin","superAdmin"]) ,getCarts);
router.get('/carts/:id',passport.authenticate('bearer', {session : false}),getcartByCustomerId);
router.put('/carts/:id',passport.authenticate('bearer', {session : false}),UpdateCart);
router.put('/cart/decreaseItem/:id',passport.authenticate('bearer', {session : false}),decreaseItem)
router.delete('/carts/:id',passport.authenticate('bearer', {session : false}), deleteCart);
router.delete('/cart/removeItem/:id',passport.authenticate('bearer', {session : false}),removeItem);


// Anonymous User

export default router;