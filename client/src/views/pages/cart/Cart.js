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
 
  useEffect(()=>{
    dispatch(getCart(id))
  },[dispatch, id])

   const cart= useSelector((state)=> state.cart.carts)
   console.log(cart)
   console.log(cart.items)
   const items = cart.items
   const increaseCart = (item) => {
    dispatch(addCart(item));
  };

  const decreaseCart = (item) => {
    dispatch(decreaseItem(item));
  };

  const removeFromCart = (item) => {
    dispatch(removeItem(item));
  };

  const clearCart = () => {
    dispatch(deleteCart());
  };
  const checkout = (e) =>{
    e.preventDefault()
    navigate('/checkout')
  }
  return (
    <>
    <Container>
      <h2>Shopping Cart</h2>
      {items.lenght === 0 ? (
        <>
          <p>Your cart is currently empty.</p>
          <br />
          <div>
            <Link to="/home">&larr; Continue shopping</Link>
          </div>
        </>
      ) : (
        <>
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
              {items.map((item, index) => {
                const { id, name, price, image, quantity } = item;
                return (
                  <tr key={id}>
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
                          className="--btn"
                          onClick={() => decreaseCart(item)}
                        >
                          -
                        </button>
                        <p>
                          <b>{quantity}</b>
                        </p>
                        <button
                          className="--btn"
                          onClick={() => increaseCart(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{(price * quantity)}</td>
                    <td>
                      <button  className="btn btn-danger btn-sm" onClick={() => removeFromCart(item)}>
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
                  className="--btn --btn-primary --btn-block"
                  onClick={checkout}
                >
                  Checkout
                </button>
              </Card>
            </div>
          </div>
        </>
      )}
    </Container>
  </>
  )
}

export default Cart