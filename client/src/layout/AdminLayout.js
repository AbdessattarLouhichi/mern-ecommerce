import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { getUser } from 'src/store/api/userApi'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const AdminLayout = () => {
  const id = localStorage.getItem('id')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser(id))  
}, [dispatch, id])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <Outlet />
    </div>
  )
}

export default AdminLayout
