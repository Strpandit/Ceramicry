import React, { useState} from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react';
import api from "../Api";

const Security = () => {

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePass = async () => {
    setLoading(true);
    setErrors([]);
    setSuccessMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrors(["All fields are required"]);
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors(["Passwords do not match"]);
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await api.post('change_password', {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        { headers: { Token: `Bearer ${token}` } });

        if (response.data.status === 200) {
        setSuccessMessage(response.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordFields(false);
        setTimeout(() => setSuccessMessage(""), 5000);
      }

    } catch (err) {
        if (err.response?.data?.errors) {
        setErrors(Array.isArray(err.response.data.errors) ? err.response.data.errors : [err.response.data.errors]);
      } else {
        setErrors(['Something went wrong. Please try again.']);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>
      )}

      <div className="space-y-6">
        {/* Change Password Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Password</h3>
              <p className="text-sm text-gray-600">Last changed 2 months ago</p>
            </div>
            <button
              onClick={() => setShowPasswordFields(!showPasswordFields)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {showPasswordFields ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showPasswordFields && (
            <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">

              {errors.length > 0 && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg">
                  {errors.map((err, idx) => (
                    <p key={idx}>{err}</p>
                  ))}
                </div>
              )}

              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">Current Password</label>
                <Lock className="absolute left-3 top-11 text-gray-400 w-5 h-5" />
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-11 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">New Password</label>
                <Lock className="absolute left-3 top-11 text-gray-400 w-5 h-5" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-11 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="relative">
                <label className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                <Lock className="absolute left-3 top-11 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-medium mb-2">Password Requirements:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Contains at least one of each (number, special character, uppercase & lowercase letters)</li>
                </ul>
              </div>

              <button 
                onClick={changePass}
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold">
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          )}
        </div>

        {/* Delete Account */}
        <div className="border border-red-200 rounded-lg p-6 bg-red-50">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Delete Account</h3>
          <p className="text-sm text-red-700 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Security;