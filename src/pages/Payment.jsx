import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const savedCart = localStorage.getItem("bookingCart");
    if (savedCart) {
      setCartItem(JSON.parse(savedCart));
    } else {
      navigate("/cart");
    }
  }, []);

  const calculateDays = () => {
    if (!cartItem?.rentDate || !cartItem?.returnDate) return 0;
    const start = new Date(cartItem.rentDate);
    const end = new Date(cartItem.returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const totalPrice =
    cartItem?.totalPrice || (cartItem ? cartItem.price * calculateDays() : 0);
  const securityDeposit = Math.ceil(totalPrice * 0.5);
  const finalAmount = totalPrice + securityDeposit;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");

      const res = await fetch(`${backendUrl}/api/booking/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userName,
          productId: cartItem.productId,
          productName: cartItem.productName,
          price: totalPrice,
          rentDate: cartItem.rentDate,
          returnDate: cartItem.returnDate,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.removeItem("bookingCart");
        alert("Payment Successful! Booking confirmed 🎉");
        navigate("/my-bookings");
      } else {
        alert("Payment failed: " + data.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Error processing payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            Secure Checkout
          </p>
          <h1 className="text-4xl font-bold">Complete Your Payment</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-8 shadow-xl shadow-black/30">
              <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>

              <form onSubmit={handlePayment} className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-medium">Credit/Debit Card</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-medium">UPI</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="wallet"
                      checked={paymentMethod === "wallet"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="font-medium">Digital Wallet</span>
                  </label>
                </div>

                {/* Card Details */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-gray-300">
                        Card Number
                      </span>
                      <input
                        type="text"
                        placeholder="4111 1111 1111 1111"
                        className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                        maxLength="19"
                      />
                    </label>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2">
                        <span className="text-sm font-medium text-gray-300">
                          Expiry
                        </span>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                          maxLength="5"
                        />
                      </label>

                      <label className="space-y-2">
                        <span className="text-sm font-medium text-gray-300">
                          CVV
                        </span>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                          maxLength="3"
                        />
                      </label>
                    </div>

                    <label className="space-y-2">
                      <span className="text-sm font-medium text-gray-300">
                        Cardholder Name
                      </span>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                      />
                    </label>
                  </div>
                )}

                {/* UPI Details */}
                {paymentMethod === "upi" && (
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <label className="space-y-2">
                      <span className="text-sm font-medium text-gray-300">
                        UPI ID
                      </span>
                      <input
                        type="text"
                        placeholder="yourname@bank"
                        className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                      />
                    </label>
                  </div>
                )}

                <div className="bg-yellow-500/10 rounded-2xl border border-yellow-500/20 p-4 text-sm text-yellow-300">
                  ✓ Your payment is secure and encrypted
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-yellow-500 px-6 py-4 text-black font-semibold transition hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Complete Payment"}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="h-fit">
            <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-8 shadow-xl shadow-black/30 space-y-6">
              <h3 className="text-2xl font-semibold">Order Summary</h3>

              <div className="space-y-3 border-b border-white/10 pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Rental Days</span>
                  <span>{cartItem?.rentalDays || calculateDays()}</span>
                </div>

                {cartItem?.rentalDays > 4 && (
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-2">
                    <div className="flex justify-between text-sm text-orange-300 mb-1">
                      <span>⚠️ Standard days (4)</span>
                      <span>₹ {Math.ceil(cartItem.price * 4)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-orange-300">
                      <span>
                        Extended days ({cartItem.rentalDays - 4}) @ 1.5x
                      </span>
                      <span>
                        ₹{" "}
                        {Math.ceil(
                          cartItem.price * 1.5 * (cartItem.rentalDays - 4),
                        )}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Rental Amount</span>
                  <span>₹ {totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Security Deposit (50%)</span>
                  <span>₹ {securityDeposit}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount</span>
                <span className="text-yellow-400">₹ {finalAmount}</span>
              </div>

              <div className="bg-emerald-500/10 rounded-2xl border border-emerald-500/20 p-4 text-sm text-emerald-300 space-y-2">
                <p>✓ Refundable security deposit</p>
                <p>✓ Insurance included</p>
                <p>✓ Free return shipping</p>
              </div>

              <button
                onClick={() => navigate("/cart")}
                className="w-full rounded-2xl border border-white/20 px-6 py-3 text-white font-semibold transition hover:bg-white/5"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
