import React, { useEffect } from 'react'
import { accountActivation } from 'src/store/api/authApi'
import { useNavigate, useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

function AccountActivation() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { code } = useParams()
    
    useEffect(() => {
      if (code) {
        dispatch(accountActivation(code))
      }
      navigate('/login')
    }, [code,dispatch])
    
  return (
    <div>
        {
            toast.success("activation success!" , {
                position: "top-right",
              })
        }
    </div>
  )
}

export default AccountActivation