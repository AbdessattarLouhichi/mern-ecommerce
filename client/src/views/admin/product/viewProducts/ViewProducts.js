import React, { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import Modal from 'react-modal'
import { getAllProducts, deleteProduct, getProduct, updateProduct } from 'src/store/api/productApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Formik } from 'formik'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { getAllCategories } from 'src/store/api/categoryApi'

function ViewProducts() {
  // useState hook to filter and search products
  const [search, setSearch] = useState('')
  const [filterProducts, setFilterProducts] = useState([])
  const [productToUpdate, setProductToUpdate] = useState({})
  const [modalIsOpen, setIsOpen] = useState(false);

  // usedipatch to dispatch action productSlice
  const dispatch = useDispatch()

  // dispatch action
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  
  //Get All categories
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])
  const categories = useSelector((state) => state.category.categories)

  //react-data-table columns
  const columns = [
    {
      name: 'Image',
      selector: (row) => row.image,
      cell: ({image})=><img alt="Product" width={50} height={50} src={image} />
    },
    {
      name: 'Product Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Categories',
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex text-center">
           <button onClick={() => openModal(row._id)} className='btn btn-success me-2 rounded-0'><FontAwesomeIcon icon={faPencil} className="text-white" /></button>
          <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteProduct(row._id))}>
            <FontAwesomeIcon icon={faTrash} className="text-white" />
          </button>
        </div>
      ),
    },
  ]
  
  const products = useSelector((state) => state.product.products)

   // Modal Styles
   const modalStyles = {
    content: {
      borderRadius: '10px',
      top: '50%',
      left: '50%',
      width: '50%',
      minHeight: '65%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement("*");

  const openModal = async (id) => {
    const response = await dispatch(getProduct(id))
    setProductToUpdate(response.payload.data)
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  useEffect(() => {
    setTimeout(()=>{
      const result = products.filter((product) => {
        return product.name.toLowerCase().match(search.toLowerCase())
      })
      setFilterProducts(result)
    },500)
  }, [products, search])

  return (
    <div className="card m-4">
      <div className="card-header text-center">
        <h1 className='text-dark ps-5'>Products List</h1>
      </div>
      <div className="card-body">
        <DataTable
          columns={columns}
          data={filterProducts}
          pagination
          selectableRows
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search here"
              className="form-control w-25"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
          }
        />

        {/*Modal */}
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        ariaHideApp={false}
        contentLabel="Update Modal"
      >
        <div>Update product here<FontAwesomeIcon onClick={closeModal} icon={faXmark} className='float-end cursor-pointer p-2' /></div>
        <Formik
          initialValues={productToUpdate || { name: '', category:'', description: '', price:1, stock:0 }}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Required';
            }
            if (!values.category) {
              errors.category = 'Required';
            }
            if (!values.description) {
              errors.description = 'Required';
            }
            return errors;
          }}
          onSubmit={async (values) => {
            try {
              const response = await dispatch(updateProduct({id:productToUpdate._id, data : values}))
              dispatch(getAllProducts())
              closeModal()
              toast.success(response.data.message)
              return true
            } catch (error) {
              toast.error(error.response.data.message)
            }
          }}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
              <form onSubmit={handleSubmit} className='d-flex flex-column w-100 p-4'>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className='form-control'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <p className='text-danger px-4 py-2'>{errors.name && touched.name && errors.name}</p>
                <label htmlFor="category" className="font-weight-bold">Category</label>
                      <select name="category" id="category" value={values.category}  onChange={handleChange} >
                        {
                          categories.map((item)=>
                          <option key={item._id} >{item.name}</option>
                          )
                        }
                      </select>
                <p className='text-danger px-4 py-2'>{errors.category && touched.category && errors.category}</p>
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  className='form-control'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                <p className='text-danger px-4 py-2'>{errors.description && touched.description && errors.description}</p>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  className='form-control'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                />
                <p className='text-danger px-4 py-2'>{errors.price && touched.price && errors.price}</p>
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  className='form-control'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.stock}
                />
                <p className='text-danger px-4 py-2'>{errors.stock && touched.stock && errors.stock}</p>
               
                <input type='file' onChange={(e)=>setFieldValue('images', e.target.files)} className='form-control' multiple />
                <div className='mt-4'>
                  <button type="submit" className='btn btn-success px-5' disabled={isSubmitting}>
                    Update Product
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Modal>
      </div>
    </div>
  )
}
export default ViewProducts
