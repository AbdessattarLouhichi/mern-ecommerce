import express from "express";
import passport from "passport";
import authRole from "../config/authRole.js";
import upload from "../middlewares/upload.js";
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct, updateProductImages } from "../controllers/product.Controller.js";


const router = express.Router();

/* The post request must have a body elemnt with name images */
router.post('/createProduct', passport.authenticate('bearer', {session : false}),authRole(["admin" , "superAdmin"]),upload.single('image'), createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProduct);
router.put('/products/:id',passport.authenticate('bearer', {session : false}),authRole(["admin" , "superAdmin"]),upload.array('images'), updateProduct);
router.put('/products/:id/updateImages',passport.authenticate('bearer', {session : false}),authRole(["admin", "superAdmin"]),upload.array('images'), updateProductImages);
router.delete('/products/:id',passport.authenticate('bearer', {session : false}),authRole( ["admin" ,"superAdmin"]), deleteProduct);

export default router