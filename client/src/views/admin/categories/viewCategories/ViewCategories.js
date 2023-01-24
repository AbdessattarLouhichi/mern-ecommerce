import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { getAllCategories, deleteCategory } from 'src/store/api/categoryApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

function ViewCategories() {
  // useState hook to filter and search products
  const [search, setSearch] = useState('')
  const [filterCategories, setFilterCategories] = useState([])
  // usedipatch to dispatch action productSlice
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category.categories)
  console.log(categories)
  //react-data-table columns
  const columns = [
    {
      name: 'Category Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex text-center">
          <Link to={'/admin/updateCategory/' + row._id} className="btn btn-success btn-sm me-2">
            <FontAwesomeIcon icon={faPencil} className="text-white" />
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteCategory(row._id))}>
            <FontAwesomeIcon icon={faTrash} className="text-white" />
          </button>
        </div>
      ),
    },
  ]
  // dispatch action
  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])
  useEffect(() => {
    const result = categories.filter((cat) => {
      return cat.name.toLowerCase().match(search.toLowerCase())
    })
    setFilterCategories(result)
  }, [categories, search])
  return (
    <DataTable
      title="Category List"
      columns={columns}
      data={filterCategories}
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
export default ViewCategories
