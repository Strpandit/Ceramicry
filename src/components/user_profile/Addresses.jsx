import React, { useState } from "react";
import { HomeIcon, X, Edit3, Trash2 } from "lucide-react";
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
        <button 
          onClick={openAddModal}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
          <HomeIcon className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {profileData?.addresses?.length > 0 ? (
          profileData.addresses.map((address) => (
          <div key={address.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow relative">
            {address.is_default && (
              <span className="absolute top-4 right-4 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                Default
              </span>
            )}
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{address.address_type}</h3>
              <p className="font-medium text-gray-900">{address.name}</p>
              <p className="text-gray-600">{address.phone}</p>
            </div>

            <div className="text-gray-700 mb-4">
              <p>{address.address_line1}</p>
              <p>{address.address_line2}</p>
              <p>{address.city}, {address.state} {address.pincode}</p>
              <p>{address.country}</p>
            </div>

            <div className="flex items-center justify-between">
              <button 
                onClick={() => openEditModal(address)}
                className="flex items-center space-x-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No addresses saved yet.</p>
      )}
      {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 relative animate-fadeIn">
          <div className="flex justify-between items-center border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-4">
              {["name", "phone", "address_line1", "address_line2", "city", "state", "pincode", "country", "address_type"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field.replace("_", " ")}
                  </label>
                  <input
                    type="text"
                    name={field}
                    placeholder={field.replace("_", " ")}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
                  />
                </div>
              ))}

              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  name="is_default"
                  checked={formData.is_default}
                  onChange={handleChange}
                  className="h-4 w-4 text-gray-900 focus:ring-gray-900 rounded"
                />
                <span className="text-sm text-gray-700">Set as default address</span>
              </label>
            </div>

            {errors.length > 0 && (
              <div className="mt-3 p-2 rounded bg-red-50 text-red-600 text-sm">
                {errors.join(", ")}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t px-6 py-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAddress}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : editingId ? "Update Address" : "Save Address"}
            </button>
          </div>
        </div>
      </div>
      )}
      </div>
    </div>
  );
};

export default Addresses;
