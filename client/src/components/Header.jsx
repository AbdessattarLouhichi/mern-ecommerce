import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Form } from 'react-bootstrap';
import { useLocation} from 'react-router-dom';
import logo from '../assets/images/logo-ecommerce-shop-store.png'
function Header() {
    let  location = useLocation()
    console.log(location.pathname)

  return (
    <Navbar bg="light" expand="lg" fixed="top" className='pb-0 mb-5' >
      <Container fluid>
        <Navbar.Brand href="/" className='me-5 ms-3'>
          <img src={logo} height="70" width="70" alt='logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className=' justify-content-between mx-3'>
        <Form className="d-flex mx-5 col-10 col-lg-8 ">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 rounded-pill"
              aria-label="Search"
            />
            <Button variant="outline-success" className='rounded-pill'>Search</Button>
          </Form>
          <Nav
            className="mx-3 my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
      
            <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="navbarScrollingDropdown">
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/user/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Orders
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/cart">
            {<FontAwesomeIcon icon={faShoppingCart} />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  )
}

export default Header
