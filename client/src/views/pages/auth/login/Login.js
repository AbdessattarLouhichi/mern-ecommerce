import React,{useState}  from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import { Formik, Form, ErrorMessage,Field } from 'formik'
import * as Yup from 'yup';
import { login } from 'src/store/api/authApi'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'


function Login() {
  //const dispatch = useDispatch
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [warning, setWarning] = useState(false)

  const initialValues = {
    email: '',
    password: ''
  }
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  })
  
  const loginUser = async (values) => {
    await dispatch(login(values))
    .then((response) =>{ 
      warning && setWarning(false)
      //SUCCESS LOGIN MESSAGE!  You are successfully logged in
      toast.success(response.payload.message, {
        position: "top-center",
      })
      setTimeout(()=>{
        navigate('/')
      },3000)
    })
    .catch(()=>{
      setWarning(true)
    }) 
  }
 
  const warningMsg = warning && <div className='alert alert-danger mt-5'>Please check your email and password and try again !</div>


  return (
    <div className=" d-flex flex-row justify-content-center align-items-center">
      <ToastContainer />
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 my-3">
              <div  className="card bg-white" style={{borderRadius: "1rem"}}>
                <div className="card-body p-3">
                  <div className='mb-md-5 mt-md-4 pb-3'>
                    <h2 className='text-center text-uppercase mb-3'>Login</h2>
                    <p className="mb-3 text-center">Please enter your login and password!</p>
                     {warningMsg}
                    <Formik
                        initialValues={initialValues}
                        validationSchema ={validationSchema}
                        onSubmit = {loginUser}>

                        {formik => {
                        return(
                        <Form className="row g-3">
                            <div className=" my-2 ">
                                <label htmlFor="email" className="">Email</label>
                                <Field type="text"  className="form-control rounded-pill " id="email" name="email" placeholder='example@mail'/>
                                <ErrorMessage name='email' component={'div'} className="text-danger" />
                            </div>
                            <div className=" my-2 ">
                                <label htmlFor="password" className="">Password</label>
                                <Field type="password"  className="form-control rounded-pill " id="password" name="password" placeholder='Your Password'/>
                                <ErrorMessage name='password' component={'div'} className="text-danger" />
                            </div>
                            <div className="text-center d-grid gap-2">
                                <button type="submit" className="btn btn-outline-light btn-dark btn-lg px-5 rounded-pill"  disabled={!formik.isValid || formik.isSubmitting}>
                                  Sign In
                                </button>
                            </div>
                            <div className="text-center">
                          <Link className='text-center mt-2 mb-0' to="/forgotPassword">Forgot Password</Link>
                        </div>
                        <div className="d-flex justify-content-center text-center mt-4 pt-1">
                          <Link to="#!" className="text-warning"><FontAwesomeIcon icon={faFacebook} className="mx-2 btn btn-lg" /></Link>
                          <Link to="#!" className="text-warning"><FontAwesomeIcon icon={faTwitter} className="mx-2 btn btn-lg" /></Link>
                          <Link to="#!" className="text-warning"><FontAwesomeIcon icon={faGoogle} className="mx-2 btn btn-lg" /></Link>
                        </div>
                        <div className="text-center">
                          <p className="text-center mt-2 mb-0">Not a member? <Link className='fw-bold' to="/register">Sign Up</Link></p>
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

export default Login