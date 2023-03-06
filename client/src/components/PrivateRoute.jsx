import React from 'react'
import { Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { toast} from 'react-toastify'
import jwt_decode from 'jwt-decode'

// Check for token expiration
const isExpiredToken = (token)=>{
    const decoded = jwt_decode(token)
    return Math.floor(new Date().getTime()/1000)>=decoded.exp
}
function PrivateRoute({children, Roles}) {
  const token = localStorage.getItem('token')
  const verifyRole = Roles.includes(jwt_decode(token).role)
  if (token !== null) {
    const expire = isExpiredToken(token)
    if (expire) {
        toast.error('Token Expired!')
        localStorage.removeItem('token')
        return < Navigate to='/login' />
    } else if(!verifyRole){
        toast.error('Not authorized!')
        return < Navigate to='/' />
    } else {
        return children
    }
  } else {
    localStorage.removeItem('token')
    return < Navigate to='/login' />
  }
}

export default PrivateRoute