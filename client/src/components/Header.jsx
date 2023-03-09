import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart } from 'src/store/api/cartApi';
import Search from 'src/components/Search'
import logo from '../assets/images/logo-ecommerce-shop-store.png'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FILTER_BY_SEARCH } from 'src/store/features/filterSlice';
import { getAllProducts } from 'src/store/api/productApi';


function Header() {
  // useState hook 
  const [search, setSearch] = useState("");

  //get user id from localStorage
  const id = localStorage.getItem('id')
  const dispatch = useDispatch()

 // dispatch get All products
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
// product state
  const products = useSelector((state)=> state.product.products)

  // dispatch filter by search
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);



    // Default value of empty cart
    const emptyCart = { items : []}
    useEffect(()=>{
        // declare the data fetching function
    const fetchData = async () => {
        await dispatch(getCart(id)) ;
    }

    // call the function
    fetchData()
        // make sure to catch any error
        .catch((error)=> console.log(error) );
    },[dispatch, id])

    let totalItems = 0;
    const cart= useSelector((state)=> state.cart.carts || emptyCart)
     cart.items?.map((item)=>{
      const {quantity } = item;
      return totalItems += quantity
     })
    
  return (
    <Navbar bg="light" expand="lg" fixed="top" className='pb-0 mb-5 align-items-center' >
      <Container fluid>
        <Navbar.Brand className='me-5 ms-3'>
          <Link to="/">
            <img src={logo} height="70" width="70" alt='logo' />
          </Link>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className=' justify-content-between mx-3'>
          <Search value={Search} className="me-2 rounded-pill" onChange={(e) => setSearch(e.target.value)} />
          <Nav
            className="mx-3 my-2 my-lg-0 align-items-center"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
      
            <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="navbarScrollingDropdown">
            <NavDropdown.Item href="/login" >Login</NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/user/profile" style={{textDecoration: "none"}}> Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/orders" style={{textDecoration: "none"}}>Orders</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/logout" style={{textDecoration: "none"}}>Logout</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
                <Link 
                  to='/cart'
                  className='btn btn-outline-primary d-flex rounded-circle'
                  style={{ width: "3rem", height: "3rem", position: "relative" }}
                >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      fill="grey"
                    >
                      <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                    </svg>
                  
                  <div className='rounded-circle bg-danger text-white d-flex justify-content-center align-items-center px-1'
                   style={{
                    color: "white",
                    width: "1 rem",
                    height: "1 rem",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    transform: "translate(25%, 25%)",
                  }}
                  >
                    {totalItems}
                  </div>
                </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  )
}

export default Header
