import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* Always visible */}
      <Navbar />

      {/* Page content changes here */}
      <Outlet />

      {/* Always visible */}
      <Footer />
    </div>
  );
};

export default Layout;