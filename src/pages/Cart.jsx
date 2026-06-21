import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  useEffect(() => {
    const savedCart = localStorage.getItem("bookingCart");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      setCartItem(cartData);
      fetchProductDetails(cartData.productId);
    } else {
      setIsEmpty(true);
    }
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
     const res = await fetch(`${backendUrl}/api/product/list`);
      const data = await res.json();
      if (data.success) {
        const product = data.products.find((p) => p._id === productId);
        setProductDetails(product);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const calculateDays = () => {
    if (!cartItem?.rentDate || !cartItem?.returnDate) return 0;
    const start = new Date(cartItem.rentDate);
    const end = new Date(cartItem.returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const calculatePricing = () => {
    const rentalDays = cartItem?.rentalDays || calculateDays();
    const dailyRate = cartItem?.price || 0;

    let standardDaysCost = 0;
    let extendedDaysCost = 0;
    let hasExtendedDays = false;

    if (rentalDays <= 4) {
      standardDaysCost = dailyRate * rentalDays;
    } else {
      standardDaysCost = dailyRate * 4;
      const extraDays = rentalDays - 4;
      extendedDaysCost = dailyRate * 1.5 * extraDays;
      hasExtendedDays = true;
    }

    const totalPrice = standardDaysCost + extendedDaysCost;
    return {
      rentalDays,
      standardDaysCost: Math.ceil(standardDaysCost),
      extendedDaysCost: Math.ceil(extendedDaysCost),
      totalPrice: Math.ceil(cartItem?.totalPrice || totalPrice),
      hasExtendedDays,
    };
  };

  const handleRemove = () => {
    localStorage.removeItem("bookingCart");
    navigate("/products");
  };

  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-[#090909] text-white py-12 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-3">
          Your Cart is Empty
        </p>
        <h1 className="text-4xl font-bold mb-4">No items in cart</h1>
        <p className="max-w-2xl text-gray-400 mb-8">
          You can browse our collection and add a rental item to your cart.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="rounded-2xl bg-yellow-500 px-6 py-4 text-black font-semibold transition hover:bg-yellow-400"
        >
          Browse Products
        </button>
      </div>
    );
  }

  if (!cartItem) {
    return (
      <div className="min-h-screen bg-[#090909] text-white py-12 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-3">
            Order Review
          </p>
          <h1 className="text-4xl font-bold">Your Cart</h1>
          <p className="max-w-3xl text-gray-400 mt-4">
            Review your rental details before proceeding to payment.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Item */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-8 shadow-xl shadow-black/30">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Product Image */}
                <div className="sm:w-48 flex-shrink-0">
                  <img
                    src={
                      productDetails?.image
                        ? productDetails.image.startsWith("http")
                          ? productDetails.image
                          : `${backendUrl}${productDetails.image}`
                        : "https://via.placeholder.com/400x300"
                    }
                    alt={cartItem.productName}
                    className="w-full h-40 sm:h-48 object-cover rounded-2xl"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="mb-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-yellow-400 mb-2">
                      {productDetails?.category}
                    </p>
                    <h2 className="text-3xl font-semibold mb-2">
                      {cartItem.productName}
                    </h2>
                    {productDetails?.description && (
                      <p className="text-gray-400 text-sm">
                        {productDetails.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Rent Date:</span>
                      <span className="font-medium">{cartItem.rentDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Return Date:</span>
                      <span className="font-medium">{cartItem.returnDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Duration:</span>
                      <span className="font-medium">
                        {calculatePricing().rentalDays} days
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Price per day:</span>
                      <span className="font-medium text-yellow-400">
                        ₹ {cartItem.price}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleRemove}
                    className="text-red-400 hover:text-red-300 text-sm font-medium transition"
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="h-fit">
            <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-8 shadow-xl shadow-black/30 space-y-6">
              <h3 className="text-2xl font-semibold">Order Summary</h3>

              <div className="space-y-4 border-b border-white/10 pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Price per day</span>
                  <span className="font-medium">₹ {cartItem.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    Standard days (4 days max)
                  </span>
                  <span className="font-medium">
                    ₹ {calculatePricing().standardDaysCost}
                  </span>
                </div>

                {calculatePricing().hasExtendedDays && (
                  <>
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-2 mt-3">
                      <p className="text-xs text-orange-300 mb-2">
                        ⚠️ Extended rental surcharge (1.5x rate for days beyond
                        4)
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Extended days ({calculatePricing().rentalDays - 4}{" "}
                          days)
                        </span>
                        <span className="font-medium text-orange-300">
                          + ₹ {calculatePricing().extendedDaysCost}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Total Price</span>
                <span className="text-yellow-400">
                  ₹ {calculatePricing().totalPrice}
                </span>
              </div>

              <div className="bg-yellow-500/10 rounded-2xl border border-yellow-500/20 p-4 text-sm text-yellow-300">
                ✓ Security deposit will be collected at checkout
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full rounded-2xl bg-yellow-500 px-6 py-4 text-black font-semibold transition hover:bg-yellow-400"
              >
                Proceed to Payment
              </button>

              <button
                onClick={() => navigate("/products")}
                className="w-full rounded-2xl border border-white/20 px-6 py-4 text-white font-semibold transition hover:bg-white/5"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
