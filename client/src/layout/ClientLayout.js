import React from 'react'
import { AppContent} from '../components/index'
import Header from 'src/components/Header.jsx'
import Footer from 'src/components/Footer'
const ClientLayout = () => {
  return (
    <>
      <div className="wrapper d-flex flex-column min-vh-100">
        <Header />
        <div className="body flex-grow-1 px-3 mt-5 pt-5">
          <AppContent />
        </div>
        
      </div>
      <Footer />
    </>
  )
}

export default ClientLayout
