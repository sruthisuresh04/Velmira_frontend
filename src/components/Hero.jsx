import React from "react";
import { Link } from "react-router-dom";
import test0 from "../assets/test0.png";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      
      <img
        src={test0}
        className="absolute inset-0 w-full h-full object-cover"
        alt=""
      />

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 text-center px-6">

        <h2 className="text-yellow-500 tracking-[8px] mb-4" style={{ fontFamily: "Cinzel" }}>
          VELMIRA
        </h2>

        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "Cinzel" }}>
          Luxury Jewellery <br /> Rental Collection
        </h1>

        <p className="max-w-2xl mx-auto text-gray-300 text-lg mb-8">
          Discover premium bridal and party jewellery crafted for your special moments.
        </p>

        <Link
          to="/products"
          className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold"
        >
          Explore Collection
        </Link>

      </div>
    </section>
  );
};

export default Hero;
