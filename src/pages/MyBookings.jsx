import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [productMap, setProductMap] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchBookings = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setBookings([]);
      return;
    }

    const [bookingRes, productRes] = await Promise.all([
      axios.get(`${backendUrl}/api/booking/user/${userId}`),
      axios.get(`${backendUrl}/api/product/list`),
    ]);

    if (bookingRes.data.success) {
      setBookings(bookingRes.data.bookings);
    }

    if (productRes.data.success) {
      const map = productRes.data.products.reduce((acc, product) => {
        acc[product._id] = product;
        return acc;
      }, {});
      setProductMap(map);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.post(`${backendUrl}/api/booking/status`, {
        id,
        status: "Cancelled",
      });
      fetchBookings();
    } catch (error) {
      console.error("Cancel booking failed:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const renderImage = (item) => {
    const product = productMap[item.productId];
    const imageUrl = product?.image
      ? product.image.startsWith("http")
        ? product.image
        : `${backendUrl}${product.image}`
      : "https://via.placeholder.com/600x400?text=No+Image";

    return (
      <img
        src={imageUrl}
        alt={item.productName}
        className="h-56 w-full object-cover rounded-3xl"
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-3">
            My Bookings
          </p>
          <h1 className="text-4xl font-bold">Your Booked Jewellery</h1>
          <p className="max-w-3xl text-gray-400 mt-4">
            Review your booked pieces with rental dates, price, and booking
            status.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-yellow-500/20 bg-[#111111] p-10 text-center text-gray-300">
            No bookings found.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {bookings.map((item) => {
              const product = productMap[item.productId];
              const bookingStatus = item.status || "Pending";
              return (
                <div
                  key={item._id}
                  className="overflow-hidden rounded-3xl border border-yellow-500/10 bg-[#111111] shadow-xl shadow-black/30"
                >
                  {renderImage(item)}
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-yellow-400 mb-2">
                        {product?.category || "Jewellery"}
                      </p>
                      <h2 className="text-2xl font-semibold">
                        {item.productName}
                      </h2>
                    </div>

                    {product?.description && (
                      <p className="text-gray-400 line-clamp-3">
                        {product.description}
                      </p>
                    )}

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-xs uppercase text-gray-400">
                          Rent Date
                        </p>
                        <p className="mt-2 font-medium">{item.rentDate}</p>
                      </div>
                      <div className="rounded-2xl bg-white/5 p-4">
                        <p className="text-xs uppercase text-gray-400">
                          Return Date
                        </p>
                        <p className="mt-2 font-medium">{item.returnDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase text-gray-400">Price</p>
                        <p className="text-lg font-semibold">₹ {item.price}</p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                          bookingStatus === "Approved"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : bookingStatus === "Returned"
                              ? "bg-blue-500/15 text-blue-300"
                              : bookingStatus === "Cancelled"
                                ? "bg-red-500/15 text-red-300"
                                : "bg-yellow-500/15 text-yellow-300"
                        }`}
                      >
                        {bookingStatus}
                      </span>
                    </div>
                    {bookingStatus === "Cancelled" && (
                      <div className="rounded-2xl bg-rose-500/10 p-4">
                        <p className="text-xs uppercase text-gray-400">
                          Refund
                        </p>
                        <p className="mt-2 text-lg font-semibold">
                          ₹ {item.refundAmount ?? Math.round(item.price * 0.5)}
                        </p>
                      </div>
                    )}
                    {bookingStatus !== "Cancelled" &&
                      bookingStatus !== "Returned" && (
                        <button
                          onClick={() => cancelBooking(item._id)}
                          className="w-full rounded-2xl bg-red-600/90 hover:bg-red-500 text-white px-4 py-3 text-sm font-semibold transition"
                        >
                          Cancel Booking
                        </button>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
