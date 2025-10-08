import React, { useState, useEffect, useCallback } from 'react';
import api from "../components/Api";
import { useNavigate } from "react-router-dom";
import Profile from "../components/user_profile/Profile";
import Orders from "../components/user_profile/Orders";
import Addresses from "../components/user_profile/Addresses";
import Payments from "../components/user_profile/Payments";
import Notifications from "../components/user_profile/Notifications"
import Security from '../components/user_profile/Security';
import { User, Package, MapPin, CreditCard, Bell, Lock, LogOut } from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem("activeTab") || "profile";
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    id: null,
    status: null,
    addresses: []
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  
  useEffect(() => {
    if (!token || !userId) {
      navigate("/login");
      return;
    }
  }, [token, userId, navigate]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  }, [navigate]);

  const fetchProfile = useCallback(async () => {
    if (!token || !userId) return;

    try {
      setLoading(true);
      setError("");

      const response = await api.get(`accounts/${userId}`);
      const user = response.data.data;

      setProfileData({
        fullName: user.full_name || "",
        email: user.email || "",
        phone: user.mobile || "",
        id: user.id,
        status: user.status,
        addresses: user.addresses || []
      });

    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
        return;
      } else {
        setError("Failed to load profile data");
      }
    } finally {
      setLoading(false);
    }
  }, [token, userId, handleLogout]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updatedData) => {
    try {
      setLoading(true);
      
      await api.put(`accounts/${userId}`, {
        full_name: updatedData.fullName,
        mobile: updatedData.phone,
        email: updatedData.email,
      });

      // Update local state
      setProfileData(prev => ({
        ...prev,
        ...updatedData
      }));
      return { success: true };

    } catch (err) {
      return { success: false, message: err.response?.data?.errors || "Failed to update profile" };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrders([
        {
          id: 'ORD-2025-001',
          date: '2025-09-25',
          status: 'Delivered',
          items: 3,
          total: 27497,
          products: [
            { name: 'Classic White Dinner Set', quantity: 1, price: 12499 },
            { name: 'Elegant Tea Set', quantity: 2, price: 7499 }
          ]
        },
        {
          id: 'ORD-2025-002',
          date: '2025-09-20',
          status: 'In Transit',
          items: 2,
          total: 13398,
          products: [
            { name: 'Crystal Wine Glass Set', quantity: 2, price: 6699 }
          ]
        },
        {
          id: 'ORD-2025-003',
          date: '2025-09-15',
          status: 'Processing',
          items: 1,
          total: 10799,
          products: [
            { name: 'Premium Cutlery Collection', quantity: 1, price: 10799 }
          ]
        } ]);
      }catch (err) {
            console.error("Orders fetch error:", err);
            // Handle orders fetch error if needed
          }
        };

        if (token && userId) {
          fetchOrders();
        }
      }, [token, userId]);

  const tabs = [
    { id: 'profile', name: 'My Profile', icon: User },
    { id: 'orders', name: 'My Orders', icon: Package },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'payment', name: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Lock }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (token || userId) {
      sessionStorage.setItem("activeTab", tabId);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <Profile
            profileData={profileData}
            setProfileData={setProfileData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            updateProfile={updateProfile}
            loading={loading}
          />
        );
      case "orders":
        return <Orders orders={orders} loading={loading} />;
      case "addresses":
        return <Addresses profileData={profileData} fetchProfile={fetchProfile} userId={userId} />;
      case "payment":
        return <Payments userId={userId} />;
      case "notifications":
        return <Notifications userId={userId} />;
      case "security":
        return <Security userId={userId} />;
      default:
        return null;
    }
  };

  if (loading && !profileData.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profileData.id) {
    return (
      navigate('/login')
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-3xl">
                <User />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profileData.fullName || 'User'}
                </h1>
                <p className="text-gray-600">{profileData.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                        activeTab === tab.id
                          ? 'bg-amber-900 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;