import mongoose from "mongoose";

export default {connect(){
    mongoose.set('strictQuery', true);
    mongoose.connect("mongodb://127.0.0.1:27017/ecommerce-DB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
}}
