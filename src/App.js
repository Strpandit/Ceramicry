import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoToTopButton from "./components/GoToTopButton";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import Cart from "./components/Cart";
import OrderDetails from "./pages/OrderDetails";
import OrderTrack from "./pages/OrderTrack";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage/>} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-profile" element={<UserProfilePage/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders/:slug" element={<OrderDetails />} />
        <Route path="/orders/:slug/track" element={<OrderTrack />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <GoToTopButton />
      <Footer />
    </>
  );
}

export default App;
