import React, { useState, useEffect, useCallback } from 'react';
import api from "../components/Api";
import { useNavigate } from "react-router-dom";
import Profile from "../components/user_profile/Profile";
import Orders from "../components/user_profile/Orders";
import Addresses from "../components/user_profile/Addresses";
import Security from '../components/user_profile/Security';
import { User, Package, MapPin, LogOut, Shield, Calendar } from 'lucide-react';

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
    addresses: [],
    created_at: null,
    updated_at: null
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
        addresses: user.addresses || [],
        created_at: user.created_at,
        updated_at: user.updated_at
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
    { id: 'profile', name: 'Profile', icon: User, color: 'from-rose-500 to-amber-500' },
    { id: 'orders', name: 'Orders', icon: Package, color: 'from-rose-500 to-amber-500' },
    { id: 'addresses', name: 'Addresses', icon: MapPin, color: 'from-rose-500 to-amber-500' },
    { id: 'security', name: 'Security', icon: Shield, color: 'from-rose-500 to-amber-500' }
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
            fetchProfile={fetchProfile}
            userId={userId}
          />
        );
      case "orders":
        return <Orders orders={orders} loading={loading} />;
      case "addresses":
        return <Addresses profileData={profileData} fetchProfile={fetchProfile} userId={userId} />;
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
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mx-auto mb-6"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading your profile</h3>
          <p className="text-gray-600">Please wait while we fetch your information...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-md"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* User Info */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl text-white border-2 border-white/20">
                    <User className="w-10 h-10" />
                  </div>
                  {profileData.status && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {profileData.fullName || 'User'}
                  </h1>
                  <p className="text-white/80 text-md">{profileData.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1 text-white/70">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Member since {profileData.created_at ? new Date(profileData.created_at).getFullYear() : '2025'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-red-500 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Desktop Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg transform scale-105'
                          : 'text-gray-700 hover:bg-gray-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-4 px-4 py-2">
                        <div className={`p-2 rounded-lg transition-colors duration-200 ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'bg-gray-100 group-hover:bg-gray-200'
                        }`}>
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{tab.name}</div>
                        </div>
                      </div>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-amber-500 opacity-10"></div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-4 lg:p-8">
                {renderTabContent()}
              </div>
            </div>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50">
          <div className="grid grid-cols-4 gap-1 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
                    {tab.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Bottom Spacer */}
        <div className="lg:hidden h-20"></div>
      </div>
    </div>
  );
};

export default UserProfile;