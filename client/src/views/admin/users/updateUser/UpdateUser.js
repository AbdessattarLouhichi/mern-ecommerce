import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { getUser, updateUser } from 'src/store/api/userApi'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function UpdateUser() {
  const dispatch = useDispatch()
  const {id} = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState([{
    firstName: '',
    lastName: '',
    role: '',
    phoneNumber: '',
    photo:null,
   }])

//fetch Data 
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await dispatch(getUser(id))
      console.log(response)
      // ...
      return setData(response.payload.data)
    }
    fetchData()
  }, [id, dispatch])
 
  
  const handleFileUpload = async (e,setFieldValue)=>{
    const file = e.target.files[0];
    console.log(file)
    setFieldValue('photo', file)
  }

  const handleChange = (e)=>{
    setData({...data,
      [e.target.id]: e.target.value
    })
  }
  console.log(data)
  // dispatch updateUser
  const updateData = async () =>{
    await dispatch(updateUser({id : id, data: data}))
    .then((response) =>{ 
      toast.success(response.payload.message, {
        position: "top-center",
      })
      setTimeout(()=>{
        navigate ('/admin/viewUsers')
      },3000)
    })
    .catch((error)=>{
      toast.error(error.message , {
        position: "top-center",
      })
    }) 
    
  }

  const initialValues ={
    firstName: '',
    lastName:'',
    role:'',
    phoneNumber:'',
    photo:''
   }

   const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    role: Yup.string(),  
    phoneNumber: Yup.number(),
  })

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <ToastContainer />
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col-12 col-md-8 my-3">
              <div  className="card bg-white" style={{borderRadius: "1rem"}}>
                <div className="card-body py-3 px-5">
                  <div className='mb-md-5 mt-md-4 pb-3'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema ={validationSchema}
                        onSubmit = {updateData}>

                        {formik => {
                        return(
                        <Form className="row g-3" encType="multipart/form-data">
                            <div className="my-2">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <Field type="text"  id="firstName" name="firstName" value={data.firstName} onChange={handleChange} className="form-control rounded-pill "/>
                                <ErrorMessage name='firstName' component={'div'} className="text-danger"/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="validationServer02" className="form-label">Last Name</label>
                                <Field type="text"  id="lastName" name="lastName" value={data.lastName} onChange={handleChange} className="form-control rounded-pill"/>
                                <ErrorMessage name='lastName' component={'div'} className="text-danger"/>
                            </div>
                            <div className=" my-2 ">
                                <label htmlFor="role" className="">Role</label>
                                <Field type="text"  id="role" name="role" value={data.role} onChange={handleChange}  className="form-control rounded-pill " placeholder='example: admin, customer'/>
                                <ErrorMessage name='role' component={'div'} className="text-danger" />
                            </div>
                            <div className=" my-2">
                                <label htmlFor="phoneNumber" className="">Phone Number</label>
                                <Field type="number"  id="phoneNumber" name="phoneNumber" value={data.phoneNumber} onChange={handleChange} className="form-control rounded-pill" placeholder="12-345-678"/>
                                <ErrorMessage name='phoneNumber' component={'div'} className="text-danger" />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="photo" className="font-weight-bold">Add Photo</label>
                                <Field name="photo">
                                {({ form, field }) => {
                                  
                            const { setFieldValue } = form
                                return (
                                  <input
                                    type="file"
                                    className='form-control-file'
                              
                                  onChange={(e) => handleFileUpload(e, setFieldValue)}
                                    />
                                    )
                                  }}
                                </Field>
                            </div>
                            <div className="text-center d-grid gap-2">
                                <button type="submit" className="btn btn-outline-light btn-dark btn-lg px-5 rounded-pill"  disabled={!formik.isValid || formik.isSubmitting}>Update</button>
                            </div>
                        </Form>
                        )}}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default UpdateUser