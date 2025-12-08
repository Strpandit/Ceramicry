import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import AgentLogin from './pages/AgentLogin';
import AgentOrders from './pages/AgentOrders';
import AgentOrderDetails from './pages/AgentOrderDetails';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const location = useLocation();
  const isAgentRoute = location.pathname.startsWith('/agent');
  return (
    <>
      {!isAgentRoute && <Header />}
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
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent/orders" element={<AgentOrders />} />
        <Route path="/agent/orders/:id" element={<AgentOrderDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      {!isAgentRoute && <GoToTopButton />}
      {!isAgentRoute && <Footer />}
    </>
  );
}

export default App;
