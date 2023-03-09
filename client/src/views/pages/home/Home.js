import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from 'src/store/api/productApi'
import Brands from 'src/components/Brands'
import  ProductCard from "../../../components/product/ProductCard"
import ProductFilter from 'src/components/product/ProductFilter'
import  Slider from "../../../components/Slider"
import { getCart } from 'src/store/api/cartApi'
//import { Link } from 'react-router-dom'
import Loading from 'src/components/Loading'
import { selectFilteredProducts, SORT_PRODUCTS } from 'src/store/features/filterSlice'
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import ReactPaginate from 'react-paginate';


function Home() {
  const dispatch = useDispatch()
  const id = localStorage.getItem('id')
  // useState hook
  const [sort, setSort] = useState("latest");
  const [grid, setGrid] = useState(true);

  const [itemsPerPage] = useState(9)

  // dispatch get All products
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  // dispatch get cart by user id
  useEffect(()=>{
    dispatch(getCart(id))
  },[dispatch, id])

  // product state
  const products = useSelector((state)=> state.product.products)

  // filter Products By Brands/Categories/Price
  let filteredProducts = useSelector(selectFilteredProducts);
  if (filteredProducts.length === 0) {
    filteredProducts = products
  }
  

  //dispatch Sort Products
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  //pagination
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(filteredProducts.slice(itemOffset, endOffset)) ;
    setPageCount( Math.ceil(filteredProducts.length / itemsPerPage));
   
  }, [itemOffset,itemsPerPage, filteredProducts])
  

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className='container-fluid'>
        <Slider />
      </div>
      <Container>
        <h1>Products</h1>
        <Row className='py-5'>
          <aside className='col-3  py-2 border border-light' >
            <ProductFilter />
          </aside>
          <div className='col-9'>
            {/* Grid Style/ List Style/ Search Product /Sort Product */}
            <div className='d-flex justify-content-between border border-light pt-2 px-1 mb-2'>
              <div className='d-flex justify-content-between align-items-top'>
                <BsFillGridFill
                  size={22}
                  color="orangered"
                  onClick={() => setGrid(true)}
                />

                <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} className="mx-2" />
              </div>
              <p>
                <b>{filteredProducts.length}</b> Products found.
              </p>
              {/* Sort Products */}
              <div>
                <label style={{fontWeight: "bold"}}>Sort by:</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)} style={{border: "none"}}>
                  <option value="latest">Latest</option>
                  <option value="lowest-price">Lowest Price</option>
                  <option value="highest-price">Highest Price</option>
                  <option value="a-z">A - Z</option>
                  <option value="z-a">Z - A</option>
                </select>
              </div>
            </div>

            {/* Products view */}
            <Row md={2} xs={1} lg={3} className="g-3">
            {(products === undefined) ? Loading : (currentItems?.map(item => (
                <Col key={item._id}>
                  <ProductCard {...item} />
                </Col>
              )))}
            </Row>
            <Row className='border border-light pt-2  mt-2 mx-1'>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='activePage'
              />
            </Row>
            
          </div>
          
        </Row>
      </Container>
      <Brands/>
    </>  
  )
}
export default Home
