import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { getProduct, updateProduct } from 'src/store/api/productApi'
import { getAllCategories } from 'src/store/api/categoryApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function UpdateProduct() {
  const dispatch = useDispatch()
  const {id} = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState([{
                                      name: ' ',
                                      category: ' ',
                                      price: 1,
                                      description: ' ',
                                      stock: 0,
                                      image: ' ',
                                      images: [],  
                                  }])

//Get All categories
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])
  const categories = useSelector((state) => state.category.categories)
//fetch Data getProduct()
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await dispatch(getProduct(id))
      console.log(response)
      // ...
      return setData(response.payload.data)
    }
    fetchData()
  }, [id, dispatch])
 
  
  const handleFileUpload = async (e,setFieldValue)=>{
    const file = e.target.files[0];
    console.log(file)
    setFieldValue('image', file)
  }

  const handleChange = (e)=>{
    setData({...data,
      [e.target.id]: e.target.value
    })
  }
  console.log(data)
  // dispatch updateProduct
  const updateData = async () =>{
    await dispatch(updateProduct({id : id, data: data}))
    .then((response) =>{ 
      toast.success(response.payload.message, {
        position: "top-center",
      })
      setTimeout(()=>{
        navigate ('/admin/viewProducts')
      },3000)
    })
    .catch((error)=>{
      toast.error(error.message , {
        position: "top-center",
      })
    }) 
    
  }

  const initialValues = {
    name: '',
    category: '',
    price: 1,
    description: '',
    image: '',
    stock: 0,
  }

  const validationSchema = Yup.object({
    name: Yup.string(),
    description: Yup.string(),
    price: Yup.number(),
    stock: Yup.number(),
    category: Yup.string(),
  })

  return (
    <div>
      <ToastContainer />
      <div className="container justify-content-center pt-5 ">
        <div className="row d-flex justify-content-center">
          <div className="col-10 bg-white my-4 p-5 rounded">
            {/* Add Produt input form -*/}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={updateData}
            >
              {(formik) => {
                return (
                  <Form encType="multipart/form-data">
                    {/* Product Name input type text*/}
                    <div className="form-group">
                      <label htmlFor="name" className="font-weight-bold">
                        Product
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Product Name"
                        value={data.name}
                        onChange={handleChange}
                      />
                      <ErrorMessage name="name" component={'div'} className="text-danger" />
                    </div>
                    {/* Product Description input textarea */}
                    <div className="form-group my-3">
                      <label htmlFor="description" className="font-weight-bold">
                        Description
                      </label>
                      <Field
                        as="textarea"
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={data.description} 
                        onChange={handleChange}
                      />
                      <ErrorMessage name="description" component={'div'} className="text-danger" />
                    </div>
                    {/* Product Price input type number */}
                    <div className="form-group my-3">
                      <label htmlFor="price" className="font-weight-bold">
                        Price
                      </label>
                      <Field type="number" className="form-control" id="price" name='price' value={data.price}  onChange={handleChange} />
                      <ErrorMessage name='price' component={'div'} className="text-danger"/>
                    </div>
                    {/* Product Quantity input type number */}
                    <div className="form-group my-3">
                      <label htmlFor="stock" className="font-weight-bold">Quantity</label>
                      <Field type="number" className="form-control" id="stock" name='stock' value={data.stock}  onChange={handleChange} />
                      <ErrorMessage name='stock' component={'div'} className="text-danger"/>
                    </div>
                    <div className='my-4'>
                      <label htmlFor="category" className="font-weight-bold">Category</label>
                      <Field as="select" name="category" id="category" value={data.Category}  onChange={handleChange} >
                        {
                          categories.map((item)=>
                          <option key={item._id} >{item.name}</option>
                          )
                        }
                      </Field>
                    </div>
                    <div className="form-group my-4">
                        <label htmlFor="image" className="font-weight-bold">Add images</label>
                        <Field name="images" encType="multipart/form-data">
                        {({ form, field }) => {
                          const { setFieldValue } = form
                          return (
                            <input
                              type="file"
                              className='form-control-file'
                              onChange={(e) => handleFileUpload(e, setFieldValue)}
                              encType="multipart/form-data"
                              multiple
                            />
                          )
                        }}
                        </Field>
                    </div>
                  
                    {/*Click button  to add product*/}
                    <button  type="submit"  className="btn btn-dark   font-weight-bold" disabled={!formik.isValid || formik.isSubmitting}>Add product</button>
                  </Form>
            )}}
          </Formik>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default UpdateProduct