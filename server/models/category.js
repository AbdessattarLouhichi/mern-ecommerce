import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please Enter Category Name']
    },
    description: {
      type: String
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  },
  { timestamps :true , versionKey : false }
)

export default mongoose.model('Category',categorySchema);