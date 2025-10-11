import React, { useState } from "react";
import { HomeIcon, X, Edit3, Trash2, MapPin, CheckCircle } from "lucide-react";
import api from "../Api";

const Addresses = ({ profileData, fetchProfile, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    address_type: "",
    is_default: false,
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Open modal for adding a new address
  const openAddModal = () => {
    setFormData({
      name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      address_type: "",
      is_default: false,
    });
    setEditingId(null);
    setErrors([]);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing address
  const openEditModal = (address) => {
    setFormData({ ...address });
    setEditingId(address.id);
    setErrors([]);
    setIsModalOpen(true);
  };

  const handleDeleteAddress = async (addressId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(
        `accounts/${userId}/addresses/${addressId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchProfile();
      setSuccessMessage(response?.data?.message || "Address deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      setErrors(error.response?.data?.errors || ["Something went wrong"]);
    } finally {
      setLoading(false);
    }
  };

  // Save or update address
  const handleSaveAddress = async () => {
    setLoading(true);
    setErrors([]);
    try {
      const token = localStorage.getItem("token"); 

      let response;
      if (editingId) {
        response = await api.put(
          `accounts/${userId}/addresses/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await api.post(
          `accounts/${userId}/addresses`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      await fetchProfile();
      setIsModalOpen(false);
      setEditingId(null);
      setSuccessMessage(response.data.message || "Action completed successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
      setFormData({
        name: "",
        phone: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        address_type: "",
        is_default: false,
      });
    } catch (error) {
      setErrors(error.response?.data?.errors || ["Something went wrong"]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Saved Addresses</h2>
          <p className="text-gray-600">Manage your delivery addresses</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          <HomeIcon className="w-5 h-5" />
          <span className="font-medium">Add New Address</span>
        </button>
      </div>

      {/* Addresses Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {profileData?.addresses?.length > 0 ? (
          profileData.addresses.map((address) => (
          <div key={address.id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group relative">
            {address.is_default && (
              <div className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-semibold rounded-full border border-green-200">
                <CheckCircle className="w-4 h-4" />
                <span>Default</span>
              </div>
            )}
            
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{address.address_type}</h3>
                <p className="font-semibold text-gray-900 text-lg">{address.name}</p>
                <p className="text-gray-600">{address.phone}</p>
              </div>
            </div>

            <div className="text-gray-700 mb-6 space-y-1">
              <p className="font-medium">{address.address_line1}</p>
              {address.address_line2 && <p>{address.address_line2}</p>}
              <p className="text-gray-600">{address.city}, {address.state} {address.pincode}</p>
              <p className="text-gray-600">{address.country}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button 
                onClick={() => openEditModal(address)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium">
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No addresses saved</h3>
          <p className="text-gray-600 mb-6">Add your first delivery address to get started.</p>
          <button 
            onClick={openAddModal}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Add Your First Address
          </button>
        </div>
      )}
      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingId ? "Edit Address" : "Add New Address"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="max-h-[60vh] overflow-y-auto px-6 py-6">
                <div className="space-y-4">
                  {["name", "phone", "address_line1", "address_line2", "city", "state", "pincode", "country", "address_type"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                        {field.replace("_", " ")}
                      </label>
                      <input
                        type="text"
                        name={field}
                        placeholder={field.replace("_", " ")}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                      />
                    </div>
                  ))}

                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
                    <input
                      type="checkbox"
                      name="is_default"
                      checked={formData.is_default}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <span className="text-sm font-medium text-gray-700">Set as default address</span>
                  </div>
                </div>

                {/* Error Messages */}
                {errors.length > 0 && (
                  <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
                    {errors.map((err, idx) => (
                      <p key={idx} className="flex items-center space-x-2 text-sm text-red-700">
                        <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        <span>{err}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAddress}
                  disabled={loading}
                  className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                >
                  {loading ? "Saving..." : editingId ? "Update Address" : "Save Address"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Addresses;
