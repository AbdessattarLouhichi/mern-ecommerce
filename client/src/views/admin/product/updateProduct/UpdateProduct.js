import React, { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, updateProduct } from 'src/store/api/productApi'
import { getAllCategories } from 'src/store/api/categoryApi'



function UpdateProduct() {
  const dispatch = useDispatch()
  const {id} = useParams();
  const navigate = useNavigate();
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState('');
  //const [post, setPost] = useState({});
  const [data, setData] = useState([{
    name: '',
    category: '',
    price: 1,
    description: '',
    stock: 0,
    image: '',
    images: [],  
}])

useEffect(() => {
  dispatch(getAllCategories())
}, [dispatch])
const categories = useSelector((state) => state.category.categories)

//fetch Data getProduct()
useEffect(() => {
  const fetchData =  async () => {
    const result = await dispatch(getProduct(id))
    setData(result.payload.data)
  }
  fetchData()
  console.log(data)
}, [id, dispatch])


const handleChange = (e)=>{
    e.preventDefault()
    setData({...data,
      [e.target.id]: e.target.value
    })
    console.log(data)
  }


// dispatch updateProduct
const updateData =  (e) =>{
    e.preventDefault()
    console.log(data)
    dispatch(updateProduct(id, data))
    navigate ('/admin/viewProducts')
 }

  return (
    <div>
      <div className="container justify-content-center pt-5 "> 
    <div className="row d-flex justify-content-center">
        
        <div className="col-10 bg-white my-4 p-5 rounded">
           {/* Add Produt input form -*/}
            <form onSubmit={updateData}>
              {/* Product Name input type text*/}
              <div className="form-group">
                <label htmlFor="name" className="font-weight-bold">Product</label>
                <input type="text" className="form-control" id="name"  value={data.name} onChange={handleChange}/>
              </div>
              {/* Product Description input textarea */}
              <div className="form-group my-3">
                <label htmlFor="description" className="font-weight-bold">Description</label>
                <textarea className="form-control" id="description" value={data.description} onChange={handleChange} rows="3"></textarea>
              </div>
              {/* Product Price input type number */}
              <div className="form-group my-3">
                <label htmlFor="price" className="font-weight-bold">Price</label>
                <input type="number"  className="form-control" id="price" value={data.price} onChange={handleChange}/>
              </div>
              {/* Product Quantity input type number */}
              <div className="form-group my-3">
                <label htmlFor="stock" className="font-weight-bold">Quantity</label>
                <input type="number" className="form-control" id="stock" value={data.stock} onChange={handleChange}/>
              </div>
              <div className='my-4'>
                <label htmlFor="category" className="font-weight-bold">Category</label>
                <select name="categories" id="category" value={data.category}  onChange={handleChange}>
                  {
                    categories.map((item)=>
                    <option key={item._id} >{item.name}</option>
                    )
                  }
                </select>
              </div>
          
              {/*Click button  to add product*/}
              <div className="">
              <button  type="submit"   className="btn  btn-dark  font-weight-bold">Update Product</button>
              </div>
              
            </form>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default UpdateProduct