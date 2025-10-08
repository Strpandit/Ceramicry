import React from 'react';
import { ArrowLeft, Package, CheckCircle, MapPin, CreditCard, Download, Phone, Mail } from 'lucide-react';

const OrderDetails = () => {
  // const [showInvoice, setShowInvoice] = useState(false);

  const order = {
    id: 'ORD-2025-001',
    orderNumber: '#12345678',
    date: '2025-09-25',
    status: 'Delivered',
    deliveryDate: '2025-09-28',
    trackingId: 'TRK1234567890',
    items: [
      {
        id: 1,
        name: 'Classic White Dinner Set',
        image: '🍽️',
        quantity: 1,
        price: 12499,
        pieces: 24,
        material: 'Porcelain'
      },
      {
        id: 2,
        name: 'Elegant Tea Set Collection',
        image: '☕',
        quantity: 2,
        price: 7499,
        pieces: 12,
        material: 'Ceramic'
      }
    ],
    pricing: {
      subtotal: 27497,
      discount: 2750,
      shipping: 0,
      tax: 2200,
      total: 26947
    },
    shippingAddress: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      addressLine1: '123, MG Road',
      addressLine2: 'Near City Mall',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452001',
      country: 'India'
    },
    billingAddress: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      addressLine1: '123, MG Road',
      addressLine2: 'Near City Mall',
      city: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452001',
      country: 'India'
    },
    payment: {
      method: 'UPI',
      details: 'rajesh@paytm',
      transactionId: 'TXN123456789',
      status: 'Paid'
    },
    timeline: [
      {
        status: 'Order Placed',
        date: '2025-09-25',
        time: '10:30 AM',
        completed: true,
        description: 'Your order has been placed successfully'
      },
      {
        status: 'Order Confirmed',
        date: '2025-09-25',
        time: '11:15 AM',
        completed: true,
        description: 'Your order has been confirmed by the seller'
      },
      {
        status: 'Shipped',
        date: '2025-09-26',
        time: '02:45 PM',
        completed: true,
        description: 'Your order has been shipped'
      },
      {
        status: 'Out for Delivery',
        date: '2025-09-28',
        time: '09:00 AM',
        completed: true,
        description: 'Your order is out for delivery'
      },
      {
        status: 'Delivered',
        date: '2025-09-28',
        time: '03:30 PM',
        completed: true,
        description: 'Your order has been delivered successfully'
      }
    ]
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-700';
      case 'Shipped':
        return 'bg-purple-100 text-purple-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                <p className="text-gray-600">Order {order.orderNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download Invoice</span>
              </button>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h2>
              <div className="relative">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4 pb-8 last:pb-0 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {event.completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className={`w-0.5 h-full mt-2 ${
                          event.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900">{event.status}</h3>
                        <div className="text-sm text-gray-600">
                          {formatDate(event.date)} • {event.time}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {order.trackingId && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Tracking ID</p>
                      <p className="font-mono font-semibold text-gray-900">{order.trackingId}</p>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                      Track Shipment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-24 h-24 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-5xl">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.pieces} Pieces • {item.material}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Quantity: {item.quantity}</span>
                        <span className="text-xl font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Shipping Address
              </h2>
              <div className="text-gray-700">
                <p className="font-semibold text-gray-900 mb-1">{order.shippingAddress.name}</p>
                <p className="mb-1">{order.shippingAddress.phone}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                <p>{order.shippingAddress.addressLine2}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Billing Address
              </h2>
              <div className="text-gray-700">
                <p className="font-semibold text-gray-900 mb-1">{order.billingAddress.name}</p>
                <p className="mb-1">{order.billingAddress.phone}</p>
                <p>{order.billingAddress.addressLine1}</p>
                <p>{order.billingAddress.addressLine2}</p>
                <p>
                  {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.pincode}
                </p>
                <p>{order.billingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-6">
              
              {/* Order Summary */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatPrice(order.pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatPrice(order.pricing.discount)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {order.pricing.shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        formatPrice(order.pricing.shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (GST)</span>
                    <span className="font-semibold">{formatPrice(order.pricing.tax)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total Paid</span>
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(order.pricing.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method</span>
                    <span className="font-medium text-gray-900">{order.payment.method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Details</span>
                    <span className="font-medium text-gray-900">{order.payment.details}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID</span>
                    <span className="font-mono text-xs font-medium text-gray-900">
                      {order.payment.transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      {order.payment.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-medium text-gray-900">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span className="font-medium text-gray-900">{formatDate(order.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Date</span>
                    <span className="font-medium text-gray-900">{formatDate(order.deliveryDate)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-200 space-y-3">
                <button className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                  Reorder Items
                </button>
                <button className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Need Help?
                </button>
              </div>

              {/* Support Info */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Need Assistance?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>+91 1800-123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>support@ceramicry.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;