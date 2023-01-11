import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import User from "../models/user.js"
import easyinvoice from "easyinvoice";
import path from "path";
import fs from "fs";
import Stripe from "stripe";
import { stripeSecretKey } from "../config/config.js";
import sendEmail from "../common/mail.js";
const stripe = new Stripe(stripeSecretKey);


//convert cart to order
export const checkout = async(req,res)=>{
    try {
        // find cart by customer
        const customerId = req.user._id;
        const customer = await User.findById(customerId)
        const cart = await Cart.findOne({customerId : customerId});
        const {deliveryAddress} = req.body;
        //stripe Token 
        const stripeToken = await stripe.tokens.create({
            card :{
                number : '4242424242424242',
                exp_month : 8,
                exp_year : 2025,
                cvc : '314'
            }
        })

        if (cart) {
            const products = cart.items.map((item)=>{
                return{
                    "quantity" :item.quantity,
                    "description": item.name,
                    "tax-rate": 0,
                    "price": item.price
                }
            })
            // the accepted amount by Stripe should be in cents 
            const amount = cart.cost * 100;
            
         
            //Accept a payment using Stripe Elements and the Charges API
            const charge = stripe.charges.create({
                amount: amount,
                currency: 'USD',
                source: stripeToken.id,
                description: 'chage test'
            })
        
            if(!charge){
                res.status(400).json({message : "Payment failed"})
            }
            
            //create invoice and send mail confirmation 
            const data = {
                // Customize enables you to provide your own templates
                // Please review the documentation for instructions and examples
                "customize": {
                    //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
                },
                "images": {
                    // The logo on top of your invoice
                    "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
                    // The invoice background
                    "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
                },
                // Your own data
                "sender": {
                    "company": "Sample Corp",
                    "address": "Sample Street 123",
                    "zip": "1001",
                    "city": "Tunis",
                    "country": "Tunisia"
                    //"custom1": "custom value 1",
                    //"custom2": "custom value 2",
                    //"custom3": "custom value 3"
                },
                // Your recipient
                "client": {
                    "company": customer.firstName,
                    "address": deliveryAddress.street,
                    "zip": deliveryAddress.zipcode,
                    "city": deliveryAddress.city,
                    "country": deliveryAddress.country
                    // "custom1": "custom value 1",
                    // "custom2": "custom value 2",
                    // "custom3": "custom value 3"
                },
                "information": {
                    // Invoice number
                    "number": cart._id,
                    // Invoice data
                    "date": new Date(),
                    // Invoice due date
                    //"due-date": "31-12-2021"
                },
                // The products you would like to see on your invoice
                // Total values are being calculated automatically
                "products": products,
                // The message you would like to display on the bottom of your invoice
                //"bottom-notice": "Kindly pay your invoice within 15 days.",
                // Settings to customize your invoice
                "settings": {
                    "currency": "TND", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
                    "locale": "fr-FR", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
                    // "tax-notation": "gst", // Defaults to 'vat'
                    // "margin-top": 25, // Defaults to '25'
                    // "margin-right": 25, // Defaults to '25'
                    // "margin-left": 25, // Defaults to '25'
                    // "margin-bottom": 25, // Defaults to '25'
                    // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
                    // "height": "1000px", // allowed units: mm, cm, in, px
                    // "width": "500px", // allowed units: mm, cm, in, px
                    // "orientation": "landscape", // portrait or landscape, defaults to portrait
                },
                // Translate your invoice to your preferred language
                "translate": {
                     "invoice": "Facture",  // Default to 'INVOICE'
                     "number": "Numéro", // Defaults to 'Number'
                     "date": "Date", // Default to 'Date'
                    // "due-date": "Verloopdatum", // Defaults to 'Due Date'
                    // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
                     "products": "Produits", // Defaults to 'Products'
                     "name": "nom", //Defaults to 'Name'
                     "quantity": "quantité", // Default to 'Quantity'
                     "price": "Prix", // Defaults to 'Price'
                    // "product-total": "Total", // Defaults to 'Total'
                    // "total": "Total" // Defaults to 'Total'
                },
            };
           const invoice = await  easyinvoice.createInvoice(data, function (result) {
                //The response will contain a base64 encoded PDF file
                return result.pdf
            });
           
            //const result = await easyinvoice.createInvoice(data);
            //easyinvoice.download('myInvoice.pdf', result.pdf);
            const invoicePath = await path.resolve(`./storages/invoices/${customer.firstName}-invoice`)
            await fs.writeFileSync(invoicePath, invoice.pdf,'base64')

            // sucess payment & create order 
            const order = await Order.create({
                customerId: customerId,
                cart: cart,
                deliveryAddress: deliveryAddress,
                paymentId: (await charge).id,
                status : "Paid",
                invoice : invoice.pdf
            });

            //update stock
            cart.items.map(async (item)=>{
                await Product.findByIdAndUpdate(item.productId,{ $inc : {stock : -item.quantity}},{new : true})
            });

            // send order confirmation email
            const attachment = [
                {
                    filename :'invoice.pdf',
                    path: invoicePath ,
                    encoding :'base64'
                }
            ]

            await sendEmail(customer.email,"Order confirmation",{name : customer.firstName},"./templates/orderConfirmation.ejs",attachment)

            if(order.status == "Paid"){
                await Cart.findByIdAndDelete({_id : cart._id})
            }
            // order success status
            res.status(200).json({message : "Your order has been placed successfully!", order : order})
            
        } else {
            res.status(404).json({message : "cart is empty"})
        }
      
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


// get All Orders
export const getAllOrders = async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json({orders: orders});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// get order byID
export const getOrder = async (req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate('customerId').populate('cart')
        res.status(200).json({order : order})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// delete Order 
export const RemoveOrder = async (req,res)=>{
    try {
          await  Order.findByIdAndDelete(req.params.id);
          res.status(204).json({message : "Order deleted!"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}