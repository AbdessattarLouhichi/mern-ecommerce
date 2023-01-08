import express from "express";
import passport from "passport";
import authRole from "../config/authRole.js";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.Controller.js";


const router = express.Router();

router.post('/createProduct', passport.authenticate('bearer', {session : false}),authRole("admin","superAdmin"), createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProduct);
router.put('/products/:id',passport.authenticate('bearer', {session : false}),authRole("admin","superAdmin"), updateProduct);
router.delete('/products/:id',passport.authenticate('bearer', {session : false}),authRole("admin","superAdmin"), deleteProduct);

export default router