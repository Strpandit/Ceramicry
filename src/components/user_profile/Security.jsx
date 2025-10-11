import React, { useState} from 'react'
import { Lock, Eye, EyeOff, Shield, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
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
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          <CheckCircle className="w-5 h-5" />
          <span>{successMessage}</span>
          </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Settings</h2>
        <p className="text-gray-600">Manage your account security and privacy</p>
      </div>

      <div className="space-y-6">
        {/* Change Password Section */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
                <Shield className="w-6 h-6 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Password</h3>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
            </div>
            <button
              onClick={() => setShowPasswordFields(!showPasswordFields)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl transition-colors shadow-lg hover:shadow-xl  font-medium"
            >
              {showPasswordFields ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showPasswordFields && (
            <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">

              {errors.length > 0 && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700">
                  {errors.map((err, idx) => (
                    <p key={idx} className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{err}</span>
                    </p>
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

              <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-6 rounded-2xl border border-rose-100">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-rose-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-700 font-semibold mb-3">Password Requirements:</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                        <span>At least 8 characters long</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                        <span>Contains at least one number</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                        <span>Contains at least one special character</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
                        <span>Contains uppercase and lowercase letters</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <button 
                onClick={changePass}
                disabled={loading}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-md shadow-lg hover:shadow-xl">
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <HelpCircle className="w-7 h-7 text-rose-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Need Help?</h3>
                <p className="text-sm text-gray-600">
                  If you're having trouble changing your password, our support team is here to help
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl font-medium">
              Contact Support
            </button>
          </div>
        </div>

        {/* Delete Account */}
        <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-6">
          <div className="flex items-center space-x-4 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-1">Delete Account</h3>
              <p className="text-sm text-red-700">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-red-500 text-white rounded-xl shadow-lg hover:shadow-xl font-medium">
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Security;