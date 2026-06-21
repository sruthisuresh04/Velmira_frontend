import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-yellow-500/10 py-14 bg-[#0f0f0f]">
      <div className="text-center">

        <h2
          className="text-3xl text-yellow-500 mb-3"
          style={{ fontFamily: "Cinzel" }}
        >
          VELMIRA
        </h2>

        <p className="text-gray-400">
          Rent Luxury, Shine Beautifully
        </p>

        <p className="text-gray-500 mt-4">
          © 2026 Velmira. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;