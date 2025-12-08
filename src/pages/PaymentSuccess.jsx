import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle } from 'lucide-react';
import { toast, Toaster } from "react-hot-toast";
import api from "../components/Api";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [status, setStatus] = useState("Verifying...");
  const [searchParams] = useSearchParams();

  const token = localStorage.getItem("token");
  const checkoutToken = searchParams.get("checkoutToken") || searchParams.get("token");
  const orderId =
    searchParams.get("order_id") ||
    searchParams.get("orderNumber") ||
    searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {

      if (!token || !orderId) {
        toast.error("Payment token or order ID missing!");
        setStatus("Failed");
        return;
      }

      try {
        const res = await api.post("payments/cashfree_return",
          {
            order_id: orderId,
            token: checkoutToken,
          },
          { headers: { Token: `Bearer ${token}` } }
        );
        const data = res.data?.data || {};
        if (res.data.success) {
          toast.success("Payment successful!");
          const createdOrderId = res.data.order_id;
          const createdOrderNumber = res.data.order_number;
          const paidAmount = res.data.total_amount;
          setOrderNumber(createdOrderNumber);
          setAmountPaid(paidAmount);
          setStatus("Paid");

          setTimeout(() => navigate(`/orders/${createdOrderId}`), 5000);
        } else {
          toast.error(data.message || "Payment verification failed!");
          setStatus("Failed");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error verifying payment.");
        setStatus("Error");
      }
    };

    verifyPayment();
  }, [token, checkoutToken, orderId, navigate]);

  return (
    <div className="px-4 py-16  text-center bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center min-h-screen">
      <Toaster />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold text-gray-900">{orderNumber}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold text-gray-900">{amountPaid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className={`font-semibold ${String(status).toLowerCase() === "paid" ? "text-green-600" : "text-red-600"}`}>{status}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
      
    </div>
  );
}


