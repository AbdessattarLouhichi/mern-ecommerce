import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { getAllUsers, deleteUser } from 'src/store/api/userApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'

function ViewUsers() {
  // useState hook to filter and search users
  const [search, setSearch] = useState('')
  const [filterUsers, setFilterUsers] = useState([])
  // dispatch action
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  
  const users = useSelector((state) => state.user.users)
  //react-data-table columns
  const columns = [
    {
      name: 'Image',
      selector: (row) => <img alt="User" width={50} height={50} src={row.photo} />,
    },
    {
      name: 'Name',
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.phoneNumber,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="d-flex text-center">
          <Link to={'/admin/updateUser/' + row._id} className="btn btn-success btn-sm me-2">
            <FontAwesomeIcon icon={faPencil} className="text-white" />
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteUser(row._id))}>
            <FontAwesomeIcon icon={faTrash} className="text-white" />
          </button>
        </div>
      ),
    },
  ]
  
  useEffect(() => {
    setTimeout(()=>{
      const result = users.filter((user) => {
        return user.firstName.toLowerCase().match(search.toLowerCase())
      })
      setFilterUsers(result)
    },500)
  }, [users, search])

  return (
    <DataTable
      title="User List"
      columns={columns}
      data={filterUsers}
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
export default ViewUsers
