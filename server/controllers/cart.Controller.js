import Cart from '../models/cart.js';
import Product from '../models/product.js';

//Get all Carts
export const getCarts = async (req,res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json({carts: carts});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Get cart by id
export const getcartByCustomerId = async (req,res)=>{
    try {

       const cart = await Cart.findOne({customerId: req.params.id})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({message : 'Server Error!'})
    }
};


//create new cart and new item in exixting cart
export const addCart = async (req,res)=>{
    try {
        // find customer 
        const customerId = req.user._id;
        
        const productId = req.body.productId;
        const quantity = parseInt(req.body.quantity); 

        // verify if a cart exists for the customer
        let cart = await Cart.findOne({customerId : customerId});
        let product = await Product.findById(productId);
        
        //check if the product is avaible
        if (!product){
            res.status(400).json({message : "Product not found"})
        }

        // product exists
        const productName = product.name;
        const productPrice = parseInt(product.price) ;
        const image = product.image
        console.log(image)
        // if the cart exists 
        if(cart){
            // check the product in the customer cart 
           const item = await cart.items.find((element)=>(element.productId == productId));

          
            if (item){
                // prodcut exists in the cart So change Cart.items.product.quantity
                item.quantity += quantity
            }else {
                // product doesn't exist , add  the product to the items array
                await cart.items.push({productId : productId,name : productName, quantity : quantity, price : productPrice, image : image})
            }
           
            //The total cost of the shopping cart items 
            let totalPrice = 0;
            await cart.items.map( (item)=>{
                totalPrice +=   item.quantity * item.price;
               return  totalPrice
            })
            cart.cost = totalPrice;

            //save cart
            const data = await cart.save();
            res.status(200).json(data)
        }else{
            // !cart => Create a new cart and add item to that cart
           const newCart =  await Cart.create({
                customerId,
                items : [{productId : productId,name : productName, quantity : quantity, price : productPrice, image: image}],
                cost : quantity*productPrice
            });
            res.status(200).json(newCart)
        }
            
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Remove one item from cart
export const removeItem = async (req,res)=>{
    try {
        const productId = req.params.id;
        const cart = await Cart.findOne({customerId : req.user._id});
       
        let product = await Product.findById(productId);
        const item = await cart.items.find(p => p.productId == productId);
      
        const index = cart.items.indexOf(item);
        if(!item){
           res.status(400).json({message : `The cart does not contain ${product.name}`})
        }
        cart.items.splice(index,1);

         //The New Cost of the shopping cart items 
         let totalPrice = 0;
         await cart.items.map( (item)=>{
             totalPrice +=   item.quantity * item.price;
            return  totalPrice
         })
         cart.cost = totalPrice;

         //save cart
         const data = await cart.save();
         res.status(200).json({message: `${product.name} was successfully removed` ,cart : data})

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// Decrease item from cart
export const decreaseItem = async (req,res)=>{
    try {
        const productId = req.params.id;
        const cart = await Cart.findOne({customerId : req.user._id});
        let product = await Product.findById(productId);
        const item = await cart.items.find(p => p.productId == productId);
        if(!item){
           res.status(400).json({message : `The cart does not contain ${product.name}`})
        }
        if(item.quantity > 1){
            item.quantity -= 1
        }

         //The New Cost of the shopping cart items 
         let totalPrice = 0;
         await cart.items.map( (item)=>{
             totalPrice +=   item.quantity * item.price;
            return  totalPrice
         })
         cart.cost = totalPrice;

         //save cart
         const data = await cart.save();
         res.status(200).json(data)

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

//Update Cart
export const UpdateCart = async (req,res)=>{
    try {
        await Cart.findByIdAndUpdate(req.params.id,req.boy);
        const cart = Cart.findById({_id : req.params.id});
        res.status(200).json({message : "Successfully updated!", cart : cart})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


//Delete Cart
export const deleteCart = async (req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(204).json({message : "Cart deleted!"})
    } catch (error) {
        res.status(500).json({message  : error.message})
    }
}