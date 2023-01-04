import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type : String
    },
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user",
    },
    photo :{
        type : String
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    token: { type: String }
    },
    { timestamps :true , versionKey : false }
);



export default mongoose.model('User', userSchema)