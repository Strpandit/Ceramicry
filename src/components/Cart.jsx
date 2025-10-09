import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, Lock, Gift, X, Check } from 'lucide-react';
import api from "../components/Api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const availableCoupons = [
    { code: 'SAVE10', discount: 10, minOrder: 10000, description: '10% off on orders above ₹10,000' },
    { code: 'FLAT500', discount: 500, minOrder: 5000, description: '₹500 off on orders above ₹5,000' },
    { code: 'WELCOME15', discount: 15, minOrder: 0, description: '15% off for new customers' }
  ];

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("cart", { headers: { Token: `Bearer ${token}` } });
      const data = res.data?.data;
      if (Array.isArray(data?.cart_items)) {
        setCartItems(data.cart_items);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Failed to fetch cart items", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, qty) => {
    if (qty < 1) return;
    try {
      const token = localStorage.getItem("token");
      await api.patch('cart/update_item', {cart_item_id: itemId, qty }, { headers: { Token: `Bearer ${token}` } });
      fetchCart();
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete('cart/remove_item', { headers: { Token: `Bearer ${token}` }, data: { cart_item_id: itemId } });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const applyCoupon = (code) => {
    const coupon = availableCoupons.find(c => c.code === code.toUpperCase());
    const subtotal = calculateSubtotal();
    
    if (coupon && subtotal >= coupon.minOrder) {
      setAppliedCoupon(coupon);
      setCouponCode('');
      setShowCouponInput(false);
    } else if (coupon && subtotal < coupon.minOrder) {
      alert(`Minimum order value of ₹${coupon.minOrder} required for this coupon`);
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.product.variants[0].price);
      return sum + price * item.qty;
    }, 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((sum, item) => {
      const variant = item.product.variants[0];
      const diff = variant.original_price - variant.price;
      return sum + diff * item.qty;
    }, 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = calculateSubtotal();
    return appliedCoupon.discount < 100
      ? Math.floor((subtotal * appliedCoupon.discount) / 100)
      : appliedCoupon.discount;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 10000 ? 0 : 500;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateShipping();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Add some beautiful crockery to get started!</p>
          <a href='/product' className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl sm:max-w-auto mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>
            <a href="/product" className="text-gray-600 hover:text-gray-900 transition-colors">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = item.product;
              const variant = product.variants[0];
              return (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-6xl">
                      <img
                      src="/img.png"
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <a href={`/product/${product.slug}`}><h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3></a>
                          <p className="text-sm text-gray-600">{product.pieces_count} Pieces • {product.material}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={updating[item.id]}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          title="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Stock Status */}
                      {variant.stock_quantity > 0 ? (
                        <div className="flex items-center space-x-2 text-green-600 text-sm mb-4">
                          <Check className="w-4 h-4" />
                          <span>In Stock</span>
                        </div>
                      ) : (
                        <div className="text-red-600 text-sm mb-4">Out of Stock</div>
                      )}

                      {/* Price and Quantity */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-2xl font-bold text-gray-900">₹{(variant.price)}</span>
                            {variant.original_price && (
                              <span className="text-lg text-gray-400 line-through">₹{(variant.original_price)}</span>
                            )}
                          </div>
                          {variant.original_price && (
                            <p className="text-sm text-green-600 font-medium">
                              You save ₹{(variant.original_price - variant.price)}
                            </p>
                          )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-lg self-start">
                          <button
                            onClick={() => updateQuantity(item.id, item.qty - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors disabled:cursor-not-allowed"
                            disabled={updating[item.id] || item.qty <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-semibold">{updating[item.id] ? '...' : item.qty}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.qty + 1)}
                            disabled={updating[item.id]}
                            className="p-2 hover:bg-gray-100 transition-colors disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Item Total:</span>
                          <span className="text-xl font-bold text-gray-900">
                            ₹{(variant.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Available Coupons */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Available Offers
                </h3>
              </div>
              <div className="space-y-3">
                {availableCoupons.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="border border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                            {coupon.code}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{coupon.description}</p>
                      </div>
                      <button
                        onClick={() => applyCoupon(coupon.code)}
                        className="px-4 py-2 text-sm font-semibold text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 max-h-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Coupon Input */}
              {!appliedCoupon && (
                <div className="mb-6">
                  {!showCouponInput ? (
                    <button
                      onClick={() => setShowCouponInput(true)}
                      className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Tag className="w-5 h-5" />
                      <span>Apply Coupon Code</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter coupon code"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => applyCoupon(couponCode)}
                        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Applied Coupon */}
              {appliedCoupon && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-900">Coupon Applied</span>
                      </div>
                      <p className="text-sm text-green-700">Code: {appliedCoupon.code}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{(calculateSubtotal())}</span>
                </div>

                {calculateSavings() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Product Discount</span>
                    <span className="font-semibold">-{(calculateSavings())}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-{(calculateDiscount())}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center">
                    Shipping
                    {calculateShipping() === 0 && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">FREE</span>
                    )}
                  </span>
                  <span className="font-semibold">
                    {calculateShipping() === 0 ? 'FREE' : (calculateShipping())}
                  </span>
                </div>

                {calculateShipping() > 0 && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Add ₹{(10000 - calculateSubtotal())} more to get FREE shipping
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 text-xl">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="font-bold text-gray-900">₹{(calculateTotal())}</span>
              </div>

              {calculateSavings() + calculateDiscount() > 0 && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-green-700 font-semibold">
                    You're saving ₹{(calculateSavings() + calculateDiscount())} on this order! 🎉
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <button className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 mb-4">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <span>Secure checkout with 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <span>Free shipping on orders above ₹10,000</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Gift className="w-5 h-5 text-gray-400" />
                  <span>Gift wrapping available at checkout</span>
                </div>
              </div>
            {/* Continue Shopping */}
            <button className="w-full lg:hidden md:hidden mt-4 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;