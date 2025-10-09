import React, {useState, useEffect} from "react";
import { ShoppingCartIcon, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../components/Api"

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null);
  // const [error, setError] = useState(false);
  const navigate =  useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       const response = await api.get("products");
        setProducts(response.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setAddingToCart(item.id);
    try {
      const variantId = item?.variants?.[0]?.id;

      await api.post(
        "cart/add_item",
        {
          product_id: item.id,
          variant_id: variantId,
          qty: 1,
        },
        {
          headers: { Token: `Bearer ${token}` },
        }
      );

      navigate("/cart");
    } catch (err) {
      console.error(err.response?.data?.errors || "Failed to add item to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // const productsToShow = Array.from({ length: 10 }, (_, i) => ({ ...products[0], id: i }));

  return (
    <section className="py-10 px-4 relative overflow-hidden bg-gray-50">
      <div className="max-w-auto mx-auto mb-10 text-center md:text-left">
        <h1 className="text-4xl font-semibold mb-4">Featured Products</h1>
        <p className="text-gray-400">
          Handpicked favourites from our artisan or ceramic collection
        </p>
      </div>

      <div className="max-w-auto mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden w-full flex flex-col"
          >
            {/* Image */}
            <a href={`/product/${item.slug}`} className="relative w-full h-56 overflow-hidden group">
              <img
                src="/img.png"
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-black">{item.name}</h3>
              <p className="flex items-center space-x-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(item.average_rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-400 ml-2">({item.review_count})</span>
              </p>
              <div className="mt-2">
                <span className="text-sm text-gray-400 line-through">
                  ₹{item.variants?.[0]?.original_price}
                </span>
                <span className="text-black font-bold ml-2">₹{item.variants?.[0]?.price}</span>
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                disabled={item?.variants?.[0]?.stock_quantity <= 0 || addingToCart === item.id}
                className={`mt-4 py-2 px-6 space-x-2 rounded-md font-semibold text-lg flex items-center justify-center transition-all bg-black ${
                  item?.variants?.[0]?.stock_quantity > 0
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-red-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span>{addingToCart === item.id ? "Adding..." : item?.variants?.[0]?.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-10">
        <button onClick={() => navigate("/product")} className="bg-black text-white text-md px-6 py-2 rounded-md hover:bg-gray-800">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
