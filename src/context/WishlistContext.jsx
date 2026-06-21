// import React, { createContext, useContext, useEffect, useState } from "react";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
//     setWishlist(stored);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   const addToWishlist = (product) => {
//     setWishlist((prev) => {
//       const exists = prev.find((item) => item._id === product._id);
//       if (exists) return prev;
//       return [...prev, product];
//     });
//   };

//   const removeFromWishlist = (id) => {
//     setWishlist((prev) => prev.filter((item) => item._id !== id));
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);