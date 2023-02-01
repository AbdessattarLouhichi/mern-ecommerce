import React, { useEffect } from 'react'
//import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getUser } from 'src/store/api/userApi'

function OnlyAdminRoute({children, Roles}) {
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
   /* const [isValid, setIsValid] = useState(false)
    const validity = async()=>{
        await axios.get('/tokenValidity')
        setIsValid(true)
        console.log(isValid)
    }
    validity()*/

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUser(id))  
    }, [dispatch, id])
    const user =  useSelector((state)=> state.user.users)
    console.log(user.role)
   const verifyRole = Roles.includes(user.role)
    if(!token || !verifyRole){
        return <Navigate to="/login" />
    }
  return  children
}

export default OnlyAdminRoute