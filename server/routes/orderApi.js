import  express  from "express";
import { checkout } from "../controllers/order.Controller.js";
const router = express.Router();

router.post('/checkout', checkout)

export default router;