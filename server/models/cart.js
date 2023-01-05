import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId, ref:'User'
    },
    items: [{
        productId: {
            type: mongoose.Types.ObjectId, ref: 'Product'
        },
        name: {
            type: String,
            required : true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        price: {
            type: Number,
            required : true
        }
    }],
    cost: {
        type: Number,
        required: true,
        default: 0
    }
},
{ timestamps :true , versionKey : false }
);

export default mongoose.model('Cart',cartSchema)