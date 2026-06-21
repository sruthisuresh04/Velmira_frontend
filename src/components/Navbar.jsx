import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import logo from "../assets/Logo.png";
// import { useWishlist } from "../context/WishlistContext";

const Navbar = ({ token, setToken }) => {
  // const {wishlist} = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [hasCart, setHasCart] = useState(false);

  useEffect(() => {
    const checkCart = () => {
      const cartData = localStorage.getItem("bookingCart");
      setHasCart(!!cartData);
    };

    checkCart();
    window.addEventListener("storage", checkCart);
    return () => window.removeEventListener("storage", checkCart);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <div>
            <h1
              className="text-2xl font-bold text-yellow-500 tracking-wider"
              style={{ fontFamily: "Cinzel" }}
            >
              VELMIRA
            </h1>

            <p className="text-xs text-gray-400">Luxury Jewellery Rental</p>
          </div>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xs"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none transition focus:border-yellow-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-yellow-400 hover:text-yellow-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* Menu */}
        <div className="flex items-center gap-4 text-sm md:text-base flex-shrink-0">
          <Link
            to="/"
            className="hover:text-yellow-500 transition hidden sm:block"
          >
            Home
          </Link>

          <Link to="/products" className="hover:text-yellow-500 transition">
            Collections
          </Link>

          <Link
            to="/contact"
            className="hover:text-yellow-500 transition hidden sm:block"
          >
            Contact
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative hover:text-yellow-500 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {hasCart && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-500 text-black text-xs rounded-full flex items-center justify-center font-semibold">
                1
              </span>
            )}
          </Link>
                {/* <Link to="/wishlist">
        ❤️({wishlist.length})
      </Link> */}
          {token ? (
            <>
              <Link
                to="/my-bookings"
                className="hover:text-yellow-500 transition hidden sm:block"
              >
                My Bookings
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("userToken");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("userName");
                  setToken("");
                  window.location.href = "/";
                }}
                className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {location.pathname !== "/login" && (
                <Link
                  to="/login"
                  className="hover:text-yellow-500 transition flex items-center gap-2 hidden sm:flex"
                  title="Login"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2"
                    />
                  </svg>
                  <span>Login</span>
                </Link>
              )}

              {location.pathname !== "/register" && (
                <Link
                  to="/register"
                  className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-400 transition flex items-center gap-2"
                  title="Register"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span>Register</span>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
