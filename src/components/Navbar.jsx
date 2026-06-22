import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = ({ token, setToken }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [hasCart, setHasCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      setMenuOpen(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    setToken("");
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1
            className="text-xl md:text-2xl font-bold text-yellow-500 tracking-wider"
            style={{ fontFamily: "Cinzel" }}
          >
            VELMIRA
          </h1>

          <p className="text-[10px] md:text-xs text-gray-400">
            Luxury Jewellery Rental
          </p>
        </Link>

        {/* Search Bar Desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-sm mx-6"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:border-yellow-500"
            />

            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400"
            >
              🔍
            </button>
          </div>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5 text-sm">

          <Link to="/" className="hover:text-yellow-500">
            Home
          </Link>

          <Link to="/products" className="hover:text-yellow-500">
            Collections
          </Link>

          <Link to="/contact" className="hover:text-yellow-500">
            Contact
          </Link>

          <Link
            to="/cart"
            className="relative hover:text-yellow-500"
          >
            🛒

            {hasCart && (
              <span className="absolute -top-2 -right-3 w-4 h-4 bg-yellow-500 text-black text-xs rounded-full flex items-center justify-center">
                1
              </span>
            )}
          </Link>

          {token ? (
            <>
              <Link
                to="/my-bookings"
                className="hover:text-yellow-500"
              >
                My Bookings
              </Link>

              <button
                onClick={logoutUser}
                className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {location.pathname !== "/login" && (
                <Link
                  to="/login"
                  className="hover:text-yellow-500"
                >
                  Login
                </Link>
              )}

              {location.pathname !== "/register" && (
                <Link
                  to="/register"
                  className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-400"
                >
                  Register
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-yellow-500/20 px-4 py-4">

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none"
            />
          </form>

          <div className="flex flex-col gap-4 text-white">

            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
            >
              Collections
            </Link>

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
            >
              Cart {hasCart && "(1)"}
            </Link>

            {token ? (
              <>
                <Link
                  to="/my-bookings"
                  onClick={() => setMenuOpen(false)}
                >
                  My Bookings
                </Link>

                <button
                  onClick={logoutUser}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {location.pathname !== "/login" && (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}

                {location.pathname !== "/register" && (
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-yellow-500 text-black px-4 py-2 rounded-full text-center font-semibold"
                  >
                    Register
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;