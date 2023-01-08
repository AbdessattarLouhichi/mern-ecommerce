import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Types.ObjectId, ref: 'Cart'
    },
    TotalPrice: {
        type: Number,
        required: true
    },
    paymentId: {},
    status: {
        type: String,
        default: "Processing",
        enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    invoice : {
        type: String
    }
    },
    { timestamps :true , versionKey : false }
);
  
export default mongoose.model('Order', orderSchema);