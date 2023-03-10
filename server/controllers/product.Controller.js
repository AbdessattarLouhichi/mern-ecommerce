import { BaseURL } from '../config/config.js';
import Product from '../models/product.js'

//Create Product
export const createProduct = async (req,res)=>{
    try {
        if(req.file){
            const fileName = req.file.filename;
            const filePath =  `${BaseURL}/storages/uploads/${fileName}`;
            req.body.image = filePath;
        }
        const product = await Product.create(req.body);
        res.status(201).json({message : 'New Product successfully added!', data : product})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// find all products 
export const getAllProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};


//find one product by Id
export const getProduct = async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};

// update product
export const updateProduct = async (req,res)=>{
    try {
        if(req.file){
            const fileName = req.file.filename;
            const filePath =  `${BaseURL}/storages/uploads/${fileName}`;
            req.body.image = filePath;
        }
        await Product.findByIdAndUpdate(req.params.id, req.body)
        const product = await Product.findOne({_id : req.params.id})
        res.status(200).json({message : "Successfully updated!", data : product})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};

// Update produt images
export const updateProductImages = async(req,res)=>{
    try {
        if(req.files){
            let filesPaths =[];
            req.files.map((file)=>{
                filesPaths.push(`${BaseURL}/storages/uploads/${file.filename}`)
            })
        }
        await Product.findByIdAndUpdate(req.params.id, {images : filesPaths},{ new: true });
        const product = Product.findOne({_id : req.params.id});
        res.status(200).json({message : "Successfully updated!", data : product})
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// delete product
export const deleteProduct = async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(204).json({message: "product deleted!"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
};
