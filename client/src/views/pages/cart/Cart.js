import React, { useEffect } from 'react'
import { faArrowAltCircleLeft, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addCart, deleteCart, removeItem, decreaseItem, getCart } from 'src/store/api/cartApi'
import { toast } from 'react-toastify';



function Cart() {
    let numberOfItems = 0;
    const navigate = useNavigate()
    const id = localStorage.getItem('id')
    const dispatch = useDispatch()
    
    // Default value of empty cart
    //const emptyCart = { items : []}
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

    const cart= useSelector((state)=> state.cart.carts || JSON.parse(localStorage.getItem('cart')))
    
    // increase Item quantity
    const increaseCart = async(data)=>{
        await dispatch(addCart(data))  
      }
    // decrease Item quantity
    const decreaseCart = async (data) => {
       await dispatch(decreaseItem(data));
    }
    // Remove item from cart
    const removeFromCart = async (data) => {
       await dispatch(removeItem(data))
       .then((response)=>{
        toast.success(response.payload.message, {
            position: "top-center",
          })
       })
       .catch((error)=>{
        toast.error(error.message , {
          position: "top-center",
        })
      }) 
    }
    // Delete All Items from cart
    const clearCart = async () => {
       await dispatch(deleteCart(cart._id))
    }

    // navidate to checkout 
    const checkout = (e) =>{
        e.preventDefault()
        navigate('/checkout')
    }

  return (
    <>
        <section className="h-100 h-custom py-5">
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100 mx-md-3">
                {(cart.items === 0 ) ? (
                        <div>
                        <p>Your cart is currently empty.</p>
                        <br />
                        <div>
                            <Link to="/home">&larr; Continue shopping</Link>
                        </div>
                        </div>
                    ) :(
                    <div className="col-12">
                        <div className="card border-warning" style={{borderRadius: "15px"}}>
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                                            </div>
                                            <hr className="my-4" />
                                            { cart.items.map((item) => {
                                                console.log(item)
                                                const { name, price, image, quantity } = item;
                                                numberOfItems += quantity
                                                return (
                                                    <>
                                                        <div className="row mb-4 d-flex justify-content-between align-items-center" key={item._id}>
                                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                            <img
                                                                src={image}
                                                                alt={name}
                                                                style={{ width: "100px" }}
                                                                className="img-fluid rounded-3" 
                                                            />
                                                            </div>
                                                            <div className="col-md-2 col-lg-3 col-xl-3">
                                                            <h6 className="text-black mb-0">{name}</h6>
                                                            </div>
                                                            <div className="col-md-3 col-lg-4 col-xl-3 d-flex justity-content-between align-items-baseline">
                                                            <button  className="btn btn-link text-warning"  onClick={() => decreaseCart(item)} >
                                                                <FontAwesomeIcon icon={faMinus} />
                                                            </button>

                                                            <p className='border border-warning px-2'>{quantity}</p>

                                                            <button className="btn btn-link px-2 text-success" onClick={() => increaseCart({item, quantity: 1})}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                            </button>
                                                            </div>
                                                            <div className="col-md-2 col-lg-2 col-xl-2 offset-lg-1">
                                                            <h6 className="mb-0">{(price * quantity).toFixed(2)}</h6>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                <button  className="btn btn-danger btn-sm" onClick={() => removeFromCart(item)}>
                                                                    <FontAwesomeIcon icon={faTrash} className="text-white" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <hr className="my-4"/>
                                                    </>
                                                )}
                                            )}
                                            <div className="pt-2">
                                                <button className="btn btn-danger" onClick={clearCart}>
                                                    Clear Cart
                                                </button>
                                            </div>
                                            <div className="pt-5">
                                                <h6 className="mb-0"><Link to="/home" className="text-body"><FontAwesomeIcon icon={faArrowAltCircleLeft} />Back to shop</Link></h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4" style={{backgroundColor: "#eae8e8", borderRadius: "0 15px 15px 0"}} >
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                            <hr className="my-4"/>

                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text-uppercase">items: {numberOfItems} </h5>
                                                <h5>{ cart.cost ? ( `$${cart.cost}`) : 0}</h5>
                                            </div>
                                            <hr className="my-4"/>
                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="text-uppercase">Total price</h5>
                                                <h5>{ cart.cost ? ( `$${cart.cost}`) : 0}</h5>
                                            </div>
                                            <div className="text-center d-grid gap-2">
                                                <button type="button" 
                                                    className="btn btn-dark btn-block btn-lg"
                                                    data-mdb-ripple-color="dark"
                                                    onClick={checkout}
                                                >
                                                    Checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </section>
    </>
  )
}

export default Cart