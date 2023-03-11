import { Carousel, Stack } from "react-bootstrap";
import LogoBrands from 'src/assets/brand/LogoBrands'

export default function Brands() {
  
  const reviews = [
    { _id: 1},
    { _id: 2},
    { _id: 3},
    { _id: 4},
  ];

  return (
    <div>  
      <div className="container-fluid my-5 py-5 text-center">
      <h1 className='h1 fw-bold fst-italic'>Our Brands</h1>
        <Carousel className="pb-2">
          {reviews.map((review) => (
            <Carousel.Item key={review._id}>
              <Stack
                direction="horizontal"
                className="h-100 justify-content-center align-items-center"
                gap={3}
              >
                <div className="mx-2">
                    <img
                        className="d-block w-100 img-fluid"
                        src={LogoBrands.brand1}
                        alt='Brand Logo'
                    />
                </div>
                <div className="mx-2">
                    <img
                        className="d-block w-100 img-fluid"
                        src={LogoBrands.brand2}
                        alt='Brand Logo'
                    />
                </div>
                <div className="mx-2">
                    <img
                        className="d-block w-100 img-fluid"
                        src={LogoBrands.brand3}
                        alt='Brand Logo'
                    />
                </div>
                <div className="mx-2">
                    <img
                        className="d-block w-100 img-fluid"
                        src={LogoBrands.brand4}
                        alt='Brand Logo'
                    />
                </div>
                <div className="mx-2">
                    <img
                        className="d-block w-100 img-fluid"
                        src={LogoBrands.brand5}
                        alt='Brand Logo'
                    />
                </div>
                <div className="mx-2">
                    <img
                        className="d-block w-100 img-fluid"
                        src={LogoBrands.brand6}
                        alt='Brand Logo'
                    />
                </div>
                <div className="mx-2">
                    <img
                        className="d-block w-100 img-fluid"
                        src={LogoBrands.brand7}
                        alt='Brand Logo'
                    />
                </div>
                <div className="mx-2">
                    <img
                        className="d-block w-100 img-fluid"
                        src={LogoBrands.brand8}
                        alt='Brand Logo'
                    />
                </div>
              </Stack>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
