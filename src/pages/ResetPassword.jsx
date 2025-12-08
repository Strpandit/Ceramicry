import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import api from "../components/Api";

export default function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const email = state?.email;
  if (!email) navigate("/forgot-password");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const resetPassword = async () => {
    if (!password || !confirm) {
      toast.error("All fields required");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.post("/reset_user_password", {
        email,
        new_password: password,
        password_confirmation: confirm,
      });

      toast.success("Password reset successfully!");

      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      toast.error(error?.response?.data?.errors || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        className="w-full p-3 border rounded mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-3 border rounded mb-4"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      <button
        onClick={resetPassword}
        disabled={loading}
        className={`w-full p-3 rounded text-white 
          ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600"}`}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}
