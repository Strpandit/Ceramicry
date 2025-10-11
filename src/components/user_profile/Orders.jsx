import React from "react";
import { ChevronRight, Package, Truck, CheckCircle, Clock, Eye, Download } from "lucide-react";

const Orders = ({ orders }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800 border-green-200";
      case "Processing": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Shipped": return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Transit": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered": return <CheckCircle className="w-4 h-4" />;
      case "Processing": return <Clock className="w-4 h-4" />;
      case "Shipped": return <Truck className="w-4 h-4" />;
      case "In Transit": return <Truck className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h2>
        <p className="text-gray-600">Track and manage your recent orders</p>
      </div>

      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-blue-900">{orders.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 font-medium">Delivered</p>
              <p className="text-2xl font-bold text-green-900">
                {orders.filter(o => o.status === 'Delivered').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 font-medium">Processing</p>
              <p className="text-2xl font-bold text-yellow-900">
                {orders.filter(o => o.status === 'Processing').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 font-medium">In Transit</p>
              <p className="text-2xl font-bold text-purple-900">
                {orders.filter(o => o.status === 'In Transit').length}
              </p>
            </div>
            <Truck className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Order {order.id}</h3>
                  <p className="text-gray-600">
                    Placed on {new Date(order.date).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span>{order.status}</span>
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-3 mb-6">
              {order.products.map((product, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatPrice(product.price * product.quantity)}</p>
                    <p className="text-sm text-gray-600">{formatPrice(product.price)} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{order.items}</span> {order.items === 1 ? 'item' : 'items'}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(order.total)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Invoice</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600 mb-6">Your order history will appear here once you make your first purchase.</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;