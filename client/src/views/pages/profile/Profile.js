import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import { getUser } from 'src/store/api/userApi'

function Profile() {
    const dispatch = useDispatch()
    const id = localStorage.getItem('id')
    useEffect(() => {
        dispatch(getUser(id))  
    }, [dispatch, id])
    
    const user =  useSelector((state)=> state.user.users)
  return (
    <div className="container">
    <h2 className="mt-5 ml-5">My Profile</h2>
    <div className="row justify-content-around mt-5">
        <div className="col-12 col-md-3">
            <figure className=''>
                <img className="rounded-circle img-fluid" src={avatar3} alt='' />
            </figure>
            <Link to={`/users/updateProfile/${id}`} id="edit_profile" className="btn btn-primary btn-block my-5">
                Edit Profile
            </Link>
        </div>
 
        <div className="col-12 col-md-5">
            <div className="">
                <h4>Full Name</h4>
                <p>{user.firstName+' '+user.lastName}</p>
    
                <h4>Email Address</h4>
                <p>{user.email}</p>

                <h4>Phone Number</h4>
                <p>{user.phoneNumber}</p>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substring(0,10)}</p>
            </div>
             
            { (user.role !== 'admin' && user.role !== 'superAdmin') &&(
                <div className="text-center d-grid gap-2">
                    <Link to="/orders/myOrders" className="btn btn-danger btn-lg mt-5">
                        My Orders
                    </Link>
                </div>
            )}
            <div className="text-center d-grid gap-2">
                <Link to="/forgotPassword" className="btn btn-primary btn-lg mt-3">
                    Change Password
                </Link>
            </div>
           
        </div>
    </div>
</div>

  )
}

export default Profile