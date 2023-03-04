import React, { useEffect } from 'react'
import { logout } from 'src/store/api/authApi'
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
    .then((response) =>{
      console.log(response)
      localStorage.clear()
      //SUCCESS LOGIN MESSAGE!  You are successfully logout
      toast.success(response.payload.message, {
        position: "top-center",
      })
      setTimeout(()=>{
        navigate('/')
      },3000)
    })
    .catch((error)=>{
      toast.error(error.response.data.message)
    })
    
    
  }, [dispatch, navigate])
  

  return (
    <div>
        <ToastContainer />
    </div>
  )
}

export default Logout