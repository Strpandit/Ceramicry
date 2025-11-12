import React, { useEffect, useMemo, useState } from "react";
import api from "../components/Api";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, ClipboardCheck, Plus, X, Home, Briefcase, Check, ArrowRight} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { load } from "@cashfreepayments/cashfree-js";

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [shippingAddressId, setShippingAddressId] = useState("");
  const [billingAddressId, setBillingAddressId] = useState("");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    address_type: "home",
    is_default: false,
  });
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [orderReviewData, setOrderReviewData] = useState(null);
  const [loadingReview, setLoadingReview] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
          navigate("/login");
          return;
        }

        const [profileRes, cartRes] = await Promise.all([
          api.get(`accounts/${userId}`),
          api.get("cart", { headers: { Token: `Bearer ${token}` } }),
        ]);
        const user = profileRes.data?.data;
        const addr = Array.isArray(user?.addresses) ? user.addresses : [];
        setAddresses(addr);

        if (addr.length > 0) {
          const def = addr.find((a) => a.is_default) || addr[0];
          setShippingAddressId(String(def.id));
          setBillingAddressId(String(def.id));
          setSameAsShipping(true);
        }
        const cart = cartRes.data?.data;
        setCartItems(Array.isArray(cart?.cart_items) ? cart.cart_items : []);
      } catch (err) {
        toast.error("Failed to load checkout data");
      }
    };

    init();
  }, [navigate]);

  const appliedCoupon = useMemo(() => {
    try {
      const saved = localStorage.getItem("appliedCoupon");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.product.variants[0].price);

      return sum + price * item.qty;
    }, 0);
  }, [cartItems]);

  const productSavings = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const v = item.product.variants[0];
      const diff = (v.original_price || v.price) - v.price;
      return sum + (diff > 0 ? diff : 0) * item.qty;
    }, 0);
  }, [cartItems]);

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (
      appliedCoupon.finalAmount != null &&
      !isNaN(appliedCoupon.finalAmount)
    ) {
      // Use server-computed finalAmount from offers apply endpoint
      return Math.max(0, subtotal - Number(appliedCoupon.finalAmount));
    }

    if (appliedCoupon.type === "%")
      return (subtotal * appliedCoupon.discount) / 100;

    return parseFloat(appliedCoupon.discount) || 0;
  }, [appliedCoupon, subtotal]);

  const shippingFee = useMemo(() => (subtotal >= 10000 ? 0 : 500), [subtotal]);
  const total = useMemo(() => {
    // If BE finalAmount provided, prefer it for subtotal-after-coupon, then add shipping locally
    const afterCoupon =
      appliedCoupon &&
      appliedCoupon.finalAmount != null &&
      !isNaN(appliedCoupon.finalAmount)
        ? Number(appliedCoupon.finalAmount)
        : subtotal - couponDiscount;

    return afterCoupon + shippingFee;
  }, [appliedCoupon, subtotal, couponDiscount, shippingFee]);

  const canGoNextFromAddress =
    shippingAddressId && (sameAsShipping || billingAddressId);

  useEffect(() => {
    if (!cityName || cityName.length < 3) return;

    const delayDebounce = setTimeout(() => {
      fetchCityInfo(cityName);
    }, 500); // 0.5 sec delay after typing stops

    return () => clearTimeout(delayDebounce);
  }, [cityName]);

  const fetchCityInfo = async (cityName) => {
    try {
      setCityLoading(true);

      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityName}&limit=1`,

        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      const result = await response.json();
      const cityData = result.data?.[0];
      if (cityData) {
        setNewAddress((prev) => ({
          ...prev,
          city: cityData.city,
          state: cityData.region,
          country: cityData.country,
        }));
      }
    } catch (error) {
      console.error("Error fetching city info:", error);
    } finally {
      setCityLoading(false);
    }
  };

  const handleAddAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      await api.post(`accounts/${userId}/addresses`, newAddress, {
        headers: { Token: `Bearer ${token}` },
      });
      toast.success("Address added");
      setShowAddAddress(false);

      const res = await api.get(`accounts/${userId}`);
      const addr = Array.isArray(res.data?.data?.addresses)
        ? res.data.data.addresses
        : [];

      setAddresses(addr);
    } catch (err) {
      toast.error(err.response?.data?.errors || "Failed to add address");
    }
  };

  const handleReviewOrder = async () => {
    try {
      setLoadingReview(true);
      const token = localStorage.getItem("token");
      const reviewBody = {
        shipping_address_id: Number(shippingAddressId),
        billing_address_id: Number(
          sameAsShipping ? shippingAddressId : billingAddressId
        ),
        payment_method: paymentMethod,
        notes: notes || undefined,
        offer_code: appliedCoupon?.code || undefined,
      };

      const res = await api.post("orders/order_review", reviewBody, {
        headers: { Token: `Bearer ${token}` },
      });
      setOrderReviewData(res.data?.data);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.errors || "Failed to review order");
    } finally {
      setLoadingReview(false);
    }
  };

  const placeOrder = async () => {
    try {
      setPlacing(true);
      const token = localStorage.getItem("token");
      const frontBase = window.location.origin;

      if (!paymentMethod) {
        toast.error("Please select a payment method before placing the order");
        setPlacing(false);
        return;
      }

      const body = {
        shipping_address_id: Number(shippingAddressId),
        billing_address_id: Number(
          sameAsShipping ? shippingAddressId : billingAddressId
        ),
        payment_method: paymentMethod,
        notes: notes || undefined,
        offer_code: appliedCoupon?.code || undefined,
        ...(orderReviewData && { review_data: orderReviewData }),
      };

      if (paymentMethod === "online_payment") {
        const amount = orderReviewData?.total_amount ?? total;

        try {
          const payRes = await api.post(
            "orders/checkout",
            {
              ...body,
              amount,
              return_url: `${frontBase}/payment-success`,
            },
            { headers: { Token: `Bearer ${token}` } }
          );

          const payment_session_id = payRes?.data?.data?.payment_session_id;
          const orderNumber = payRes.data.data.order_number;
          const checkoutToken = payRes?.data?.data?.token;
          const modeEnv = (process.env.REACT_APP_CASHFREE_MODE || '').toLowerCase();
          const cfMode = modeEnv === "production" ? "sandbox" : "sandbox";
          const cashfree = await load({ mode: cfMode });

          const checkoutOptions = {
            paymentSessionId: payment_session_id,
            redirectTarget: "_modal",
            style: {
              backgroundColor: "#ffffff",
              color: "#000000",
              fontFamily: "Poppins",
              fontSize: "14px",
            },
          };

          const res = await cashfree.checkout(checkoutOptions);

          if (res.paymentDetails?.paymentMessage === "Payment finished. Check status.") {
            const verify = await api.get(`payments/verify_payment/${orderNumber}`, {
              headers: { Token: `Bearer ${token}` },
            });

            const paymentStatus = verify.data?.order_status || verify.data?.data?.order_status || verify.data?.payment_status;

            if (paymentStatus?.toLowerCase() === "paid" || paymentStatus?.toLowerCase() === "success") {
              navigate(`/payment-success?order_id=${orderNumber}&token=${encodeURIComponent(checkoutToken)}`);
            } else {
              toast.error("Payment failed or not completed.");
            }
          } else {
            toast.error("Payment was cancelled or failed. Please try again.");
          }
        } catch (e) {
          toast.error(e?.response?.data?.errors?.[0] || "Failed to initiate online payment");
        } finally {
          setPlacing(false);
        }
        return;
      }

      if (paymentMethod === "cash_on_delivery") {
        try {
          const res = await api.post("orders/checkout", body, {
            headers: { Token: `Bearer ${token}` },
          });
          const created = res.data?.data;
          toast.success(res.data?.message || "Order placed successfully!");
          navigate(`/orders/${created?.id}`);
        } catch (err) {
          toast.error(err.response?.data?.errors || "Failed to place order");
        } finally {
          setPlacing(false);
        }
      }
    } catch (outerErr) {
      toast.error("Something went wrong while placing your order.");
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Horizontal Stepper */}

        <div className="flex items-center justify-between mb-8">
          <Step active={step >= 1} icon={MapPin} label="Address" />

          <div
            className={`flex-1 h-0.5 mx-2 ${
              step >= 2 ? "bg-gray-900" : "bg-gray-200"
            }`}
          ></div>

          <Step active={step >= 2} icon={CreditCard} label="Payment" />

          <div
            className={`flex-1 h-0.5 mx-2 ${
              step >= 3 ? "bg-gray-900" : "bg-gray-200"
            }`}
          ></div>

          <Step active={step >= 3} icon={ClipboardCheck} label="Review" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Select Address</h2>

                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="px-3 py-2 border rounded-lg flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add New
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-2">Shipping Address</label>

                  <select
                    value={shippingAddressId}
                    onChange={(e) => setShippingAddressId(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Select address</option>

                    {addresses.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} • {a.address_line1}, {a.city} {a.pincode}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="inline-flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                  />

                  <span className="text-sm">
                    Billing address same as shipping
                  </span>
                </label>

                {!sameAsShipping && (
                  <div className="mt-2">
                    <label className="block text-sm mb-2">
                      Billing Address
                    </label>

                    <select
                      value={billingAddressId}
                      onChange={(e) => setBillingAddressId(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="">Select address</option>

                      {addresses.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} • {a.address_line1}, {a.city} {a.pincode}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => navigate("/cart")}
                    className="px-6 py-2 border rounded-lg"
                  >
                    Back
                  </button>

                  <button
                    disabled={!canGoNextFromAddress}
                    onClick={() => setStep(2)}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

                <div className="space-y-3">
                  <label className="flex items-center justify-between border rounded-lg p-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pm"
                        checked={paymentMethod === "cash_on_delivery"}
                        onChange={() => setPaymentMethod("cash_on_delivery")}
                      />

                      <span className="font-medium">Cash on Delivery</span>
                    </div>

                    <Check
                      className={`w-5 h-5 ${
                        paymentMethod === "cash_on_delivery"
                          ? "text-green-600"
                          : "text-gray-300"
                      }`}
                    />
                  </label>

                  <label className="flex items-center justify-between border rounded-lg p-4 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pm"
                        checked={paymentMethod === "online_payment"}
                        onChange={() => setPaymentMethod("online_payment")}
                      />

                      <span className="font-medium">
                        Online Payment (Card/UPI/Netbanking/Wallet)
                      </span>
                    </div>

                    <Check
                      className={`w-5 h-5 ${
                        paymentMethod === "online_payment"
                          ? "text-green-600"
                          : "text-gray-300"
                      }`}
                    />
                  </label>
                </div>

                <div className="mt-6">
                  <label className="block text-sm mb-2">
                    Order Notes (optional)
                  </label>

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="2"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Delivery instructions"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2 border rounded-lg"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleReviewOrder}
                    disabled={loadingReview}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {loadingReview ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Reviewing...
                      </>
                    ) : (
                      "Review"
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Review & Place Order
                </h2>

                {orderReviewData ? (
                  // Show exact data from order_review API
                  <div className="space-y-3">
                    {/* Order Items from API */}
                    {(orderReviewData.order_items || []).map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm border-b py-2"
                      >
                        <div>
                          {item.product_name_with_variant || item.product_name}{" "}
                          × {item.quantity}
                        </div>
                        <div>
                          ₹
                          {parseFloat(item.total_price).toLocaleString("en-IN")}
                        </div>
                      </div>
                    ))}

                    {/* Pricing from API */}
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>
                          ₹
                          {parseFloat(
                            orderReviewData.subtotal || 0
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                      {orderReviewData.discount_amount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount</span>
                          <span>
                            -₹
                            {parseFloat(
                              orderReviewData.discount_amount
                            ).toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>
                          ₹
                          {parseFloat(
                            orderReviewData.tax_amount || 0
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {orderReviewData.shipping_amount === 0
                            ? "FREE"
                            : `₹${parseFloat(
                                orderReviewData.shipping_amount || 0
                              ).toLocaleString("en-IN")}`}
                        </span>
                      </div>
                      <div className="pt-2 border-t flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>
                          ₹
                          {parseFloat(
                            orderReviewData.total_amount || 0
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Fallback to original display if no review data
                  <div className="space-y-3">
                    {cartItems.map((ci) => {
                      const v = ci.product.variants[0];

                      const line = v.price * ci.qty;

                      return (
                        <div
                          key={ci.id}
                          className="flex justify-between text-sm border-b py-2"
                        >
                          <div>
                            {ci.product.name} × {ci.qty}
                          </div>

                          <div>₹{line}</div>
                        </div>
                      );
                    })}

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>

                      {productSavings > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Product Discount</span>
                          <span>-₹{productSavings}</span>
                        </div>
                      )}

                      {appliedCoupon && (
                        <div className="flex justify-between text-green-600">
                          <span>Coupon ({appliedCoupon.code})</span>

                          <span>-₹{couponDiscount}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                        </span>
                      </div>

                      <div className="pt-2 border-t flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 border rounded-lg"
                  >
                    Back
                  </button>

                  <button
                    disabled={placing}
                    onClick={placeOrder}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg disabled:opacity-50"
                  >
                    {placing ? "Placing…" : "Place Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {placing && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <p className="text-lg font-semibold mb-2">Verifying your payment...</p>
                <p className="text-sm text-gray-500">Please do not refresh or close this window.</p>
              </div>
            </div>
          )}

          {/* Sidebar Summary */}

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-2 text-sm">
                {orderReviewData ? (
                  // Show exact data from order_review API
                  <>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>
                        ₹
                        {parseFloat(
                          orderReviewData.subtotal || 0
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                    {orderReviewData.discount_amount > 0 && (
                      <div className="flex justify-between text-green-700">
                        <span>Discount</span>
                        <span>
                          -₹
                          {parseFloat(
                            orderReviewData.discount_amount
                          ).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>
                        ₹
                        {parseFloat(
                          orderReviewData.tax_amount || 0
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {orderReviewData.shipping_amount === 0
                          ? "FREE"
                          : `₹${parseFloat(
                              orderReviewData.shipping_amount || 0
                            ).toLocaleString("en-IN")}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t flex justify-between font-semibold">
                      <span>Total</span>
                      <span>
                        ₹
                        {parseFloat(
                          orderReviewData.total_amount || 0
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </>
                ) : (
                  // Fallback to original calculation
                  <>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-green-700">
                        <span>Coupon</span>
                        <span>-₹{couponDiscount}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                      </span>
                    </div>

                    <div className="pt-2 border-t flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}

      {showAddAddress && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setShowAddAddress(false)}
              className="absolute right-3 top-3 p-2"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold mb-4">Add New Address</h3>

            <div className="grid grid-cols-2 gap-3">
              <input
                className="border rounded px-3 py-2 col-span-2"
                placeholder="Full Name"
                value={newAddress.name}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, name: e.target.value })
                }
              />

              <input
                className="border rounded px-3 py-2 col-span-2"
                placeholder="Phone"
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
              />

              <input
                className="border rounded px-3 py-2 col-span-2"
                placeholder="Address Line 1"
                value={newAddress.address_line1}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    address_line1: e.target.value,
                  })
                }
              />

              <input
                className="border rounded px-3 py-2 col-span-2"
                placeholder="Address Line 2"
                value={newAddress.address_line2}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    address_line2: e.target.value,
                  })
                }
              />

              <div className="relative">
                <input
                  className="border rounded px-3 py-2 w-full"
                  placeholder="City"
                  value={newAddress.city}
                  // onChange={(e) => setCityName(e.target.value)}

                  onChange={(e) => {
                    setNewAddress({ ...newAddress, city: e.target.value });

                    setCityName(e.target.value);
                  }}
                />

                {cityLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
                  </div>
                )}
              </div>

              <input
                className="border rounded px-3 py-2"
                placeholder="State"
                value={newAddress.state || ""}
                readOnly
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
              />

              <input
                className="border rounded px-3 py-2"
                placeholder="Pincode"
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
                }
              />

              <input
                className="border rounded px-3 py-2"
                placeholder="Country"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, country: e.target.value })
                }
              />

              <div className="col-span-2 flex gap-4 mt-2">
                {/* Home Option */}

                <label
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition ${
                    newAddress.address_type === "home"
                      ? "border-gray-900 bg-gray-100"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="address_type"
                    value="home"
                    checked={newAddress.address_type === "home"}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        address_type: e.target.value,
                      })
                    }
                    className="hidden"
                  />

                  <span className="flex items-center gap-1 text-sm">
                    <Home className="w-4 h-4" />
                    Home
                  </span>
                </label>

                {/* Work Option */}

                <label
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition ${
                    newAddress.address_type === "work"
                      ? "border-gray-900 bg-gray-100"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="address_type"
                    value="work"
                    checked={newAddress.address_type === "work"}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        address_type: e.target.value,
                      })
                    }
                    className="hidden"
                  />

                  <span className="flex items-center gap-1 text-sm">
                    <Briefcase className="w-4 h-4" />
                    Work
                  </span>
                </label>

                {/* Other Option */}

                <label
                  className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition ${
                    newAddress.address_type === "other"
                      ? "border-gray-900 bg-gray-100"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="address_type"
                    value="other"
                    checked={newAddress.address_type === "other"}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        address_type: e.target.value,
                      })
                    }
                    className="hidden"
                  />

                  <span className="flex items-center gap-1 text-sm">
                    <MapPin className="w-4 h-4" />
                    Other
                  </span>
                </label>
              </div>

              <label className="col-span-2 inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={newAddress.is_default}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      is_default: e.target.checked,
                    })
                  }
                />

                <span>Set as default</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowAddAddress(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAddAddress}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Step = ({ active, icon: Icon, label }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center ${
        active ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-500"
      }`}
    >
      <Icon className="w-5 h-5" />
    </div>

    <div
      className={`text-sm font-medium ${
        active ? "text-gray-900" : "text-gray-400"
      }`}
    >
      {label}
    </div>
  </div>
);

export default Checkout;
