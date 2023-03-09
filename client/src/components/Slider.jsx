import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ImgCarousel from 'src/assets/carousel/ImgCarousel';

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className='container-fluid my-5 pt-5'>
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                className="d-block w-100 h-50"
                src={ImgCarousel.img1}
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100  h-50"
                src={ImgCarousel.img2}
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100  h-50"
                src={ImgCarousel.img3}
                alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    </div>
   
  );
}

export default Slider