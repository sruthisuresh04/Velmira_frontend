import React from "react";
import { Link } from "react-router-dom";
import test01 from "../assets/test01.jpg";
import test02 from "../assets/test02.jpg";
import test03 from "../assets/test03.jpg";
import test04 from "../assets/test04.jpg";


const Categories = () => {
  const categories = [
    { name: "Necklace", image: test01 },
    { name: "Earrings", image:test02 },
    { name: "Bangles", image:test04  },
    { name: "Rings", image:test03 }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <h2 className="text-4xl text-center mb-14" style={{ fontFamily: "Cinzel" }}>
        Shop By Category
      </h2>

      <div className="grid md:grid-cols-4 gap-8">

        {categories.map((item) => (
          <Link
            key={item.name}
            to={`/products?category=${encodeURIComponent(item.name)}`}
            className="relative rounded-2xl overflow-hidden group"
          >
            <img
              src={item.image}
              className="h-80 w-full object-cover group-hover:scale-110 duration-500"
              alt={item.name}
            />

            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute bottom-5 left-5">
              <h3 className="text-2xl font-bold">{item.name}</h3>
            </div>

          </Link>
        ))}

      </div>
    </section>
  );
};

export default Categories;