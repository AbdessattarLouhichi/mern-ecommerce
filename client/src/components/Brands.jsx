import { Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import LogoBrands from 'src/assets/brand/LogoBrands'

const Brands = () => {

  return (
    <section className='bg-light py-5'>
      <Container fluid className=' my-4'>
        <Row className=' text-center py-3'>
          <Col lg={6} className='m-auto'>
            <h1 className='h1 fw-bold fst-italic'>Our Brands</h1>
          </Col>
          <Col lg={9} className='m-auto tempaltemo-carousel'>
            <Row className='d-flex flex-row'>
              {/*Controls*/}
              <Col className='col-1 align-self-center'>
                <a
                  className='h1'
                  href='#templatemo-slide-brand'
                  role='button'
                  data-bs-slide='prev'
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </a>
              </Col>
              {/*End Controls*/}
              {/*Carousel Wrapper*/}
              <div className='col'>
                <div
                  className='carousel slide carousel-multi-item pt-2 pt-md-0'
                  id='templatemo-slide-brand'
                  data-bs-ride='carousel'
                >
                  {/*Slides*/}
                  <div
                    className='carousel-inner product-links-wap'
                    role='listbox'
                  >
                    {/*First slide*/}
                    <div className='carousel-item active'>
                      <div className='row'>
                        <div className='col-3 p-md-5'>
                            <img
                                className='img-fluid brand-img'
                                src={LogoBrands.brand1}
                                alt='Brand Logo'
                            />
                        </div>
                        <div className='col-3 p-md-5'>
                        <img
                              className='img-fluid brand-img'
                              src={LogoBrands.brand2}
                              alt='Brand Logo'
                            />
                        </div>
                        <div className='col-3 p-md-5'>
                            <img
                                className='img-fluid brand-img'
                                src={LogoBrands.brand3}
                                alt='Brand Logo'
                            />
                        </div>
                        <div className='col-3 p-md-5'>
                            <img
                                className='img-fluid brand-img'
                                src={LogoBrands.brand4}
                                alt='Brand Logo'
                            />
                        </div>
                      </div>
                    </div>
                    {/*End First slide*/}
                    {/*Second slide*/}
                    <div className='carousel-item'>
                      <div className='row'>
                        <div className='col-3 p-md-5'>
                            <img
                                className='img-fluid brand-img'
                                src={LogoBrands.brand5}
                                alt='Brand Logo'
                            />
                        </div>
                        <div className='col-3 p-md-5'>
                            <img
                                className='img-fluid brand-img'
                                src={LogoBrands.brand6}
                                alt='Brand Logo'
                            />
                        </div>
                        <div className='col-3 p-md-5'>
                            <img
                                className='img-fluid brand-img'
                                src={LogoBrands.brand7}
                                alt='Brand Logo'
                            />
                        </div>
                        <div className='col-3 p-md-5'>
                            <img
                                className='img-fluid brand-img'
                                src={LogoBrands.brand8}
                                alt='Brand Logo'
                            />
                        </div>
                      </div>
                    </div>
                    {/*End Second slide*/}
                  </div>
                  {/*End Slides*/}
                </div>
              </div>
              {/*End Carousel Wrapper*/}
              {/*Controls*/}
              <Col className='col-1 align-self-center'>
                <a
                  className='h1'
                  href='#templatemo-slide-brand'
                  role='button'
                  data-bs-slide='next'
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </a>
              </Col>
              {/*End Controls*/}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Brands;