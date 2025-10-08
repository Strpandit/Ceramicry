import React from "react";
import Hero from "../components/Hero";
import CategoryList from "../components/CategoryList";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CategoryList />
      <FeaturedProducts />
      <WhyChooseUs />
      <Newsletter />
    </div>
  );
};

export default HomePage;