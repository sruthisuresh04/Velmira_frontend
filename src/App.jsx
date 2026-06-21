import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import UserLogin from "./pages/UserLogin";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Footer from "./components/Footer";
// import Wishlist from "./pages/Wishlist";

function App() {
  const [token, setToken] = useState(localStorage.getItem("userToken") || "");
  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        {/* <Route path="/wishlist" element={<Wishlist/>} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
