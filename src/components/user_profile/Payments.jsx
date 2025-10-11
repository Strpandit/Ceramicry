import React, {useState} from "react";
import { Plus, Trash2, CreditCard, Smartphone, CheckCircle } from "lucide-react";

const Payments = () => {

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'UPI',
      details: 'rajesh@paytm',
      isDefault: true
    },
    {
      id: 2,
      type: 'Card',
      details: '**** **** **** 4532',
      cardType: 'Visa',
      expiry: '12/26',
      isDefault: false
    }
  ]);

  const handleDeletePaymentMethod = (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(methods => methods.filter(method => method.id !== id));
    }
  };
  
  return (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Methods</h2>
        <p className="text-gray-600">Manage your payment options</p>
      </div>
      <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl">
        <Plus className="w-4 h-4" />
        <span className="font-medium">Add Payment Method</span>
      </button>
    </div>

    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <div key={method.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                {method.type === 'UPI' ? (
                  <Smartphone className="w-6 h-6 text-blue-600" />
                ) : (
                  <CreditCard className="w-6 h-6 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{method.type}</h3>
                  {method.isDefault && (
                    <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-semibold rounded-full border border-green-200">
                      <CheckCircle className="w-4 h-4" />
                      <span>Default</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 text-sm font-medium">{method.details}</p>
                {method.cardType && (
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {method.cardType}
                    </span>
                    <span className="text-sm text-gray-500">
                      Expires {method.expiry}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => handleDeletePaymentMethod(method.id)}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Empty State */}
    {paymentMethods.length === 0 && (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <CreditCard className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No payment methods</h3>
        <p className="text-gray-600 mb-6">Add a payment method to make checkout faster.</p>
      </div>
    )}
  </div>
)};

export default Payments;
