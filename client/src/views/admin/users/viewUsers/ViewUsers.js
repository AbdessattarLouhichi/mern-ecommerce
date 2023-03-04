import React, { useState, useEffect } from 'react'
//import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import Modal from 'react-modal';
import { getAllUsers, deleteUser, getUser, updateUser } from 'src/store/api/userApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { Formik } from 'formik'

function ViewUsers() {
  // useState hook to filter and search users
  const [search, setSearch] = useState('')
  const [filterUsers, setFilterUsers] = useState([])
  const [pending, setPending] = useState(true);
  const [userToUpdate, setUserToUpdate] = useState({})
  const [modalIsOpen, setIsOpen] = useState(false);
  //const [photo, setPhoto] = useState()

  /* upload file
  const onFileSelect = ({ currentTarget }) => {
    setPhoto(currentTarget.files[0])
  }*/
  //loading
  const Loading = (
    <div className="d-flex justify-content-center h-100 align-items-center">
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
  // dispatch action
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers())
    .then(setPending(false))
  }, [dispatch])
  
  const users = useSelector((state) => state.user.users)
  //react-data-table columns
  const columns = [
    {
      name: 'Image',
      selector: (row) => <img alt="User" width={50} height={50} src={row.photo} className="rounded-circle" />,
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
          <button onClick={() => openModal(row._id)} className='btn btn-success me-2 rounded-0'><FontAwesomeIcon icon={faPencil} className="text-white" /></button>
          <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteUser(row._id))}>
            <FontAwesomeIcon icon={faTrash} className="text-white" />
          </button>
        </div>
      ),
    },
  ]

 
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
    const response = await dispatch(getUser(id))
    setUserToUpdate(response.payload.data)
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }

// filter Users
  useEffect(() => {
    setTimeout(()=>{
      const result = users.filter((user) => {
        return user.firstName.toLowerCase().match(search.toLowerCase())
      })
      setFilterUsers(result)
    },500)
  }, [users, search])

  return (
    <div className="card m-4">
    <div className="card-header text-center">
      <h1 className='text-dark ps-5'>Users List</h1>
    </div>
    <div className="card-body">
    <DataTable
      columns={columns}
      data={filterUsers}
      pagination
      selectableRows
      highlightOnHover
      progressPending={pending}
      progressComponent={Loading}
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

    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={modalStyles}
    ariaHideApp={false}
    contentLabel="Update Modal"
  >
    <div>Update user here<FontAwesomeIcon onClick={closeModal} icon={faXmark} className='float-end cursor-pointer p-2' /></div>
    <Formik
      initialValues={userToUpdate || { firstName: '', email: '', role: '' }}
      validate={values => {
        const errors = {};
        if (!values.firstName) {
          errors.firstName = 'Required';
        }
        if (!values.role) {
          errors.role = 'Required';
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async (values) => {
        try {
          const response = await dispatch(updateUser({id:userToUpdate._id, data : values}))
          dispatch(getAllUsers())
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
          <label>firstName</label>
          <input
            type="text"
            name="firstName"
            className='form-control'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          />
          <p className='text-danger px-4 py-2'>{errors.firstName && touched.firstName && errors.firstName}</p>
          <label>LastName</label>
          <input
            type="text"
            name="lastName"
            className='form-control'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
          />
          <p className='text-danger px-4 py-2'>{errors.lastName && touched.lastName && errors.lastName}</p>
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            className='form-control'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <p className='text-danger px-4 py-2'>{errors.email && touched.email && errors.email}</p>
          <label>Role</label>
          <input
            type="text"
            name="role"
            className='form-control'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role}
          />
          <p className='text-danger px-4 py-2'>{errors.role && touched.role && errors.role}</p>
          <label>Phone</label>
          <input
            type="number"
            name="phoneNumber"
            className='form-control mb-5'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phoneNumber}
          />
          
          <input type='file' onChange={(e)=>setFieldValue('photo', e.target.files[0])} className='form-control' />
          <div className='mt-4'>
            <button type="submit" className='btn btn-success px-5' disabled={isSubmitting}>
              Update user
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
export default ViewUsers
