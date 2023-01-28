import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { getAllProducts, deleteProduct } from 'src/store/api/productApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

function ViewProducts() {
  // useState hook to filter and search products
  const [search, setSearch] = useState('')
  const [filterProducts, setFilterProducts] = useState([])
  // usedipatch to dispatch action productSlice
  const dispatch = useDispatch()
  // dispatch action
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  
  //react-data-table columns
  const columns = [
    {
      name: 'Image',
      selector: (row) => <img alt="Product" width={50} height={50} src={row.image} />,
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
          <Link to={'/admin/updateProduct/' + row._id} className="btn btn-success btn-sm me-2">
            <FontAwesomeIcon icon={faPencil} className="text-white" />
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteProduct(row._id))}>
            <FontAwesomeIcon icon={faTrash} className="text-white" />
          </button>
        </div>
      ),
    },
  ]
  
  const products = useSelector((state) => state.product.products)
  useEffect(() => {
    const result = products.filter((product) => {
      return product.name.toLowerCase().match(search.toLowerCase())
    })
    setFilterProducts(result)
  }, [products, search])
  return (
    <DataTable
      title="Product List"
      columns={columns}
      data={filterProducts}
      pagination
      fixedHeader
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
  )
}
export default ViewProducts
