import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { getUser, updateUser } from 'src/store/api/userApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'

function EditProfile() {
  const dispatch = useDispatch()
  const {id} = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState([{
    firstName: '',
    lastName: '',
    phoneNumber: '',
    photo:null,
   }])

//fetch Data 
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await dispatch(getUser(id))
      // ...
      return setData(response.payload.data)
    }
    fetchData()
  }, [id, dispatch])

  console.log(data)
 
  const initialValues ={
    firstName: '',
    lastName:'',
    phoneNumber:'',
    photo:''
   }

   const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(), 
    phoneNumber: Yup.number(),
  })

  return (
    <div>
      <ToastContainer />
          <div className="row d-flex justify-content-center align-items-center h-50 py-5">
            <div className="col-12 col-md-8 my-3">
              <div  className="card bg-white" style={{borderRadius: "1rem"}}>
                <div className="card-body py-3 px-5">
                  <div className='mb-md-5 mt-md-4 pb-3'>
                    <Formik
                      initialValues={data || initialValues}
                      validationSchema ={validationSchema}
                      onSubmit={async (values) => {
                        try {
                          const response = await dispatch(updateUser({id:id, data : values}))
                          navigate('/user/profile')
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
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default  EditProfile