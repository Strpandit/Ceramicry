import React from "react";

const Newsletter = () => {
  return (
    <section className="py-12 px-8 bg-gray-950 text-white text-center">
      <h2 className="text-4xl mb-4">Stay Updated</h2>
      <p className="mb-6 mx-auto">Get the latest updates on new collections, exclusive offers, <br />and ceramic care tips.</p>
      <div className="flex justify-center pt-4 pb-8 mx-2">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="px-4 py-2 rounded-l-full text-black outline-none"
        />
        <button className="bg-white text-black font-semibold px-6 py-2 rounded-r-full border-l hover:bg-gray-200 transition">
          Subscribe
        </button>
      </div>
    </section>
  );
};

export default Newsletter;
