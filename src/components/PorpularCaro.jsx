import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import PopularCard from './PopularCard';

// Custom Next Arrow Component
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'flex', color: 'gray', justifyContent: 'center', alignItems:'center', background: '#F4F4F4', borderRadius: '50%', padding: "20px "}}
      onClick={onClick}
    />
  );
};

// Custom Previous Arrow Component
const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'flex', justifyContent: 'center', alignItems:'center', background: '#F4F4F4', borderRadius: '50%', padding: "20px "}}
      onClick={onClick}
    />
  );
};

const PropertyCarousel = ({ properties }) => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Enable infinite loop
    speed: 500, // Animation speed in milliseconds
    slidesToShow: 4, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable auto play
    autoplaySpeed: 3000, // Auto play speed in milliseconds
    arrows: false, // Show left and right navigation arrows
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
    pauseOnHover: false, // Pause auto play on hover
    draggable: true, // Enable dragging to change slides
    adaptiveHeight: true, // Adjust slide height based on content
    centerMode: false, // Enable center mode (shows partial slides on sides)
    centerPadding: '50px', // Padding for center mode
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-8 px-4 md:px-10 xl:px-20 ">
      <h2 className=" text-2xl md:text-5xl font-semibold text-center  mb-12">Discover Our Popular Properties</h2>
      <Slider {...settings} className="gap-8">
        {properties.map((property) => (
          <div key={property.id} className="px-2"> {/* Add padding to the individual slides */}
            <PopularCard property={property} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PropertyCarousel;
