import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Elegant Ceramic Dinnerware",
      subtitle: "NEW COLLECTION",
      description:
        "Transform your dining experience with our handcrafted ceramic collection. Each piece tells a story of artisanal excellence and timeless design.",
      image: "/img.png",
    },
    {
      id: 2,
      title: "Stylish Ceramic Drinkware",
      subtitle: "FEATURED COLLECTION",
      description:
        "Sip in style with our unique ceramic drinkware collection. Perfect blend of durability, design, and everyday elegance.",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Premium Ceramic Serveware",
      subtitle: "BEST SELLERS",
      description:
        "Serve with elegance using our premium serveware. Designed for modern dining and unforgettable gatherings.",
      image: "/img.png",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    afterChange: (index) => setCurrentSlide(index),
  };

  const goToSlide = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="w-full bg-gray-50 py-10 overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <div className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 max-w-7xl mx-auto">
              {/* Left Side Content */}
              <div className="w-full lg:w-1/2 text-left order-2 lg:order-1 mt-6 lg:mt-0">
                <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">
                  {slide.subtitle}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-gray-900 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-gray-600 mt-6 text-lg leading-relaxed">
                  {slide.description}
                </p>
                <div className="mt-8">
                  <button onClick={() => navigate("/product")} className="px-8 py-3 bg-black text-white rounded-md shadow-lg hover:bg-gray-800 transition-colors duration-300 font-semibold">
                    Shop Now
                  </button>
                </div>
                <div className="mt-12 flex space-x-12 text-left">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-gray-500 text-sm mt-1">Products</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">50K+</p>
                    <p className="text-gray-500 text-sm mt-1">Happy Customers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">5+</p>
                    <p className="text-gray-500 text-sm mt-1">Years Experience</p>
                  </div>
                </div>
              </div>

              {/* Right Side Image */}
              <div className="relative w-full lg:w-1/2 flex justify-center order-1 lg:order-2 lg:pl-12">
                <div className="relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="rounded-2xl shadow-2xl object-cover w-full max-w-lg h-[300px] md:h-[500px] lg:h-[600px]"
                  />
                  <div className="absolute -top-4 -left-4 bg-white text-black font-bold rounded-full w-20 h-20 flex items-center justify-center shadow-xl border-4 border-gray-100">
                    <span className="text-sm font-bold text-center">
                      20% <br /> OFF
                    </span>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-black text-white rounded-full w-24 h-24 flex items-center justify-center shadow-xl">
                    <span className="text-xs text-center font-semibold">
                      FREE <br /> SHIPPING
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-black w-8" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
