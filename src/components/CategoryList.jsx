import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";
import api from "./Api";

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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gray-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gray-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gray-400 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our carefully curated collections of handcrafted ceramic items, 
            each piece designed to elevate your dining experience.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((cat, idx) => {
              const productCount = cat.product_count || 0;
              
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                  onClick={() => navigate(`/product?category=${cat.category?.slug}&subcategory=${cat.slug}`)}
                >
                  {/* Image Container */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src="/img.png"
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Product Count Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Package className="w-4 h-4 inline mr-1" />
                      {productCount}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {cat.description}
                    </p>
                    
                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 font-medium">
                        {productCount} items
                      </span>
                      <div className="flex items-center text-gray-400 group-hover:text-gray-900 transition-colors">
                        <span className="text-sm font-medium mr-1">Shop Now</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories available</h3>
              <p className="text-gray-600">Categories will appear here when available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
