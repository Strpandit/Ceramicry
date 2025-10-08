import React from "react";
import { ChevronRight } from "lucide-react";

const Orders = ({ orders }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Order {order.id}</h3>
                <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {order.products.map((product, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-700">{product.name} × {product.quantity}</span>
                  <span className="text-gray-900 font-medium">{formatPrice(product.price * product.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {order.items} {order.items === 1 ? 'item' : 'items'}
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xl font-bold text-gray-900">{formatPrice(order.total)}</p>
                </div>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;