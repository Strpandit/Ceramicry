import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, Lock, Gift, X, Check } from 'lucide-react';
import api from "../components/Api";
import { Toaster, toast } from 'react-hot-toast';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingAddressId, setShippingAddressId] = useState("");
  const [billingAddressId, setBillingAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [orderNotes, setOrderNotes] = useState("");

  const fetchAvailableCoupons = async () => {
    setLoading(true);
    try {
      const res = await api.get("offers");
      setAvailableCoupons(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.errors);
    } finally {
      setLoading(false);
    }
  };

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
      toast.error(err.response?.data?.errors);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const res = await api.get(`accounts/${userId}`);
      const user = res.data?.data;
      const addr = Array.isArray(user?.addresses) ? user.addresses : [];
      setAddresses(addr);
      const defaultShipping = addr.find(a => a.is_default) || addr[0];
      if (defaultShipping) {
        setShippingAddressId(String(defaultShipping.id));
        setBillingAddressId(String(defaultShipping.id));
      }
    } catch (err) {
      // silently ignore
    }
  };

  const updateQuantity = async (itemId, qty) => {
    if (qty < 1) return;
    try {
      const token = localStorage.getItem("token");
      await api.patch('cart/update_item', {cart_item_id: itemId, qty }, { headers: { Token: `Bearer ${token}` } });
      fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.errors);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete('cart/remove_item', { headers: { Token: `Bearer ${token}` }, data: { cart_item_id: itemId } });
      fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.errors);
    }
  };

  const getMatchedVariant = (item) => {
    const { product, qty, total_price } = item;
    return product.variants.find(v => parseFloat(v.price) === parseFloat(total_price) / qty) || product.variants[0];
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const matchedVariant = getMatchedVariant(item);
      const price = parseFloat(matchedVariant.price);
      return sum + price * item.qty;
    }, 0);
  };

  const calculateTax = () => {
    return cartItems.reduce((sum, item) => {
      const matchedVariant = getMatchedVariant(item);
      const price = parseFloat(matchedVariant.price);
      const taxRate = parseFloat(item.product.tax_rate || 0);
      return sum + (price * taxRate / 100) * item.qty;
    }, 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((sum, item) => {
      const matchedVariant = getMatchedVariant(item);
      const diff = parseFloat(matchedVariant.original_price || matchedVariant.price) - parseFloat(matchedVariant.price);
      return sum + (diff > 0 ? diff : 0) * item.qty;
    }, 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    if (!appliedCoupon.type) {
      return parseFloat(appliedCoupon.discount || 0);
    }

    if (appliedCoupon.type === '%') {
      return (calculateSubtotal() * appliedCoupon.discount) / 100;
    }

    return parseFloat(appliedCoupon.discount) || 0;
    };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 10000 ? 0 : 199;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const shipping = calculateShipping();

    if (appliedCoupon?.finalAmount != null) {
      return appliedCoupon.finalAmount + tax + shipping;
    }

    const discount = calculateDiscount();
    return subtotal - discount + tax + shipping;
  };

  const applyCouponViaApi = async (code) => {
    if (!code) return;
    try {
      const token = localStorage.getItem("token");
      const totalAmount = calculateSubtotal();

      const res = await api.post(
        `offers/${code}/apply`,
        { total_amount: totalAmount },
        { headers: { Token: `Bearer ${token}` } }
      );

      const data = res.data;

      const applied = {
        code,
        discount: data.discount,
        message: data.message,
        finalAmount: data.final_amount
      };

      setAppliedCoupon(applied);
      localStorage.setItem('appliedCoupon', JSON.stringify(applied));
      setCouponCode('');
      setShowCouponInput(false);
      toast.success("Coupon applied successfully! 🎉");
    } catch (err) {
      toast.error(err.response?.data?.errors);
      setCouponCode('');
    }
  };

  const applyCoupon = (code) => {
    applyCouponViaApi(code);
  };

  const applyCouponLocally = (coupon) => {
    applyCouponViaApi(coupon.code);
  };

  // const applyCouponLocally = (coupon) => {
  //   let type = '₹';
  //   let discount = coupon.discount;

  //   if (coupon.discount < 100) {
  //     type = '%';
  //   } else {
  //     discount = parseFloat(coupon.discount);
  //   }

  //   const applied = {
  //     ...coupon,
  //     discount,
  //     type,
  //     discountDisplay: type === '%' ? `${coupon.discount}%` : `₹${coupon.discount}`
  //   };

  //   setAppliedCoupon(applied);
  //   localStorage.setItem('appliedCoupon', JSON.stringify(applied));
  //   setCouponCode('');
  //   setShowCouponInput(false);
  //   toast.success("Coupon applied successfully! 🎉");
  // };

  useEffect(() => {
    fetchCart();
    fetchAvailableCoupons();
    fetchAddresses();

    const savedCoupon = localStorage.getItem('appliedCoupon');
    if (savedCoupon) {
      setAppliedCoupon(JSON.parse(savedCoupon));
    }
  }, []);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      localStorage.removeItem('appliedCoupon');
      setAppliedCoupon(null);
    }
  }, [cartItems]);

  const removeCoupon = () => {
    setAppliedCoupon(null);
    localStorage.removeItem('appliedCoupon');
    toast.success("Coupon removed!");
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to proceed");
        return;
      }
      if (!shippingAddressId || !billingAddressId) {
        toast.error("Select shipping and billing addresses");
        return;
      }

      // call order review API to get exact order data
      const reviewBody = {
        shipping_address_id: Number(shippingAddressId),
        billing_address_id: Number(billingAddressId),
        payment_method: paymentMethod,
        notes: orderNotes || undefined,
        offer_code: appliedCoupon?.code || undefined,
      };

      // Call order review API to get exact pricing and data
      const reviewRes = await api.post('orders/order_review', reviewBody, { headers: { Token: `Bearer ${token}` } });
      const reviewData = reviewRes.data?.data;

      if (reviewData) {
        const checkoutBody = {
          shipping_address_id: Number(shippingAddressId),
          billing_address_id: Number(billingAddressId),
          payment_method: paymentMethod,
          notes: orderNotes || undefined,
          offer_code: appliedCoupon?.code || undefined,
          ...reviewData
        };

        const res = await api.post('orders/checkout', checkoutBody, { headers: { Token: `Bearer ${token}` } });
        const created = res.data?.data;
        toast.success(res.data?.message || 'Order placed successfully');
        setShowCheckout(false);
        window.location.href = `/orders/${created?.id}`;
      } else {
        const res = await api.post('orders/checkout', reviewBody, { headers: { Token: `Bearer ${token}` } });
        const created = res.data?.data;
        toast.success(res.data?.message || 'Order placed successfully');
        setShowCheckout(false);
        window.location.href = `/orders/${created?.id}`;
      }
    } catch (err) {
      toast.error(err.response?.data?.errors || 'Checkout failed');
    }
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
      <Toaster position="top-right" />
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl sm:max-w-auto mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-2">
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = item.product;
              const matchedVariant = getMatchedVariant(item);

              return (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-6xl">
                      <img
                        src={matchedVariant?.product_images?.[0] || "/img.png"}
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
                          {/* Show selected variant details if available (size/color) */}
                          {(matchedVariant.size || matchedVariant.color) && (
                            <div className="text-xs text-gray-500 mt-1">
                              {matchedVariant.size && <span>Size: {matchedVariant.size}</span>}
                              {matchedVariant.size && matchedVariant.color && <span>&nbsp;|&nbsp;</span>}
                              {matchedVariant.color && <span>Color: <span style={{background: matchedVariant.color, display:'inline-block', width:12, height:12, borderRadius:'50%', verticalAlign:'middle', marginRight:2}} /> {matchedVariant.color}</span>}
                            </div>
                          )}
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
                      {matchedVariant.stock_quantity > 0 ? (
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
                            <span className="text-2xl font-bold text-gray-900">₹{parseFloat(matchedVariant.price).toLocaleString('en-IN')}</span>
                            {matchedVariant.original_price && (
                              <span className="text-lg text-gray-400 line-through">₹{parseFloat(matchedVariant.original_price).toLocaleString('en-IN')}</span>
                            )}
                          </div>
                          {matchedVariant.original_price && (
                            <p className="text-sm text-green-600 font-medium">
                              You save ₹{(parseFloat(matchedVariant.original_price) - parseFloat(matchedVariant.price)).toLocaleString('en-IN')}
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
                            ₹{parseFloat(item.total_price).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Available Coupons */}
            {availableCoupons.length > 0 && (
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
                        disabled={appliedCoupon?.code === coupon.code}
                        onClick={() => applyCouponLocally(coupon)}
                        className={`px-4 py-2 text-sm font-semibold border rounded-lg transition-colors
                          ${appliedCoupon?.code === coupon.code 
                            ? 'bg-green-600 text-white border-green-600 cursor-default' 
                            : 'text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white'}`}
                      >
                        {appliedCoupon?.code === coupon.code ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )}
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
                  <span className="font-semibold">₹{(calculateSubtotal()).toLocaleString('en-IN')}</span>
                </div>

                {calculateSavings() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Product Discount</span>
                    <span className="font-semibold">-₹{(calculateSavings()).toLocaleString('en-IN')}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-₹{(calculateDiscount()).toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Tax (GST)</span>
                  <span className="font-semibold">
                    ₹{(calculateTax()).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center">
                    Shipping
                    {calculateShipping() === 0 && (
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">FREE</span>
                    )}
                  </span>
                  <span className="font-semibold">
                    {calculateShipping() === 0 ? 'FREE' : `₹${(calculateShipping()).toLocaleString('en-IN')}`}
                  </span>
                </div>

                {calculateShipping() > 0 && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Add ₹{(10000 - calculateSubtotal()).toLocaleString('en-IN')} more to get FREE shipping
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 text-xl">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="font-bold text-gray-900">₹{(calculateTotal()).toLocaleString('en-IN')}</span>
              </div>

              {calculateSavings() + calculateDiscount() > 0 && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg text-center">
                  <p className="text-green-700 font-semibold">
                    You're saving ₹{(calculateSavings() + calculateDiscount()).toLocaleString('en-IN')} on this order! 🎉
                  </p>
                </div>
              )}

              {/* Checkout */}
              {!showCheckout && (
                <a href="/checkout" className="w-full inline-flex bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors items-center justify-center space-x-2 mb-4">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              )}

              {showCheckout && (
                <div className="mb-6 p-4 border rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Shipping Address</label>
                    <select value={shippingAddressId} onChange={(e) => setShippingAddressId(e.target.value)} className="w-full border rounded-lg px-3 py-2">
                      <option value="">Select address</option>
                      {addresses.map(a => (
                        <option key={a.id} value={a.id}>{a.name} • {a.address_line1}, {a.city} {a.pincode}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Billing Address</label>
                    <select value={billingAddressId} onChange={(e) => setBillingAddressId(e.target.value)} className="w-full border rounded-lg px-3 py-2">
                      <option value="">Select address</option>
                      {addresses.map(a => (
                        <option key={a.id} value={a.id}>{a.name} • {a.address_line1}, {a.city} {a.pincode}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Payment Method</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border rounded-lg px-3 py-2">
                      <option value="cash_on_delivery">Cash on Delivery</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Notes</label>
                    <textarea value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} rows="2" className="w-full border rounded-lg px-3 py-2" placeholder="Delivery instructions" />
                  </div>
                  {appliedCoupon?.code && (
                    <div className="text-sm text-green-700">Offer code applied: <span className="font-semibold">{appliedCoupon.code}</span></div>
                  )}
                  <div className="flex gap-2">
                    <button onClick={handleCheckout} className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800">Place Order</button>
                    <button onClick={() => setShowCheckout(false)} className="px-4 py-3 border rounded-lg">Cancel</button>
                  </div>
                </div>
              )}

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