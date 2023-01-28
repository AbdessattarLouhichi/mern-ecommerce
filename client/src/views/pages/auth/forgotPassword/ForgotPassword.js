import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { forgotPassword } from 'src/store/api/authApi'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
//import { toast } from 'react-toastify'


const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [warning, setWarning] = useState(false)
  

  const handleEmail = async  (values)=>{
      await dispatch(forgotPassword (values))
      .then((response) =>{ 
        warning && setWarning(false)
        //SUCCESS LOGIN MESSAGE!  You are successfully logged in
        toast.success(response.payload, {
          position: "top-center",
        })
        setTimeout(()=>{
          navigate('/login')
        },3000)
      })
      .catch(()=>{
        setWarning(true)
      }) 
    
    
  }
  const warningMsg = warning && <div className='alert alert-danger mt-5'>Please check your email and try again !</div>

   const initialValues ={
    email:''
   }

   const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),  
  })

  return (
    <div className="bg-light  d-flex flex-row justify-content-center align-items-center">
      <ToastContainer />
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 my-3">
              <div  className="card bg-white" style={{borderRadius: "1rem"}}>
                <div className="card-body p-3">
                  <div className='mb-md-5 mt-md-4 pb-3'>
                    <h2 className='text-center text-uppercase mb-3'>Forgot Password</h2>
                    <p className="mb-3 text-center">Please enter your email!</p>
                      {warningMsg}
                    <Formik
                        initialValues={initialValues}
                        validationSchema ={validationSchema}
                        onSubmit = {handleEmail}>

                        {formik => {
                        return(
                        <Form className="row g-3">
                            <div className=" my-2 ">
                                <label htmlFor="email" className="">Email</label>
                                <Field type="text"  className="form-control rounded-pill " id="email" name="email" placeholder='example@mail'/>
                                <ErrorMessage name='email' component={'div'} className="text-danger" />
                            </div>
                            <div className="text-center d-grid gap-2">
                                <button type="submit" className="btn btn-outline-light btn-dark btn-lg px-5 rounded-pill"  disabled={!formik.isValid || formik.isSubmitting}>Forgot Password</button>
                            </div>
                        </Form>
                        )}}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default ForgotPassword
