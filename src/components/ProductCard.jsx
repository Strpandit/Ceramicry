import React, {useState} from "react";
import { ShoppingCartIcon, CheckCircleIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isProductInCart, addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    const slug = product.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/product/${slug}`, { state: { product } }); 
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    setLoading(true);
    setAdded(false);

    try {
      const variantId = product.variants?.[0]?.id || null;
      await addToCart(product.id, variantId, 1);
      setAdded(true);
      toast.success("Item added to cart!");
    } catch(err) {
      toast.error(err.response?.data?.errors || "Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="px-2">
      <div
        className="relative w-full h-72 overflow-hidden group cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white py-2 text-center
                        transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          Quick View
        </div>
      </div>

      <div className="p-2 text-center">
        <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
            <span className="text-teal-600 font-bold ml-2">
              ₹{product.price}
            </span>
          </div>
          {isProductInCart(product.id) ? (
            <button
              onClick={handleGoToCart}
              className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition flex items-center justify-center"
            >
              <ShoppingCartIcon className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={loading || added}
              className={`bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition flex items-center justify-center disabled:opacity-50`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : added ? (
                <CheckCircleIcon className="w-5 h-5 text-green-400" />
              ) : (
                <ShoppingCartIcon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
