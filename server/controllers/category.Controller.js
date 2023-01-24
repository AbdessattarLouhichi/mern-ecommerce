import Category from "../models/category.js"

//Create category
export const createCategory = async (req,res)=>{
    try {
        const category = await Category.create(req.body);
        res.status(201).json({message : 'New category successfully added!', data : category})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
}

// find all products 
export const getcategories = async (req,res)=>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};


//find one product by Id
export const getCategory = async (req,res)=>{
    try {
        const category = await Product.findById(req.params.id);
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};

// update product
export const updateCategory = async (req,res)=>{
    try {
         await Category.findByIdAndUpdate(req.params.id, req.body);
        const category = await Category.findOne({_id : req.params.id})
        res.status(200).json({message : "Successfully updated!", data : category})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};

// delete product
export const deleteCategory = async (req,res)=>{
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(204).json({message: "category deleted!"})
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};
