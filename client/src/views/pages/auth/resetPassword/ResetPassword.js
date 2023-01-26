import React from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { resetPassword } from 'src/store/api/authApi'
import { useDispatch } from 'react-redux'
//import { toast } from 'react-toastify'


const ResetPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {token} = useParams()
  
   const initialValues ={
    password:'',
    confPassword: ''
   }

   const validationSchema = Yup.object({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })
  const handlePassword =  (values)=>{
    dispatch(resetPassword ({token : token, values : values}))
    navigate('/login')
  }


  return (
    <div className="bg-light  d-flex flex-row justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 my-3">
              <div  className="card bg-white" style={{borderRadius: "1rem"}}>
                <div className="card-body p-3">
                  <div className='mb-md-5 mt-md-4 pb-3'>
                    <h2 className='text-center text-uppercase mb-3'>Reset Password</h2>
                    <p className="mb-3 text-center">Please enter new password</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema ={validationSchema}
                        onSubmit = {handlePassword}>
                        {formik => {
                        return(
                        <Form className="row g-3">
                            <div className=" my-2 ">
                                <label htmlFor="password" className="">New Password</label>
                                <Field type="password"  className="form-control rounded-pill " id="password" name="password" placeholder='example@mail'/>
                                <ErrorMessage name='password' component={'div'} className="text-danger" />
                            </div>
                            <div className=" my-2 ">
                                <label htmlFor="confPassword" className="">Confirm Password</label>
                                <Field type="password"  className="form-control rounded-pill " id="confPassword" name="confPassword" placeholder='example@mail'/>
                                <ErrorMessage name='confPassword' component={'div'} className="text-danger" />
                            </div>
                            <div className="text-center d-grid gap-2">
                                <button type="submit" className="btn btn-outline-light btn-dark btn-lg px-5 rounded-pill"  disabled={!formik.isValid || formik.isSubmitting}>Reset Password</button>
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

export default ResetPassword
