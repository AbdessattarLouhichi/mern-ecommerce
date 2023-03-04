import React, { useEffect } from 'react'
import { Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addCart, deleteCart, removeItem, decreaseItem, getCart } from 'src/store/api/cartApi'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Cart() {
  const navigate = useNavigate()
  const id = localStorage.getItem('id')
  const dispatch = useDispatch()
 
  // Default value of empty cart
  const emptyCart = { items : []}
  useEffect(()=>{
    // declare the data fetching function
  const fetchData = async () => {
    await dispatch(getCart(id)) ;
  }

  // call the function
  fetchData()
    // make sure to catch any error
    .catch(console.error);
  },[dispatch, id])

   const cart= useSelector((state)=> state.cart.carts || emptyCart)
  console.log(cart)
  
  
   const increaseCart = (item) => {
    dispatch(addCart(item));
  }

  const decreaseCart = (item) => {
    dispatch(decreaseItem(item));
  }

  const removeFromCart = (item) => {
    dispatch(removeItem(item));
  }

  const clearCart = () => {
    dispatch(deleteCart(cart._id))
  }
  const checkout = (e) =>{
    e.preventDefault()
    navigate('/checkout')
  }
  return (
    <>
    <Container>
      <h2>Shopping Cart</h2>
      { (cart.items === 0 ) ? (
        <div>
          <p>Your cart is currently empty.</p>
          <br />
          <div>
            <Link to="/home">&larr; Continue shopping</Link>
          </div>
        </div>
      ) : (
        <div>
          <table className='table bg-white '>
            <thead className="table-light">
              <tr>
                <th  scope="col">s/n</th>
                <th  scope="col">Product</th>
                <th  scope="col">Price</th>
                <th  scope="col">Quantity</th>
                <th  scope="col">Total</th>
                <th  scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              { cart.items.map((item, index) => {
                const { productId, name, price, image, quantity } = item;
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img
                        src={image}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{price}</td>
                    <td>
                      <div>
                        <button
                          className="btn"
                          onClick={() => decreaseCart(productId)}
                        >
                          -
                        </button>
                        <p>
                          <b>{quantity}</b>
                        </p>
                        <button
                          className="btn"
                          onClick={() => increaseCart({productId: productId, quantity: 1})}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{(price * quantity).toFixed(2)}</td>
                    <td>
                      <button  className="btn btn-danger btn-sm" onClick={() => removeFromCart(productId)}>
                        <FontAwesomeIcon icon={faTrash} className="text-white" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <button className="btn btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
            <div >
              <div>
                <Link to="/home">&larr; Continue shopping</Link>
              </div>
              <br />
              <Card>
                <p>
                  <b> {`Cart item(s): ${cart.cost}`}</b>
                </p>
                <div>
                  <h4>Subtotal:</h4>
                  <h3>{`$${cart.cost}`}</h3>
                </div>
                <p>Tax an shipping calculated at checkout</p>
                <button
                  className="btn btn-primary"
                  onClick={checkout}
                >
                  Checkout
                </button>
              </Card>
            </div>
          </div>
        </div>
      )}
    </Container>
  </>
  )
}

export default Cart