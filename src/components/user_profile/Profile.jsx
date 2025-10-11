import React, { useState } from "react";
import { Edit, Mail, Phone, Save } from "lucide-react";
import api from "../Api";

const Profile = ({ profileData, setProfileData, fetchProfile, userId, isEditing, setIsEditing }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSaveProfile = async () => {
    setLoading(true);
    setErrors([]);
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await api.put(
        `accounts/${userId}`,
        {
          full_name: profileData.fullName,
          email: profileData.email,
          mobile: profileData.phone
        },
        { headers: { Token: `Bearer ${token}` } }
      );

      if (fetchProfile) {
        await fetchProfile();
      }

      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);

      if (response.data.status === 200) {
        setProfileData({
          fullName: response.data.data.full_name,
          email: response.data.data.email,
          phone: response.data.data.mobile,
          address: response.data.data.addresses?.length > 0 ? `${response.data.data.addresses[0].flat_no || ""}, ${response.data.data.addresses[0].street_name || ""}, ${response.data.data.addresses[0].city || ""}, ${response.data.data.addresses[0].zipcode || ""}, ${response.data.data.addresses[0].state || ""}, ${response.data.data.addresses[0].country || ""}` : "",
        });
        setIsEditing(false);
      }
    } catch (error) {
      setErrors(error.response?.data?.errors || ["Something went wrong"]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (fetchProfile) await fetchProfile();
    setErrors([]);
    setIsEditing(false);
  };

  return (
    <div>
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 rounded-xl flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 rounded-xl">
          {errors.map((err, idx) => (
            <p key={idx} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>{err}</span>
            </p>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Information</h2>
          <p className="text-gray-600">Manage your personal details and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl"
          >
            <Edit className="w-5 h-5" />
            <span className="font-medium">Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleSaveProfile}
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
            >
              <Save className="w-5 h-5" />
              <span className="font-medium">{loading ? "Saving..." : "Save Changes"}</span>
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Form */}
      <div className="grid md:grid-cols gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-3 text-lg">Full Name</label>
            <input
              type="text"
              value={profileData?.fullName}
              onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
              disabled={!isEditing}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all duration-200 text-lg"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-3 text-lg">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                disabled={!isEditing}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all duration-200 text-lg"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-3 text-lg">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                disabled={!isEditing}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-600 transition-all duration-200 text-lg"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
