import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from 'src/components/Loading'
import { addCart } from 'src/store/api/cartApi'
import { getProduct } from 'src/store/api/productApi'


function ProductDetail() {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const {id} = useParams();
  
  const handleChange = (e)=>{
    setQuantity(e.target.value)
  }

  useEffect(()=>{
    // declare the data fetching function
    const fetchData = async () => {
        await dispatch(getProduct(id)) ;
    }
    // call the function
    fetchData()
        // make sure to catch any error
        .catch(console.error);
  },[dispatch, id])

const product = useSelector((state)=> state.product.products)

console.log(quantity)
const addToCart = () => {
  console.log(quantity)
  dispatch(addCart({productId: product._id, quantity: quantity}));
}
  return (
    <Container>
      {(product === undefined) ? Loading :(
        <section className="py-5">
            <div className="container my-5 border border-secondary rounded bg-light px-0">
                <div className="row align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0 img-fluid p-0 " src={product.image} alt={product.name}/></div>
                    <div className="col-md-6">
                        <div className="small mb-1">{product.category}</div>
                        <h1 className="display-5 fw-bolder">{product.name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through"></span>
                            <span>${product.price}</span>
                        </div>
                        <p className="lead">{product.description}</p>
                        <div className="d-flex">
                            <input className="form-control text-center border-warning me-3" id="inputQuantity" type="num" value={quantity} onChange={handleChange} style={{maxWidth: "3rem" }}/>
                            <button onClick={addToCart} className="btn btn-outline-warning flex-shrink-0" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )}
    </Container>
  )
}

export default ProductDetail