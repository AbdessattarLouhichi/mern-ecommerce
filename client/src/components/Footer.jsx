import React from 'react'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle, faInstagram, faLinkedin, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
        <Container fluid className='bg-light' >
            <div className="d-flex justify-content-center text-center mb-5 pt-4">
                <Link to="#!" className="text-warning"><FontAwesomeIcon icon={faFacebook} className="mx-2 btn btn-lg" /></Link>
                <Link to="#!" className="text-warning"><FontAwesomeIcon icon={faTwitter} className="mx-2 btn btn-lg" /></Link>
                <Link to="#!" className="text-warning"><FontAwesomeIcon icon={faGoogle} className="mx-2 btn btn-lg" /></Link>
                <Link to="#!" className="text-warning"><FontAwesomeIcon icon={faPinterest} className="mx-2 btn btn-lg" /></Link>
                <Link to="#!" className="text-warning"><FontAwesomeIcon icon={faInstagram} className="mx-2 btn btn-lg" /></Link>
                <Link to="#!" className="text-warning"><FontAwesomeIcon icon={faLinkedin} className="mx-2 btn btn-lg" /></Link>
            </div>
            <div className="d-flex justify-content-between mb-4 ">
                <div className="col-md-1"></div>
                <div><b>About</b>
                    <div>Laptops & Computers</div>
                    <div>Cameras & Photography</div>
                    <div>Smart Phones & Tablets</div>
                    <div>Video Games & Consoles</div>
                </div>
                <div><b>Find It Fast</b>
                    <div>Laptops & Computers</div>
                    <div>Cameras & Photography</div>
                    <div>Smart Phones & Tablets</div>
                    <div>Video Games & Consoles</div>
                </div>
                <div><b>Pages</b>
                    <div>About</div>
                    <div>Contact</div>
                    <div>Wishlist</div>
                    <div>Compare</div>
                </div>
                <div><b>Customer Care</b>
                    <div>My Account</div>
                    <div>Track your Order</div>
                    <div>Customer Service</div>
                    <div>Returns/Exchange</div>
                </div>
                <div className="col-md-1"></div>
            </div>
            <div className="d-flex justify-content-center mt-3">
            <p>©Copyright 2023 - All Rights Reserved </p>
            </div>

        </Container>
    </>
  )
}

export default Footer