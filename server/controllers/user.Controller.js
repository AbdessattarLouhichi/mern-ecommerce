import User from "../models/user.js";


// find all users 
export const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json({data : users})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};

// find all customers
export const getAllCustomers = async (req,res)=>{
    try {
        const customers = await User.find({role : "customer"});
        res.status(200).json({data : customers})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
}

//find one user by Id
export const getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({data : user})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};

// update user
export const updateUser = async (req,res)=>{
    try {
         await User.findByIdAndUpdate(req.params.id, req.body);
        const user = await User.findOne({_id : req.params.id})
        res.status(200).json({message : "Successfully updated!"})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};

// delete user
export const deleteUser = async (req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({message: "user deleted!"})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};
