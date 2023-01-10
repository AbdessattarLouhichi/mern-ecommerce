import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId, ref:'User'
    },
    cart: {
        type: mongoose.Types.ObjectId, ref: 'Cart'
    },
    deliveryAddress: {
        street: {type: String, required: 'Street is required'},
        city: {type: String, required: 'City is required'},
        zipcode: {type: String, required: 'Zip Code is required'},
        country: {type: String, required: 'Country is required'}
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