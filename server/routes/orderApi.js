import  express  from "express";
import passport from "passport";
import { checkout, getAllOrders, getOrder, RemoveOrder } from "../controllers/order.Controller.js";
const router = express.Router();

router.post('/checkout',passport.authenticate('bearer', {session : false}), checkout);
router.get('/orders', passport.authenticate('bearer', {session : false}),authRole("admin","superAdmin") ,getAllOrders);
router.get('/orders/:id',passport.authenticate('bearer', {session : false}),getOrder);
router.delete('/orders/:id',passport.authenticate('bearer', {session : false}),authRole("admin","superAdmin"), RemoveOrder);

export default router;