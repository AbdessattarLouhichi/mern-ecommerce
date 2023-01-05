import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    items: [{
        productId: {
            type: String,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        },
        price: Number
    }],
    cost: {
        type: Number,
        required: true
    },
    transaction_id: {},
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    invoice : {
        type: String
    }
    },
    { timestamps :true , versionKey : false }
);
  
export default mongoose.model('Order', orderSchema);