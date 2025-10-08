import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Check, X, ArrowLeft, Shield, AlertCircle } from 'lucide-react';

const ChangePassPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const passwordRequirements = [
    {
      id: 'length',
      label: 'At least 8 characters long',
      test: (password) => password.length >= 8
    },
    {
      id: 'uppercase',
      label: 'Contains at least one uppercase letter',
      test: (password) => /[A-Z]/.test(password)
    },
    {
      id: 'lowercase',
      label: 'Contains at least one lowercase letter',
      test: (password) => /[a-z]/.test(password)
    },
    {
      id: 'number',
      label: 'Contains at least one number',
      test: (password) => /[0-9]/.test(password)
    },
    {
      id: 'special',
      label: 'Contains at least one special character (!@#$%^&*)',
      test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if current password is entered
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    // Check if new password is entered
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else {
      // Check all password requirements
      const failedRequirements = passwordRequirements.filter(
        req => !req.test(formData.newPassword)
      );
      
      if (failedRequirements.length > 0) {
        newErrors.newPassword = 'Password does not meet all requirements';
      }

      // Check if new password is same as current
      if (formData.newPassword === formData.currentPassword) {
        newErrors.newPassword = 'New password must be different from current password';
      }
    }

    // Check if passwords match
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        
        // Reset form
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  const getRequirementStatus = (requirement) => {
    if (!formData.newPassword) return null;
    return requirement.test(formData.newPassword);
  };

  const passwordStrength = () => {
    const password = formData.newPassword;
    if (!password) return { label: '', color: '', width: 0 };

    const passedRequirements = passwordRequirements.filter(req => req.test(password)).length;
    const percentage = (passedRequirements / passwordRequirements.length) * 100;

    if (percentage < 40) {
      return { label: 'Weak', color: 'bg-red-500', width: percentage };
    } else if (percentage < 80) {
      return { label: 'Medium', color: 'bg-yellow-500', width: percentage };
    } else {
      return { label: 'Strong', color: 'bg-green-500', width: percentage };
    }
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
              <p className="text-gray-600">Update your account password</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 mb-1">Password Changed Successfully!</h3>
              <p className="text-green-700 text-sm">
                Your password has been updated. Please use your new password for future logins.
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="flex-shrink-0 text-green-600 hover:text-green-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
                    <p className="text-sm text-gray-600">Keep your account secure with a strong password</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Enter your current password"
                      className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all ${
                        errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter your new password"
                      className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all ${
                        errors.newPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.newPassword && (
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Password Strength:</span>
                        <span className={`text-sm font-semibold ${
                          strength.label === 'Weak' ? 'text-red-600' :
                          strength.label === 'Medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {strength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
                          style={{ width: `${strength.width}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {errors.newPassword && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-900 font-semibold mb-2">
                    Confirm New Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your new password"
                      className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                  {!errors.confirmPassword && formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                    <p className="mt-2 text-sm text-green-600 flex items-center">
                      <Check className="w-4 h-4 mr-1" />
                      Passwords match
                    </p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Updating Password...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Update Password
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Requirements & Tips */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-6">
              
              {/* Password Requirements */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Password Requirements
                </h3>
                <div className="space-y-3">
                  {passwordRequirements.map((requirement) => {
                    const status = getRequirementStatus(requirement);
                    return (
                      <div
                        key={requirement.id}
                        className={`flex items-start space-x-2 text-sm transition-colors ${
                          status === null
                            ? 'text-gray-600'
                            : status
                            ? 'text-green-600'
                            : 'text-red-500'
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {status === null ? (
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                          ) : status ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
                        </div>
                        <span>{requirement.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Security Tips */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Security Tips</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Use a unique password that you don't use for other websites</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Avoid using personal information like birthdays or names</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Consider using a password manager to generate and store strong passwords</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Change your password regularly for better security</p>
                  </div>
                </div>
              </div>

              {/* Additional Security */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Additional Security</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Enable two-factor authentication for an extra layer of security
                </p>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                  Enable 2FA
                </button>
              </div>

              {/* Help Section */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you're having trouble changing your password, our support team is here to help
                </p>
                <button className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm">
                  Contact Support
                </button>
              </div>

              {/* Last Updated */}
              <div className="pt-6 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Last Password Change</p>
                  <p className="text-sm font-medium text-gray-900">2 months ago</p>
                  <p className="text-xs text-gray-500 mt-1">September 28, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• After changing your password, you will remain logged in on this device</li>
                <li>• You will be logged out from all other devices for security reasons</li>
                <li>• Make sure to remember your new password or save it in a secure location</li>
                <li>• If you forget your password, you can reset it using the "Forgot Password" option on the login page</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassPage;