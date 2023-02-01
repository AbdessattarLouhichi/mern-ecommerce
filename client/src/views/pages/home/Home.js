import React, { useEffect } from 'react'
import { Container, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from 'src/store/api/productApi'
import Brands from 'src/components/Brands'
import  ProductCard from "../../../components/ProductCard"
import  Slider from "../../../components/Slider"

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  const products = useSelector((state)=> state.product.products)
  return (
    <>
      <div className='container-fluid'>
        <Slider />
      </div>
      <Container>
        <h1>Products</h1>
        <Row md={2} xs={1} lg={4} className="g-3">
          {products.map(item => (
            <Col key={item._id}>
              <ProductCard {...item} />
            </Col>
          ))}
        </Row>
      </Container>
      <Brands/>
    </>  
  )
}
export default Home
