import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import LuxuryProductCard from "./LuxuryProductCard";


const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
       const res = await axios.get(`${backendUrl}/api/product/list`);

        // Example: take first 4 or filter bestseller
       const trending = res.data.products.slice(0, 4);
       setProducts(trending);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <h2 className="text-4xl text-center mb-14" style={{ fontFamily: "Cinzel" }}>
        Trending Products
      </h2>

      <div className="grid md:grid-cols-4 gap-8">

        {products.map((item) => (
            
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="bg-[#1d1d1d] rounded-2xl overflow-hidden group"
          >

            <div className="overflow-hidden">
             <img
             src={`${backendUrl}${item.image}`}
             alt={item.name}
             />
            </div>

            <div className="p-4">

              <h3 className="text-white font-semibold">
                {item.name}
              </h3>

                  <h4 className="text-white font-semibold">
                {item.description}
              </h4>


              <p className="text-yellow-500 mt-2">
                ₹ {item.rentPrice}
              </p>

            </div>

          </Link>
        ))}

      </div>

    </section>
  );
};

export default TrendingProducts;