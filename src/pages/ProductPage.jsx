import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, List, ShoppingCart, Star, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import api from "../components/Api";

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get("category") || "";
  const initialSubcategory = searchParams.get("subcategory") || "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState(initialSubcategory);

  const query = searchParams.get("q");

  const materials = ['Fine Porcelain', 'Ceramic', 'Stoneware', 'Crystal', 'Stainless Steel'];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("categories");
      const data = res.data.data || [];
      setCategories([...data]);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory);
    } else {
      setSubcategories([]);
      setSelectedSubcategory('');
    }
  }, [selectedCategory]);

  const fetchSubcategories = async (categorySlug) => {
    try {
      const res = await api.get(`categories/${categorySlug}/subcategories`);
      setSubcategories(res.data.data || []);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      setSubcategories([]);
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        min_price: priceFrom,
        max_price: priceTo,
        sort_by: sortBy || 'featured',
      };

      if (query) params.q = query;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedSubcategory) params.subcategory = selectedSubcategory;
      if (selectedMaterial.length > 0) params.material = selectedMaterial.join(",");

      const res = await api.get("products", { params });
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [query, selectedCategory, selectedSubcategory, priceFrom, priceTo, selectedMaterial, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  const handleMaterialToggle = (material) => {
    setSelectedMaterial((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const handleClearFilters = () => {
    setSortBy('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setPriceFrom('');
    setPriceTo('');
    setSelectedMaterial([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
          {query && (
            <p className="text-gray-600 my-2">
              Showing results for <span className="font-medium text-gray-900">"{query}"</span>
            </p>
          )}

          {/* Filter Bar */}
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
              >
                <option value="featured">Featured</option>
                <option value="low_to_high">Price: Low to High</option>
                <option value="high_to_low">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white"
              >
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Active Filters */}
          {(selectedSubcategory || selectedMaterial.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedSubcategory && (
                <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
                  {subcategories.find(s => s.slug === selectedSubcategory)?.name}
                  <X
                    className="w-4 h-4 ml-2 cursor-pointer"
                    onClick={() => setSelectedSubcategory('')}
                  />
                </span>
              )}
              {selectedMaterial.map(material => (
                <span key={material} className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
                  {material}
                  <X className="w-4 h-4 ml-2 cursor-pointer" onClick={() => handleMaterialToggle(material)} />
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-6">
                
                {/* Sub Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sub Categories</h3>
                  <div className="space-y-2"> 
                    {subcategories.map(sc => ( 
                      <button key={sc.slug} 
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedSubcategory === sc.slug ? 'bg-gray-900 text-white' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        onClick={() => setSelectedSubcategory(sc.slug)}
                      >
                        {sc.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Material</h3>
                  <div className="space-y-2">
                    {materials.map(material => (
                      <label key={material} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedMaterial.includes(material)}
                          onChange={() => handleMaterialToggle(material)}
                          className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                        />
                        <span className="text-gray-700">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Inputs */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price</h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="From"
                      value={priceFrom}
                      onChange={e => setPriceFrom(e.target.value)}
                      className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <input
                      type="number"
                      placeholder="To"
                      value={priceTo}
                      onChange={e => setPriceTo(e.target.value)}
                      className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={handleClearFilters}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </aside>
          )}

          {/* Products Grid/List */}
          <main className="flex-1">
            {loading ? (
              <div className="bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading products...</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, viewMode }) => {
  const navigate = useNavigate();
  const { isProductInCart, addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const variantId = product?.variants?.[0]?.id;
      await addToCart(product.id, variantId, 1);
      toast.success("Item added to cart!");
    } catch (err) {
      toast.error(err.response?.data?.errors || "Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-6 flex gap-6">
        <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-6xl">
          <a href={`/product/${product.slug}`} className="relative w-full h-full overflow-hidden group">
            <img src="/img.png" alt="product-image" className='w-full h-full object-cover' />
          </a>
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                {product.is_new && (
                  <span className="inline-block px-2 py-1 bg-black text-white text-xs rounded-full mb-2 mr-2">NEW</span>
                )}
                {product.variants?.[0]?.discount_percentage > 0 && (
                  <span className="inline-block px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full mb-2 ml-2 font-semibold">
                    {product.variants?.[0]?.discount_percentage}% OFF
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-1 break-words">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.pieces_count} Pieces • {product.material}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.average_rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.average_rating} ({product.review_count} reviews)
              </span>
            </div>
          </div>
          
          <div className="mt-auto mr-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">₹{product.variants?.[0]?.price}</span>
                {product.variants?.[0]?.original_price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">₹{product.variants?.[0]?.original_price}</span>
                  </>
                )}
              </div>
            </div>
            <div className='mt-3'>
              {isProductInCart(product.id) ? (
                <button 
                  onClick={handleGoToCart}
                  className="w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Go to Cart</span>
                </button>
              ) : (
                <button 
                  onClick={handleAddToCart}
                  disabled={product?.variants?.[0]?.stock_quantity <= 0 || loading}
                  className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    product?.variants?.[0]?.stock_quantity > 0
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-300 text-red-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{loading ? "Adding..." : product?.variants?.[0]?.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-300">
          <a href={`/product/${product.slug}`} className="relative w-full h-full overflow-hidden group">
            <img src="/img.png" alt="product-image" className='w-full h-full object-cover' />
          </a>
        </div>
        
        {product.is_new && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
            NEW
          </span>
        )}

        {product.variants?.[0]?.discount_percentage > 0 && (
          <span className="absolute bottom-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
            {product.variants?.[0]?.discount_percentage}% OFF
          </span>
        )}
        
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        
        <p className="text-sm text-gray-600 mb-3">{product.pieces_count} Pieces • {product.material}</p>
        
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.average_rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">{product.average_rating} ({product.review_count} reviews)</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">₹{product.variants?.[0]?.price}</span>
            {product.variants?.[0]?.original_price && (
              <span className="text-sm text-gray-400 line-through">₹{product.variants?.[0]?.original_price}</span>
            )}
          </div>
        </div>
        
        {isProductInCart(product.id) ? (
          <button 
            onClick={handleGoToCart}
            className="w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 bg-yellow-500 text-white hover:bg-yellow-600"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Go to Cart</span>
          </button>
        ) : (
          <button 
            onClick={handleAddToCart}
            disabled={product?.variants?.[0]?.stock_quantity <= 0 || loading}
            className={`w-full py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
              product?.variants?.[0]?.stock_quantity > 0
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-red-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{loading ? "Adding..." : product?.variants?.[0]?.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
