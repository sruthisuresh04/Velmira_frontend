import React from "react";

const FeaturedJewellery = () => {
  return (
    <section className="bg-[#161616] py-24">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl text-center mb-14" style={{ fontFamily: "Cinzel" }}>
          Why Velmira
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-[#1d1d1d] p-8 rounded-2xl">
            <h3 className="text-yellow-500 text-xl font-bold mb-4">
              Bridal Collection
            </h3>
            <p className="text-gray-400">
              Premium bridal sets for weddings.
            </p>
          </div>

          <div className="bg-[#1d1d1d] p-8 rounded-2xl">
            <h3 className="text-yellow-500 text-xl font-bold mb-4">
              Party Wear
            </h3>
            <p className="text-gray-400">
              Elegant jewellery for parties.
            </p>
          </div>

          <div className="bg-[#1d1d1d] p-8 rounded-2xl">
            <h3 className="text-yellow-500 text-xl font-bold mb-4">
              Premium Sets
            </h3>
            <p className="text-gray-400">
              Luxury designer collections.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default FeaturedJewellery;