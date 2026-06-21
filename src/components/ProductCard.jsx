// import React from "react";
// import { Link } from "react-router-dom";
// import { useWishlist } from "../context/WishlistContext";

// const ProductCard = ({ item }) => {
//   const { addToWishlist, wishlist, removeFromWishlist } = useWishlist();

//   const isLiked = wishlist.some((p) => p._id === item._id);

//   const toggleWishlist = () => {
//     if (isLiked) {
//       removeFromWishlist(item._id);
//     } else {
//       addToWishlist(item);
//     }
//   };

//   return (
//     <div className="group relative bg-[#0f0f0f] border border-yellow-500/10 rounded-2xl overflow-hidden">

//       {/* ❤️ Wishlist Button */}
//       <button
//         onClick={toggleWishlist}
//         className="absolute top-4 right-4 z-10 text-xl"
//       >
//         {isLiked ? "❤️" : "🤍"}
//       </button>

//       {/* IMAGE */}
//       <Link to={`/product/${item._id}`}>
//         <div className="overflow-hidden">
//           <img
//             src={`http://localhost:5000${item.image}`}
//             alt={item.name}
//             className="h-80 w-full object-cover group-hover:scale-105 transition duration-700"
//           />
//         </div>
//       </Link>

//       {/* CONTENT */}
//       <div className="p-5 text-center">

//         <h3 className="text-white text-lg font-light" style={{ fontFamily: "Cinzel" }}>
//           {item.name}
//         </h3>

//         <p className="text-gray-400 text-sm mt-1">
//           {item.category}
//         </p>

//         <p className="text-yellow-500 mt-2 font-semibold">
//           ₹ {item.rentPrice}
//         </p>

//       </div>

//       {/* GOLD HOVER EFFECT */}
//       <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition"></div>

//     </div>
//   );
// };

// export default ProductCard;