import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const categoryOptions = ["All", "Necklace", "Earrings", "Bangles", "Rings"];

const Products = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryCategory =
    new URLSearchParams(location.search).get("category") || "";
  const searchQuery = new URLSearchParams(location.search).get("search") || "";
  const activeCategory = queryCategory || "All";

  const fetchProducts = async () => {
    const res = await axios.get(`${backendUrl}/api/product/list`);

    if (res.data.success) {
      setProducts(res.data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      activeCategory === "All" ||
      item.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#090909] text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-3">
            Jewellery Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Premium Rental Jewellery
          </h1>
          <p className="max-w-3xl text-gray-400">
            Browse our curated collection and choose the perfect piece for
            weddings, parties, and special occasions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {categoryOptions.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                navigate(
                  `/products${category === "All" ? "" : `?category=${encodeURIComponent(category)}`}`,
                )
              }
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeCategory.toLowerCase() === category.toLowerCase()
                  ? "bg-yellow-500 text-black"
                  : "bg-white/10 text-gray-200 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {activeCategory !== "All" && (
          <div className="mb-6 text-gray-300">
            Showing <span className="text-yellow-400">{activeCategory}</span>{" "}
            products.
          </div>
        )}

        {searchQuery && (
          <div className="mb-6 text-gray-300">
            Search results for{" "}
            <span className="text-yellow-400">"{searchQuery}"</span>.
            {filteredProducts.length === 0 && (
              <span className="ml-2">No products found.</span>
            )}
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-3xl border border-yellow-500/10 bg-[#111111] shadow-xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-yellow-500/20 cursor-pointer"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `${backendUrl}${item.image}`
                    }
                    alt={item.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gray-200">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-400 mb-5">{item.description}</p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-yellow-400 text-lg font-bold">
                      ₹ {item.rentPrice}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${item.available ? "bg-emerald-500/10 text-emerald-300" : "bg-red-500/10 text-red-300"}`}
                    >
                      {item.available ? "Available" : "Booked"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-yellow-500/20 bg-[#111111] p-10 text-center text-gray-300">
            No products found for{" "}
            <span className="text-yellow-400">{activeCategory}</span>.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
