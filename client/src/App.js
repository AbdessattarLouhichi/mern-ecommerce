import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import ClientLayout from './layout/ClientLayout'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const AdminLayout = React.lazy(() => import('./layout/AdminLayout'))

// Pages
const Home = React.lazy(() => import('./views/pages/home/Home'))
const Login = React.lazy(() => import('./views/pages/auth/login/Login'))
const Register = React.lazy(() => import('./views/pages/auth/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/otherPages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/otherPages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/admin/*" element={<AdminLayout />}></Route>
            <Route element={<ClientLayout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route exact path="/home" name="Home Page" element={<Home />} />
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="*" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
