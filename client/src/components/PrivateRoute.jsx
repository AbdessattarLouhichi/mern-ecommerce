import React from 'react'
import { Navigate } from 'react-router-dom'
//import axios from 'axios'

function PrivateRoute({children}) {
    const token = localStorage.getItem('token')
   /* const [isValid, setIsValid] = useState(false)
    const validity = async()=>{
        await axios.get('/tokenValidity')
        setIsValid(true)
        console.log(isValid)
    }
    validity()*/
    if(!token){
        return <Navigate to="/login" />
    }
  return  children
}

export default PrivateRoute