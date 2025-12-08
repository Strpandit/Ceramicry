import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import api from "../components/Api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  // OTP Popup States
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Send OTP
  const sendOTP = async () => {
    if (!email) {
      toast.error("Email required");
      return;
    }

    if (attempts >= 5 && timer > 0) {
      toast.error("Max attempts reached. Try again after 5 minutes.");
      return;
    }
    setSendingOtp(true);
    
    try {
      await api.post("/forgot_password", { email });
      toast.success("OTP sent!");
      
      setAttempts((prev) => prev + 1);
      setTimer(attempts + 1 >= 5 ? 300 : 60);
      setOtp(new Array(6).fill(""));
      setShowOtpPopup(true);

      setTimeout(() => {
        if (inputRefs.current[0]) inputRefs.current[0].focus();
      }, 100);

    } catch (error) {
      toast.error(error?.response?.data?.errors || "Error sending OTP");
    } finally {
      setSendingOtp(false); 
    }
  };

  // OTP Input Logic
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Enter 6-digit OTP");
      return;
    }

    setVerifyingOtp(true);

    try {
      await api.post("/otp_confirmation", { email, otp: enteredOtp });

      toast.success("OTP verified successfully");
      navigate("/reset-password", { state: { email } });

    } catch {
      toast.error("Invalid OTP");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Resend OTP from popup
  const resendOtp = async () => {
    sendOTP();
  };

  return (
    <>
      <Toaster />

      <div className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendOTP}
          disabled={sendingOtp || (timer > 0 && attempts >= 5)}
          className={`w-full p-3 rounded text-white ${
            sendingOtp
              ? "bg-gray-500 cursor-not-allowed"
              : timer > 0 && attempts >= 5
              ? "bg-gray-400"
              : "bg-blue-600"
          }`}
        >
          {sendingOtp
            ? "Sending..."
            : attempts >= 5 && timer > 0
            ? `Try again in ${timer}s`
            : timer > 0
            ? `Resend in ${timer}s`
            : "Send OTP"}
        </button>
      </div>

      {/* OTP POPUP */}
      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md text-center">

            <h2 className="text-2xl font-semibold mb-2">Enter OTP</h2>
            <p className="text-gray-500 mb-6">
              OTP sent to <strong>{email}</strong>
            </p>

            {/* OTP BOXES */}
            <div className="flex justify-between mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  className="w-12 h-12 border rounded-lg text-center text-xl font-semibold 
                  focus:border-blue-600 focus:ring-1"
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            {/* TIMER / RESEND */}
            {timer > 0 ? (
              <p className="text-gray-600 mb-4">
                Resend OTP in <strong>{timer}s</strong>
              </p>
            ) : (
              <button onClick={resendOtp} className="text-blue-600 font-medium mb-4">
                {sendingOtp ? "Resending..." : "Resend OTP"}
              </button>
            )}

            {/* VERIFY BUTTON */}
            <button
              onClick={verifyOtp}
              disabled={verifyingOtp}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold"
            >
              {verifyingOtp ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
