import React, {useState} from "react";
import { Plus, Trash2 } from "lucide-react";

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
      <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
        <Plus className="w-4 h-4" />
        <span>Add Payment Method</span>
      </button>
    </div>

    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <div key={method.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                {method.type === 'UPI' ? '💳' : '🏦'}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{method.type}</h3>
                  {method.isDefault && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{method.details}</p>
                {method.cardType && (
                  <p className="text-sm text-gray-500">
                    {method.cardType} • Expires {method.expiry}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => handleDeletePaymentMethod(method.id)}
              className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)};

export default Payments;
