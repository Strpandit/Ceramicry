import React from 'react';
import { XCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PaymentFailed() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Failed
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your payment could not be processed at this time.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Common reasons for failure:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Insufficient funds in your account</li>
              <li>• Incorrect card details entered</li>
              <li>• Card expired or blocked</li>
              <li>• Bank security restrictions</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <button
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
            
            <button 
              onClick={() => navigate("/")}
              className="w-full text-gray-600 py-3 rounded-lg font-semibold hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Need help? <a href="/contact" className="text-red-600 hover:underline">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}