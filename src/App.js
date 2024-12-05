import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import { Toaster } from "react-hot-toast";
import Footer from "../src/Components/Footer/Footer";
import Header from "../src/Components/Header/Navbar";
import About from "../src/Pages/About";
import Blog from "../src/Pages/Blog";
import Contact from "../src/Pages/Contact";
import Home from "../src/Pages/Home";
import Shop from "../src/Pages/Shop";
import ResetPass from "./Components/Authentication/Reset/ResetPass";
import VerifyPage from "./Components/Authentication/Verify/VerifyPage";
import BlogDetails from "./Components/Blog/BlogDetails/BlogDetails";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Authentication from "./Pages/Authentication";
import NotFound from "./Pages/NotFound";
import ProductDetails from "./Pages/ProductDetails";
import TermsConditions from "./Pages/TermsConditions";
import UserProfile from "./Components/Authentication/UserProfile/UserProfile";
import ChangePass from "./Components/Authentication/ChangePass/ChangePass";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/verify-email/:token" element={<VerifyPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/loginSignUp" element={<Authentication />} />
          <Route path="/resetPassword" element={<ResetPass />} />
          <Route path="/changePassword" element={<ChangePass />} />
          <Route path="/BlogDetails" element={<BlogDetails />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
