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
import ShippingPolicy from "./components/Policies/ShippingPolicy";
import PrivacyPolicy from "./components/Policies/PrivacyPolicy";
import FAQ from "./components/Policies/Faq";
import TermsConditions from "./components/Policies/TermsConditions";
import CookiesPolicy from './components/Policies/CookiesPolicy';

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
        <Route path="/shipping-return" element={<ShippingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
      </Routes>
      <GoToTopButton />
      <Footer />
    </>
  );
}

export default App;
