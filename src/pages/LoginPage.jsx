import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../components/Api"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    rememberMe: false,
    agreeTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      let response, token, user;

      if (isLogin) {

        response = await api.post('login', {
          email: formData.email,
          password: formData.password
        });

        token = response.data.token;
        user = {
          id: response.data.id,
          full_name: response.data.name
        }
      } else {

        if (formData.password !== formData.password_confirmation) {
          setError(['Passwords do not match']);
          setLoading(false);
          return;
        }

        response = await api.post('signup', {
          account: {
            full_name: formData.full_name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation
          }
        });

        token = response.data.token;
        user = { 
          id: response.data.account.id, 
          full_name: response.data.account.full_name 
        };
      }

      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(user));

      navigate('/user-profile');
    } catch (err) {
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        setError(err.response.data.errors);
      } else {
        setError(['Something went wrong. Please try again.']);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      full_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      rememberMe: false,
      agreeTerms: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          
          {/* Left Side - Branding */}
          <div className="hidden lg:flex bg-gradient-to-br from-gray-900 to-gray-800 p-12 flex flex-col justify-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Ceramicry</h1>
                <div className="w-20 h-1 bg-white"></div>
              </div>
              
              <h2 className="text-3xl font-bold mb-6">
                {isLogin ? 'Welcome Back!' : 'Join Our Family'}
              </h2>
              
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {isLogin 
                  ? 'Sign in to access your account and continue your journey with premium crockery collections.'
                  : 'Create an account to discover our curated collection of premium dinnerware and start creating memorable dining experiences.'
                }
              </p>
              
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Premium Quality Products</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Fast & Secure Delivery</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            <div className="absolute bottom-10 right-20 w-20 h-20 bg-white opacity-5 rounded-full"></div>
            <div className="absolute top-1/2 -right-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>
          </div>

          {/* Right Side - Form */}
          <div className="p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </h3>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Enter your credentials to access your account' 
                    : 'Fill your information to get started'
                  }
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Fields - Only for Signup */}
                {!isLogin && (
                  <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="full_name"
                        placeholder="Str Pandit"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        required={!isLogin}
                      />
                  </div>
                )}

                {/* Email Field */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="str@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Confirm Password - Only for Signup */}
                {!isLogin && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="password_confirmation"
                      placeholder="••••••••"
                      value={formData.password_confirmation}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required={!isLogin}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                )}

                {/* Remember Me / Terms */}
                <div className="flex items-center justify-between">
                  {isLogin ? (
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                  ) : (
                    <label className="flex items-start space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="w-4 h-4 mt-0.5 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                        required={!isLogin}
                      />
                      <span className="text-sm text-gray-600">
                        I agree to the <a href="/login" className="text-gray-900 underline hover:text-gray-700">Terms of Service</a> and <a href="/login" className="text-gray-900 underline hover:text-gray-700">Privacy Policy</a>
                      </span>
                    </label>
                  )}
                  
                  {isLogin && (
                    <a href="/login" className="text-sm text-gray-600 hover:text-gray-900 underline">
                      Forgot Password?
                    </a>
                  )}
                </div>

                {error.length > 0 && (
                  <div className="text-red-500 mt-2 text-sm">
                      {error.map((errMsg, index) => (
                        <p key={index}>{errMsg}</p>
                      ))}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <span>{loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}</span>
                  {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>

                {/* Toggle Mode */}
                <div className="text-center mt-6">
                  <span className="text-gray-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-gray-900 font-semibold hover:underline"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;