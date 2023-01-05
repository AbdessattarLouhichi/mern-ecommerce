import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Product Name']
    },
    category : {
        type: String,
        required: [true, 'Please Enter Product Category']
    },
    price:{
        type : Number,
        required : [true, 'Please Enter Product Price']
    },
    description: {
        type: String,
        required: [true, 'Please Enter Product Description']
    },
    images: [
        {type : String}
    ],
    stock: {
        type : Number,
        required: [true, "Please Enter product Stock"]
    }
}
,
    { timestamps :true , versionKey : false }
)

export default mongoose.model('Product',productSchema)