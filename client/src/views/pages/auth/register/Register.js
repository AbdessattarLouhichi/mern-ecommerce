import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { register } from 'src/store/api/authApi'
import { useDispatch } from 'react-redux'
//import { toast } from 'react-toastify'


const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleFileUpload = async (e,setFieldValue)=>{
    const file = e.target.files[0];
    setFieldValue('photo', file) 
  }

  const handleUser =  (values)=>{
    dispatch(register(values))
    navigate('/login')
  }

   const initialValues ={
    firstName: '',
    lastName:'',
    email:'',
    password:'',
    confPassword:''
   }

   const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),  
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confPassword: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col-12 col-md-8 my-3">
              <div  className="card bg-white" style={{borderRadius: "1rem"}}>
                <div className="card-body p-3">
                  <div className='mb-md-5 mt-md-4 pb-3'>
                    <h2 className='text-center text-uppercase mb-3'>Create an account</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema ={validationSchema}
                        onSubmit = {handleUser}>

                        {formik => {
                        return(
                        <Form className="row g-3" encType="multipart/form-data">
                            <div className="col-md-6">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <Field type="text" className="form-control rounded-pill " id="firstName" name="firstName"/>
                                <ErrorMessage name='firstName' component={'div'} className="text-danger"/>
                            </div>
                            <div className="col-md-6 ">
                                <label htmlFor="validationServer02" className="form-label">Last Name</label>
                                <Field type="text" className="form-control rounded-pill " id="lastName" name="lastName"/>
                                <ErrorMessage name='lastName' component={'div'} className="text-danger"/>
                            </div>
                            <div className=" my-2 ">
                                <label htmlFor="email" className="">Email</label>
                                <Field type="text"  className="form-control rounded-pill " id="email" name="email" placeholder='example@mail'/>
                                <ErrorMessage name='email' component={'div'} className="text-danger" />
                            </div>
                            <div className=" my-2">
                                <label htmlFor="password" className="">Password</label>
                                <Field type="password" className="form-control rounded-pill" id="password" name="password" placeholder="Password"/>
                                <ErrorMessage name='password' component={'div'} className="text-danger" />
                            </div>
                            <div className=" my-2">
                                <label htmlFor="confPassword" className="">Confirm Password</label>
                                <Field type="password" className="form-control rounded-pill " id="confPassword" name="confPassword"/>
                                <ErrorMessage name='confPassword' component={'div'} className="text-danger" />
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
                                <button type="submit" className="btn btn-outline-light btn-dark btn-lg px-5 rounded-pill"  disabled={!formik.isValid || formik.isSubmitting}>Sign Up</button>
                            </div>
                            <p className="text-center mt-3 mb-0">Have already an account? <Link to="/login"
                                    className="fw-bold"><u>Login here</u></Link></p>
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

export default Register
