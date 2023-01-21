import React from 'react'
import { useDispatch } from 'react-redux'
import { createProduct } from 'src/store/api/productApi'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function AddProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const categories = ["cat1","cat2","cat3"]
  //const categories = useSelector((state) => state.category.categories)
  const addProduct = (values) => {
    dispatch(createProduct(values))
    navigate('/viewProducts')
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
    name: Yup.string().required('Required!'),
    description: Yup.string().required('required!'),
    price: Yup.number().required('required!'),
    stock: Yup.number().required('required!'),
    category: Yup.string().required('required!'),
  })

  return (
    <div>
      <div className="container justify-content-center pt-5 ">
        <div className="row d-flex justify-content-center">
          <div className="col-10 bg-white my-4 p-5 rounded">
            {/* Add Produt input form -*/}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={addProduct}
            >
              {(formik) => {
                return (
                  <Form>
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
                      />
                      <ErrorMessage name="description" component={'div'} className="text-danger" />
                    </div>
                    {/* Product Price input type number */}
                    <div className="form-group my-3">
                      <label htmlFor="price" className="font-weight-bold">
                        Price
                      </label>
                      <Field type="number" className="form-control" id="price" name='price'/>
                      <ErrorMessage name='price' component={'div'} className="text-danger"/>
                    </div>
                    {/* Product Quantity input type number */}
                    <div className="form-group my-3">
                      <label htmlFor="stock" className="font-weight-bold">Quantity</label>
                      <Field type="number" className="form-control" id="stock" name='stock' />
                      <ErrorMessage name='stock' component={'div'} className="text-danger"/>
                    </div>
                    <div className='my-4'>
                      <label htmlFor="category" className="font-weight-bold">Category</label>
                      <Field as="select" name="category" id="category" >
                        {
                          categories.map((item,index)=>
                          <option key={index} >{item}</option>
                          )
                        }
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

export default AddProduct