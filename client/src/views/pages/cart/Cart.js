import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { addCart, deleteCart, removeItem, decreaseItem, getCart } from 'src/store/api/cartApi';

function Cart() {
  const dispatch = useDispatch()
  const id = localStorage.getItem('id')
  useEffect(() => {
      dispatch(getCart(id))
  }, [dispatch,id])
  
   const carts= useSelector((state)=> state.cart.carts)
   console.log(carts)
   
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
    Navigate('/checkout')
  }


  return (
    <>
    <Container>
      <h2>Shopping Cart</h2>
      {carts.length === 0 ? (
        <>
          <p>Your cart is currently empty.</p>
          <br />
          <div>
            <Link to="/home">&larr; Continue shopping</Link>
          </div>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((cart, index) => {
                const { id, name, price, image, quantity } = cart.items;
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
                          onClick={() => decreaseCart(cart)}
                        >
                          -
                        </button>
                        <p>
                          <b>{quantity}</b>
                        </p>
                        <button
                          className="--btn"
                          onClick={() => increaseCart(cart)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{(price * quantity).toFixed(2)}</td>
                    <td>
                      <button  className="btn btn-danger btn-sm" onClick={() => removeFromCart(cart)}>
                        <FontAwesomeIcon icon={faTrash} className="text-white" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <button className="--btn --btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
            <div >
              <div>
                <Link to="/home">&larr; Continue shopping</Link>
              </div>
              <br />
              <Card>
                <p>
                  <b> {`Cart item(s): ${carts.cost}`}</b>
                </p>
                <div>
                  <h4>Subtotal:</h4>
                  <h3>{`$${carts.cost.toFixed(2)}`}</h3>
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