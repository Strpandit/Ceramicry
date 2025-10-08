import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../components/Api";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
       const response = await api.get("all_subcategory");
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">Loading categories...</div>
    );
  }

  return (
    <section className="py-10 px-4 relative overflow-hidden bg-gray-50">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-semibold mb-4">Shop by Category</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover our carefully curated collections of handcrafted ceramic items, each piece designed to elevate your dining experience.
        </p>
      </div>

      <div className="max-w-auto mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
        {categories.length > 0 ? (
          categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 w-full flex flex-col"
          >
            {/* Image */}
            <img
              src="/img.png"
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-black">{cat.name}</h3>
              <p className="text-sm text-gray-400 mt-2 flex-1">
                {cat.description}
              </p>
              <button
                onClick={() => navigate(`/product?category=${cat.category?.slug}&subcategory=${cat.slug}`)}
                className="mt-4 px-4 py-2 text-black font-semibold text-center"
              >
                Shop Now
              </button>
            </div>
          </div>
        )) ) : (
          <p className="text-gray-500 col-span-full">
            No categories available.
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoryList;
