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
      <div className="flex items-center justify-between mb-6">
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>
        )}

        {errors.length > 0 && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg">
            {errors.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSaveProfile}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "Saving.." : "Save"}</span>
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={profileData?.fullName}
            onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
            disabled={!isEditing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              disabled={!isEditing}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              disabled={!isEditing}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
