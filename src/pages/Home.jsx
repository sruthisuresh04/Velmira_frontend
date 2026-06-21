// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const categories = [
//     {
//       name: "Necklace",
//       image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d",
//     },
//     {
//       name: "Earrings",
//       image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
//     },
//     {
//       name: "Bangles",
//       image: "https://trejours.com/storage/products/1083_0.png",
//     },
//     {
//       name: "Rings",
//       image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
//     },
//   ];

//   return (
//     <div className="bg-[#0f0f0f] text-white">
//       {/* HERO */}
//       <section className="relative h-screen flex items-center justify-center overflow-hidden">
//         <img
//           src="https://images.unsplash.com/photo-1617038220319-276d3cfab638"
//           alt=""
//           className="absolute inset-0 w-full h-full object-cover"
//         />

//         <div className="absolute inset-0 bg-black/70"></div>

//         <div className="relative z-10 text-center px-6">
//           <h2
//             className="text-yellow-500 tracking-[8px] mb-4"
//             style={{ fontFamily: "Cinzel" }}
//           >
//             VELMIRA
//           </h2>

//           <h1
//             className="text-5xl md:text-7xl font-bold mb-6"
//             style={{ fontFamily: "Cinzel" }}
//           >
//             Luxury Jewellery
//             <br />
//             Rental Collection
//           </h1>

//           <p className="max-w-2xl mx-auto text-gray-300 text-lg mb-8">
//             Discover premium bridal and party jewellery crafted to make every
//             special moment unforgettable.
//           </p>

//           <Link
//             to="/products"
//             className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
//           >
//             Explore Collection
//           </Link>
//         </div>
//       </section>

//       {/* CATEGORY */}
//       <section className="max-w-7xl mx-auto px-6 py-24">
//         <h2
//           className="text-4xl text-center mb-14"
//           style={{ fontFamily: "Cinzel" }}
//         >
//           Shop By Category
//         </h2>

//         <div className="grid md:grid-cols-4 gap-8">
//           {categories.map((item) => (
//             <Link
//               key={item.name}
//               to={`/products?category=${encodeURIComponent(item.name)}`}
//               className="relative rounded-2xl overflow-hidden group cursor-pointer"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="h-80 w-full object-cover group-hover:scale-110 duration-500"
//               />

//               <div className="absolute inset-0 bg-black/40"></div>

//               <div className="absolute bottom-5 left-5">
//                 <h3 className="text-2xl font-bold">{item.name}</h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* WHY US */}
//       <section className="bg-[#161616] py-24">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2
//             className="text-4xl text-center mb-14"
//             style={{ fontFamily: "Cinzel" }}
//           >
//             Why Velmira
//           </h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-[#1d1d1d] border border-yellow-500/20 p-8 rounded-2xl">
//               <h3 className="text-yellow-500 text-xl font-bold mb-4">
//                 Premium Quality
//               </h3>

//               <p className="text-gray-400">
//                 Handpicked luxury jewellery for weddings and special occasions.
//               </p>
//             </div>

//             <div className="bg-[#1d1d1d] border border-yellow-500/20 p-8 rounded-2xl">
//               <h3 className="text-yellow-500 text-xl font-bold mb-4">
//                 Affordable Rental
//               </h3>

//               <p className="text-gray-400">
//                 Enjoy luxury without spending a fortune.
//               </p>
//             </div>

//             <div className="bg-[#1d1d1d] border border-yellow-500/20 p-8 rounded-2xl">
//               <h3 className="text-yellow-500 text-xl font-bold mb-4">
//                 Easy Booking
//               </h3>

//               <p className="text-gray-400">
//                 Book your favourite collection in minutes.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 text-center">
//         <h2 className="text-5xl mb-6" style={{ fontFamily: "Cinzel" }}>
//           Find Your Perfect Jewellery
//         </h2>

//         <p className="text-gray-400 mb-8">
//           Explore our latest premium collection.
//         </p>

//         <Link
//           to="/products"
//           className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold"
//         >
//           View Products
//         </Link>
//       </section>

//       {/* FOOTER */}
//       {/* <footer className="border-t border-yellow-500/10 py-12">
//         <div className="text-center">
//           <h2
//             className="text-3xl text-yellow-500 mb-3"
//             style={{ fontFamily: "Cinzel" }}
//           >
//             VELMIRA
//           </h2>

//           <p className="text-gray-400">Rent Luxury, Shine Beautifully</p>

//           <p className="text-gray-500 mt-4">
//             © 2026 Velmira. All Rights Reserved.
//           </p>
//         </div>
//       </footer> */}
//     </div>
//   );
// };

// export default Home;



import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedJewellery from "../components/FeaturedJewellery";
import TrendingProducts from "../components/TrendingProducts";

const Home = () => {
  return (
    <div className="bg-[#0f0f0f] text-white">

      <Hero />
      <Categories />
      <FeaturedJewellery />
      <TrendingProducts/>

    </div>
  );
};

export default Home;