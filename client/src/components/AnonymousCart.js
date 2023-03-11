/* anonymous user manage  shopping Cart */

// Add item 
export const  addAnonymCart = (data) => {
    console.log(data)
    // cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart'))
    // destruction
    const {item, quantity} = data

    // check the product in the  cart 
      const product = cart.items.find((element)=>(element.productId === item._id));
    console.log(product)
                
      if (product){
          // prodcut exists in the cart So change Cart.items.product.quantity
          product.quantity += quantity
          localStorage.setItem('cart', JSON.stringify(cart))
      }else {
          // product doesn't exist , add  the product to the items array
          cart.items.push({productId : item._id, name : item.name, quantity : quantity, price : item.price, image : item.image})
          localStorage.setItem('cart', JSON.stringify(cart))
      }

      //The total cost of the shopping cart items 
        let totalPrice = 0;
        cart.items.map( (p)=>{
            totalPrice +=   p.quantity * p.price;
            return  totalPrice
        })
        cart.cost = totalPrice;
        if (typeof window === 'undefined') 
            return localStorage.setItem('cart', JSON.stringify(cart));
        
}
