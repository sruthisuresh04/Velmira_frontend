// import React from "react";
// import { useWishlist } from "../context/WishlistContext";

// const Wishlist = () => {
//   const { wishlist, removeFromWishlist } = useWishlist();

//   return (
//     <div className="bg-[#0f0f0f] text-white min-h-screen p-10">

//       <h2 className="text-3xl mb-8">My Wishlist ❤️</h2>

//       {wishlist.length === 0 ? (
//         <p>No items in wishlist</p>
//       ) : (
//         <div className="grid md:grid-cols-4 gap-6">

//           {wishlist.map((item) => (
//             <div key={item._id} className="bg-[#1a1a1a] p-4 rounded-xl">

//               <img
//                 src={`http://localhost:5000${item.image}`}
//                 className="h-60 w-full object-cover rounded"
//               />

//               <h3 className="mt-3">{item.name}</h3>

//               <p className="text-yellow-500">₹ {item.rentPrice}</p>

//               <button
//                 onClick={() => removeFromWishlist(item._id)}
//                 className="mt-3 text-red-400"
//               >
//                 Remove
//               </button>

//             </div>
//           ))}

//         </div>
//       )}

//     </div>
//   );
// };

// export default Wishlist;