import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const [rentDate, setRentDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const bookNow = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login to continue with booking");
      navigate("/login");
      return;
    }

    if (!rentDate || !returnDate) {
      alert("Please select both rent and return dates");
      return;
    }

    if (new Date(rentDate) >= new Date(returnDate)) {
      alert("Return date must be after rent date");
      return;
    }

    // Calculate rental days
    const start = new Date(rentDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Calculate price with extended day surcharge
    let totalPrice = product.rentPrice * rentalDays;
    if (rentalDays > 4) {
      const standardDays = 4;
      const extraDays = rentalDays - 4;
      totalPrice =
        product.rentPrice * standardDays + product.rentPrice * 1.5 * extraDays;
    }

    const bookingData = {
      productId: product._id,
      productName: product.name,
      price: product.rentPrice,
      rentalDays: rentalDays,
      totalPrice: Math.ceil(totalPrice),
      rentDate,
      returnDate,
    };

    localStorage.setItem("bookingCart", JSON.stringify(bookingData));
    navigate("/cart");
  };

  const calculatePricePreview = () => {
    if (
      !rentDate ||
      !returnDate ||
      new Date(rentDate) >= new Date(returnDate)
    ) {
      return null;
    }

    const start = new Date(rentDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let totalPrice = product.rentPrice * rentalDays;
    let hasExtendedDays = false;

    if (rentalDays > 4) {
      const standardDays = 4;
      const extraDays = rentalDays - 4;
      totalPrice =
        product.rentPrice * standardDays + product.rentPrice * 1.5 * extraDays;
      hasExtendedDays = true;
    }

    return { rentalDays, totalPrice: Math.ceil(totalPrice), hasExtendedDays };
  };

  const fetchProduct = async () => {
    const res = await axios.get(`${backendUrl}/api/product/list`);

    if (res.data.success) {
      const found = res.data.products.find((p) => p._id === id);
      setProduct(found);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090909] text-white">
        <h2 className="text-xl">Loading product details...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="rounded-3xl overflow-hidden border border-yellow-500/10 bg-[#111111] shadow-xl shadow-black/30">
            <img
              src={
                product?.image
                  ? product.image.startsWith("http")
                    ? product.image
                    : `${backendUrl}${product.image}`
                  : "https://via.placeholder.com/600x600"
              }
              alt={product.name}
              className="w-full h-[560px] object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-8 shadow-xl shadow-black/20">
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-400 mb-4">
                {product.category}
              </p>
              <h1 className="text-5xl font-bold tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-gray-400 leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-gray-400 uppercase text-sm">Rent Price</p>
                  <p className="text-4xl font-semibold text-yellow-400">
                    ₹ {product.rentPrice}
                  </p>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-emerald-300 text-sm font-medium inline-block">
                  {product.available ? "Available" : "Booked"}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-8 shadow-xl shadow-black/20">
              <h2 className="text-2xl font-semibold mb-4">Rental Details</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-gray-300">
                  <span>Rent Date</span>
                  <input
                    type="date"
                    value={rentDate}
                    onChange={(e) => setRentDate(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                  />
                </label>

                <label className="space-y-2 text-sm text-gray-300">
                  <span>Return Date</span>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                  />
                </label>
              </div>

              {/* Price Preview */}
              {calculatePricePreview() && (
                <div className="mt-6 p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-300">Rental Days:</span>
                    <span className="text-white font-semibold">
                      {calculatePricePreview().rentalDays} days
                    </span>
                  </div>

                  {calculatePricePreview().hasExtendedDays && (
                    <div className="mb-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <p className="text-sm text-orange-300">
                        ⚠️ Extended rental (beyond 4 days): 1.5x rate applied to
                        extra days
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Estimated Total:</span>
                    <span className="text-2xl font-bold text-yellow-400">
                      ₹ {calculatePricePreview().totalPrice}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={bookNow}
                className="mt-8 w-full rounded-2xl bg-yellow-500 px-6 py-4 text-black font-semibold transition hover:bg-yellow-400"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
