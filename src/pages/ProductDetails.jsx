import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Share2, Star, Check, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight, Plus, Minus, Package } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import api from "../components/Api";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [newReview, setNewReview] = useState({ title: "", comment: "", rating: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  // const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [error, setError] = useState('')
  const staticImages = ["/img.png", "/img.png", "/img.png", "/img.png"];


  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.pieces_count) {
      setQuantity(newQuantity);
    }
  };

  const ratingDistribution = [
    { stars: 5, percentage: 75 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 7 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try { 
        const res = await api.get(`/products/${slug}`);
        setProduct(res.data.data);
      } catch (err) {
        setError(err.response?.data?.errors || ["Something went wrong"]);
        setProduct(null)
      } finally {
        setLoading(false)
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    const fetchReviews = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get(`products/${product.id}/reviews`,
          { headers: { Token: `Bearer ${token}` } });
          setReviews(response.data.data);
      } catch (error) {
        setError(error.response?.data?.errors || "Error fetching reviews:");
        setReviews([]);
      }
    };
    fetchReviews();
  }, [product]);

  const handleSubmitReview = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await api.post(
        `/products/${product.id}/reviews`,
        { review: newReview },
        { headers: { Token: `Bearer ${token}` } }
      );

      setReviews([res.data.data, ...reviews]);
      setShowReviewPopup(false);
      setNewReview({ title: "", comment: "", rating: 0 });
    } catch (error) {
      setError(error.response?.data?.errors || "Failed to post review");
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="w-full py-20 text-center text-gray-600">Product not found.</div>;
  }

  const variant = product.variants?.[0] || {};
  const price = parseFloat(variant.price || 0);
  const original_price = parseFloat(variant.original_price || 0);
  const inStock = variant.stock_quantity > 0;
  // const gallery = variant.product_images;

  const handleAddToCart = async() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setLoading(true);
    try {
      const variantId = product.variants?.[0]?.id || null;

      await api.post('cart/add_item',
        {
          product_id: product.id,
          variant_id: variantId,
          qty: quantity && quantity > 0 ? quantity : 1,
        },
        { headers: { Token: `Bearer ${token}` } 
      });
    } catch(err) {
      alert(err.response?.data?.errors || "Failed to add item to cart");
    } finally {
      setLoading(false)
      navigate('/cart')
    }
  };

  const handleShare = async () => {
    if (!product) return;

    const productName = product.name;
    const slug = product.slug
    const shareUrl = `https://ceramicry.netlify.app/product/${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: productName, text: product.description, url: shareUrl });
      } catch (error) {
        console.error("Error sharing product:", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        console.log("Product link copied to clipboard!");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {error.length > 0 && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </div>
        )}
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">Home</a>
            <span>/</span>
            <a href="/product" className="hover:text-gray-900">Products</a>
            <span>/</span>
            <a href="/product" className="hover:text-gray-900">{product.subcategory.name}</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          
          {/* Left: Images */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative group">
                <img
                  src={staticImages[selectedImage]}
                  alt={`Product-${selectedImage}`}
                  className="object-cover w-full h-full"
                />
                
                {/* Image Navigation */}
                <button 
                  onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : staticImages.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setSelectedImage(prev => prev < staticImages.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Badges */}
                {product.discount_percentage > 0 && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                    {product.discount_percentage}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {staticImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-4xl transition-all ${
                    selectedImage === index ? 'ring-2 ring-gray-900' : 'hover:ring-2 ring-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Product-thumbnail-${index}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">by {product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.average_rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.average_rating}</span>
              <span className="text-gray-600">({product.review_count} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">₹{price.toFixed(2)}</span>
                {original_price > 0 && (
                  <span className="text-2xl text-gray-400 line-through">₹{original_price.toFixed(2)}</span>
                )}
              </div>
              <p className="text-green-600 font-medium">Save ₹{(original_price - price).toFixed(2)} ({variant.discount_percentage}% off)</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {inStock ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">In Stock ({variant.stock_quantity} available)</span>
                </div>
              ) : (
                <div className="text-red-600 font-medium">Out of Stock</div>
              )}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-gray-600 text-sm">Material</p>
                <p className="font-semibold text-gray-900">{product.material}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Pieces</p>
                <p className="font-semibold text-gray-900">{product.pieces_count} Pieces</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">SKU</p>
                <p className="font-semibold text-gray-900">{product.sku}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Category</p>
                <p className="font-semibold text-gray-900">{product.subcategory.name}</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-3">Quantity</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-gray-600">
                  Total: <span className="font-bold text-gray-900">₹{(price * quantity).toFixed(2)}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button 
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  handleShare();
                }}
                className="p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                <Share2 className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <button className="w-full bg-gray-100 text-gray-900 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors mb-6">
              Buy Now
            </button>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-start space-x-3">
                <Truck className="w-6 h-6 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over ₹10000</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-600">100% protected</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RefreshCw className="w-6 h-6 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Package className="w-6 h-6 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Gift Wrapping</p>
                  <p className="text-sm text-gray-600">Available at checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeTab === 'description' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Description
              {activeTab === 'description' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeTab === 'specifications' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Specifications
              {activeTab === 'specifications' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-semibold transition-colors relative ${
                activeTab === 'reviews' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Reviews ({product.review_count})
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Key Features</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">What's Included</h4>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-3">
                    {product.whats_included.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-start border-b border-gray-200 pb-4">
                    <div className="sm:w-1/3 font-semibold text-gray-900 mb-1 sm:mb-0">{key}:</div>
                    <div className="sm:w-2/3 text-gray-700">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
            {reviews.length > 0 ? (
              <>
              {/* Rating Summary */}
              <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900 mb-2">{product.average_rating}</div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(product.average_rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on {product.review_count} reviews</p>
                </div>

                <div className="space-y-2">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600 w-8">{item.stars} ★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-900">{review.author}</span>
                          {review.verified && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center flex-wrap space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                  </div>
                ))}
              </div>
              </>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 font-medium mb-3">
                    No reviews yet. Be the first to review this product! 📝
                  </p>
                </div>
              )}

              <button 
                onClick={() => setShowReviewPopup(true)}
                className="w-full mt-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                Write a Review
              </button>
            </div>
          )}
        </div>

        {showReviewPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowReviewPopup(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Write a Review</h3>

              {/* Rating Stars */}
              <div className="flex items-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= newReview.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  />
                ))}
              </div>

              <input
                type="text"
                placeholder="Review Title"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-3 mb-4"
              />

              <textarea
                placeholder="Write your review..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32"
              ></textarea>

              <button
                onClick={handleSubmitReview}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </div>
        )}

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staticImages.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item}
                    alt="abcss"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">₹{price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.average_rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;