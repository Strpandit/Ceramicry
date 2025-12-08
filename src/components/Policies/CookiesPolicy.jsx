import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const CookiesPolicy = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false
  });

  const handleToggle = (type) => {
    if (type !== 'essential') {
      setCookiePreferences(prev => ({
        ...prev,
        [type]: !prev[type]
      }));
    }
  };

  const handleSavePreferences = () => {
    toast.success('Your cookie preferences have been saved!');
  };

  const handleAcceptAll = () => {
    setCookiePreferences({
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    });
    toast.success('All cookies accepted!');
  };

  const handleRejectAll = () => {
    setCookiePreferences({
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    });
    toast.success('Optional cookies rejected. Only essential cookies will be used.');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-4xl font-bold text-purple-700 mb-6 pb-4 border-b-4 border-purple-600">
        Cookies Policy
      </h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p className="text-gray-700">
          This Cookies Policy explains how Ceramicry Private Limited uses cookies and similar tracking technologies 
          on www.ceramicry.com in compliance with the Information Technology Act, 2000, IT Rules 2011, and Consumer 
          Protection (E-Commerce) Rules, 2020.
        </p>
      </div>

      {/* What are Cookies */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">1. What Are Cookies?</h2>
        <p className="mb-4 text-gray-700">
          Cookies are small text files stored on your device (computer, smartphone, tablet) when you visit a website. 
          They help websites remember your actions and preferences over time, making your browsing experience more 
          efficient and personalized.
        </p>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-lg mb-4">
          <h3 className="font-semibold text-purple-700 mb-3 text-lg">🍪 Why We Use Cookies</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Enable essential website functionality (login, shopping cart)</li>
            <li>Remember your language, currency, and display preferences</li>
            <li>Analyze website performance and user behavior</li>
            <li>Provide personalized product recommendations</li>
            <li>Deliver relevant advertisements</li>
            <li>Ensure security and prevent fraudulent activities</li>
            <li>Improve overall user experience</li>
          </ul>
        </div>

        <p className="text-gray-700 text-sm italic">
          Most web browsers automatically accept cookies, but you can modify your settings to decline them. 
          However, this may limit your access to certain website features.
        </p>
      </section>

      {/* Types of Cookies */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">2. Types of Cookies We Use</h2>

        {/* Essential Cookies */}
        <div className="mb-6 border rounded-lg overflow-hidden">
          <div className="bg-purple-600 text-white p-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span>🔒</span> Essential Cookies (Strictly Necessary)
            </h3>
          </div>
          <div className="p-5 bg-purple-50">
            <div className="bg-yellow-100 border border-yellow-400 p-3 rounded mb-4">
              <p className="text-sm font-semibold text-yellow-800">⚠️ These cookies cannot be disabled as they are mandatory for website operation</p>
            </div>
            
            <p className="mb-4 text-gray-700">
              Essential cookies enable core functionality without which the website cannot operate properly. 
              Disabling these would prevent you from using basic features like shopping cart and secure login.
            </p>

            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-700 mb-3">What They Do:</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <div>
                    <p className="font-semibold text-gray-800">User Authentication</p>
                    <p className="text-sm text-gray-600">Keep you logged into your Ceramicry account securely</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <div>
                    <p className="font-semibold text-gray-800">Shopping Cart Management</p>
                    <p className="text-sm text-gray-600">Remember items added to your cart throughout your session</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <div>
                    <p className="font-semibold text-gray-800">Payment Security</p>
                    <p className="text-sm text-gray-600">Secure payment processing through encrypted connections</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <div>
                    <p className="font-semibold text-gray-800">Fraud Prevention</p>
                    <p className="text-sm text-gray-600">Detect and prevent unauthorized access and fraudulent transactions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold">•</span>
                  <div>
                    <p className="font-semibold text-gray-800">Load Balancing</p>
                    <p className="text-sm text-gray-600">Distribute server traffic for optimal website performance</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">
                <strong>Duration:</strong> Session cookies (deleted when browser closes) or persistent (up to 30 days)
              </p>
            </div>
          </div>
        </div>

        {/* Functional Cookies */}
        <div className="mb-6 border rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span>⚙️</span> Functional Cookies
            </h3>
          </div>
          <div className="p-5 bg-blue-50">
            <p className="mb-4 text-gray-700">
              Functional cookies enhance your experience by remembering your choices and preferences. While not strictly 
              necessary, they significantly improve website usability.
            </p>

            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-700 mb-3">What They Remember:</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="border-l-4 border-blue-400 pl-3 py-2">
                  <p className="font-semibold text-gray-800 text-sm">Language Preference</p>
                  <p className="text-xs text-gray-600">Hindi, English, or regional languages</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-3 py-2">
                  <p className="font-semibold text-gray-800 text-sm">Location Settings</p>
                  <p className="text-xs text-gray-600">City/region for delivery and availability</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-3 py-2">
                  <p className="font-semibold text-gray-800 text-sm">Currency Display</p>
                  <p className="text-xs text-gray-600">INR (₹) format preferences</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-3 py-2">
                  <p className="font-semibold text-gray-800 text-sm">Wishlist Items</p>
                  <p className="text-xs text-gray-600">Products saved for later</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-3 py-2">
                  <p className="font-semibold text-gray-800 text-sm">Recently Viewed</p>
                  <p className="text-xs text-gray-600">Products you've browsed</p>
                </div>
                <div className="border-l-4 border-blue-400 pl-3 py-2">
                  <p className="font-semibold text-gray-800 text-sm">Display Preferences</p>
                  <p className="text-xs text-gray-600">Grid/list view, font size</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">
                <strong>Duration:</strong> 30-365 days (varies by feature)
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Cookies */}
        <div className="mb-6 border rounded-lg overflow-hidden">
          <div className="bg-green-600 text-white p-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span>📊</span> Analytics & Performance Cookies
            </h3>
          </div>
          <div className="p-5 bg-green-50">
            <p className="mb-4 text-gray-700">
              These cookies help us understand how visitors use our website. All data collected is anonymized and 
              aggregated, helping us improve website performance and user experience.
            </p>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-700 mb-3">Information We Collect:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm"><strong>Page Views:</strong> Which pages are most popular</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm"><strong>Session Duration:</strong> How long visitors stay on site</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm"><strong>Bounce Rate:</strong> Single-page visits vs. multi-page browsing</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm"><strong>Navigation Paths:</strong> How users move through the website</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm"><strong>Performance Metrics:</strong> Page load times and technical issues</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm"><strong>Conversion Tracking:</strong> Purchase completion rates</span>
                </div>
              </div>

              <div className="bg-green-50 p-3 rounded mt-4">
                <p className="text-sm text-gray-700"><strong>Primary Tool:</strong> Google Analytics</p>
                <p className="text-xs text-gray-600 mt-1">All data is anonymized and used solely for website improvement</p>
              </div>

              <p className="text-xs text-gray-500 mt-4 italic">
                <strong>Duration:</strong> 90 days to 2 years (depending on metric type)
              </p>
            </div>
          </div>
        </div>

        {/* Marketing Cookies */}
        <div className="mb-6 border rounded-lg overflow-hidden">
          <div className="bg-red-600 text-white p-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span>🎯</span> Marketing & Advertising Cookies
            </h3>
          </div>
          <div className="p-5 bg-red-50">
            <p className="mb-4 text-gray-700">
              Marketing cookies track your online activity to deliver personalized advertisements and measure campaign 
              effectiveness. These cookies require your explicit consent and can be disabled anytime.
            </p>

            <div className="bg-white p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-700 mb-3">How We Use Marketing Cookies:</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-semibold text-gray-800 text-sm mb-1">🎨 Personalized Advertising</p>
                  <p className="text-xs text-gray-600">Show relevant product ads based on your browsing history</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-semibold text-gray-800 text-sm mb-1">🔄 Retargeting Campaigns</p>
                  <p className="text-xs text-gray-600">Remind you about products you viewed on Facebook, Instagram, Google</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-semibold text-gray-800 text-sm mb-1">📧 Email Campaign Tracking</p>
                  <p className="text-xs text-gray-600">Measure effectiveness of promotional emails and newsletters</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-semibold text-gray-800 text-sm mb-1">🤝 Affiliate Attribution</p>
                  <p className="text-xs text-gray-600">Credit referrals from partner websites and influencers</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-semibold text-gray-800 text-sm mb-1">🎁 Product Recommendations</p>
                  <p className="text-xs text-gray-600">Suggest dinnerware sets based on your preferences</p>
                </div>
              </div>

              <div className="bg-red-50 p-3 rounded mt-4">
                <p className="text-sm font-semibold text-gray-800 mb-2">Third-Party Partners:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white px-3 py-1 rounded-full border border-red-200">Facebook Pixel</span>
                  <span className="text-xs bg-white px-3 py-1 rounded-full border border-red-200">Google Ads</span>
                  <span className="text-xs bg-white px-3 py-1 rounded-full border border-red-200">Instagram</span>
                  <span className="text-xs bg-white px-3 py-1 rounded-full border border-red-200">WhatsApp Business</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4 italic">
                <strong>Duration:</strong> 30-90 days to 1 year | <strong>Your Control:</strong> Can be disabled anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Preference Manager */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">3. Manage Your Cookie Preferences</h2>
        
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-xl border-2 border-purple-300 shadow-lg">
          <h3 className="text-2xl font-semibold text-purple-800 mb-3 flex items-center gap-2">
            <span>🍪</span> Cookie Preference Center
          </h3>
          <p className="text-gray-700 mb-6">
            Customize which cookies you allow. Essential cookies cannot be disabled as they're required for basic website functionality.
          </p>

          <div className="space-y-4 mb-6">
            {/* Essential Cookies Toggle */}
            <div className="bg-white p-5 rounded-lg border-2 border-purple-200 shadow-sm">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🔒</span>
                    <h4 className="font-bold text-gray-900 text-lg">Essential Cookies</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Required for core website functionality including login, cart, and checkout</p>
                  <p className="text-xs text-purple-600 font-semibold">Cannot be disabled</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="w-14 h-7 bg-green-500 rounded-full flex items-center justify-end px-1 shadow-inner">
                    <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                  </div>
                  <span className="text-xs font-semibold text-green-700">Always On</span>
                </div>
              </div>
            </div>

            {/* Functional Cookies Toggle */}
            <div className="bg-white p-5 rounded-lg border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">⚙️</span>
                    <h4 className="font-bold text-gray-900 text-lg">Functional Cookies</h4>
                  </div>
                  <p className="text-sm text-gray-600">Remember your language, location, and display preferences for enhanced experience</p>
                </div>
                <button
                  onClick={() => handleToggle('functional')}
                  className={`w-14 h-7 rounded-full flex items-center transition-all duration-300 shadow-inner ${
                    cookiePreferences.functional 
                      ? 'bg-green-500 justify-end' 
                      : 'bg-gray-300 justify-start'
                  } px-1 hover:shadow-lg`}
                  aria-label="Toggle functional cookies"
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                </button>
              </div>
            </div>

            {/* Analytics Cookies Toggle */}
            <div className="bg-white p-5 rounded-lg border-2 border-green-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📊</span>
                    <h4 className="font-bold text-gray-900 text-lg">Analytics & Performance</h4>
                  </div>
                  <p className="text-sm text-gray-600">Help us understand usage patterns and improve website performance (anonymized data)</p>
                </div>
                <button
                  onClick={() => handleToggle('analytics')}
                  className={`w-14 h-7 rounded-full flex items-center transition-all duration-300 shadow-inner ${
                    cookiePreferences.analytics 
                      ? 'bg-green-500 justify-end' 
                      : 'bg-gray-300 justify-start'
                  } px-1 hover:shadow-lg`}
                  aria-label="Toggle analytics cookies"
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                </button>
              </div>
            </div>

            {/* Marketing Cookies Toggle */}
            <div className="bg-white p-5 rounded-lg border-2 border-red-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎯</span>
                    <h4 className="font-bold text-gray-900 text-lg">Marketing & Advertising</h4>
                  </div>
                  <p className="text-sm text-gray-600">Deliver personalized ads and track campaign effectiveness across platforms</p>
                </div>
                <button
                  onClick={() => handleToggle('marketing')}
                  className={`w-14 h-7 rounded-full flex items-center transition-all duration-300 shadow-inner ${
                    cookiePreferences.marketing 
                      ? 'bg-green-500 justify-end' 
                      : 'bg-gray-300 justify-start'
                  } px-1 hover:shadow-lg`}
                  aria-label="Toggle marketing cookies"
                >
                  <div className="w-5 h-5 bg-white rounded-full shadow"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleAcceptAll}
              className="flex-1 min-w-[200px] px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              ✓ Accept All Cookies
            </button>
            <button
              onClick={handleSavePreferences}
              className="flex-1 min-w-[200px] px-6 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-bold text-lg hover:bg-purple-50 hover:shadow-lg transition-all duration-300"
            >
              💾 Save My Preferences
            </button>
            <button
              onClick={handleRejectAll}
              className="flex-1 min-w-[200px] px-6 py-4 bg-gray-200 text-gray-800 rounded-lg font-bold text-lg hover:bg-gray-300 hover:shadow-lg transition-all duration-300"
            >
              ✕ Reject Optional Cookies
            </button>
          </div>
        </div>
      </section>

      {/* Browser Cookie Management */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">4. Browser Cookie Settings</h2>
        <p className="mb-4 text-gray-700">
          You can also control cookies directly through your web browser settings:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-yellow-50 p-5 rounded-lg border border-red-200">
            <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🌐</span> Google Chrome
            </h4>
            <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-700">
              <li>Click menu (⋮) → Settings</li>
              <li>Privacy and security → Cookies</li>
              <li>Choose your preference or clear cookies</li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-lg border border-orange-200">
            <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🦊</span> Mozilla Firefox
            </h4>
            <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-700">
              <li>Menu → Settings → Privacy & Security</li>
              <li>Cookies and Site Data → Manage Data</li>
              <li>Select and remove cookies</li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-lg border border-blue-200">
            <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🧭</span> Safari
            </h4>
            <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-700">
              <li>Preferences → Privacy</li>
              <li>Manage Website Data</li>
              <li>Remove or block all cookies</li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-300">
            <h4 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🌊</span> Microsoft Edge
            </h4>
            <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-700">
              <li>Settings → Privacy & services</li>
              <li>Clear browsing data</li>
              <li>Select Cookies and clear</li>
            </ol>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
          <p className="font-semibold text-yellow-800 mb-2">⚠️ Important Note</p>
          <p className="text-sm text-gray-700">
            Blocking all cookies may prevent essential website functions like login, shopping cart, and checkout from working properly.
          </p>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">5. Third-Party Services</h2>
        <p className="mb-4 text-gray-700">
          We partner with trusted third-party services that may set their own cookies:
        </p>

        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500 shadow-sm">
            <h4 className="font-semibold text-purple-700 mb-2">Analytics & Insights</h4>
            <p className="text-sm text-gray-600 mb-2">Google Analytics, Hotjar, Clevertap</p>
            <p className="text-xs text-gray-500 italic">Used to understand website usage and improve user experience</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
            <h4 className="font-semibold text-blue-700 mb-2">Payment Processors</h4>
            <p className="text-sm text-gray-600 mb-2">Razorpay, Paytm, CCAvenue, PayU</p>
            <p className="text-xs text-gray-500 italic">Secure payment processing and fraud detection</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-pink-500 shadow-sm">
            <h4 className="font-semibold text-pink-700 mb-2">Social Media & Advertising</h4>
            <p className="text-sm text-gray-600 mb-2">Facebook, Instagram, Google Ads, WhatsApp Business</p>
            <p className="text-xs text-gray-500 italic">Social integration and personalized advertising</p>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
            <h4 className="font-semibold text-green-700 mb-2">Customer Support</h4>
            <p className="text-sm text-gray-600 mb-2">Freshchat, Intercom, Zendesk</p>
            <p className="text-xs text-gray-500 italic">Live chat and customer service functionality</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-4 italic">
          We do not control third-party cookies. Please review their privacy policies for more information.
        </p>
      </section>

      {/* Impact of Disabling */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">6. Impact of Disabling Cookies</h2>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-5">
            <h4 className="font-bold text-red-700 mb-3 text-lg flex items-center gap-2">
              <span>❌</span> Won't Work Without Cookies
            </h4>
            <ul className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-sm text-gray-700">User login and account access</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-sm text-gray-700">Shopping cart functionality</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-sm text-gray-700">Checkout and payment processing</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-sm text-gray-700">Saving preferences and settings</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-sm text-gray-700">Personalized recommendations</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-sm text-gray-700">Live chat customer support</span>
              </div>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-5">
            <h4 className="font-bold text-green-700 mb-3 text-lg flex items-center gap-2">
              <span>✓</span> Still Available
            </h4>
            <ul className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-sm text-gray-700">Browse product catalog</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-sm text-gray-700">View product details and images</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-sm text-gray-700">Read customer reviews</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-sm text-gray-700">Search for products</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-sm text-gray-700">Contact via email/phone</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-sm text-gray-700">Access policy pages</span>
              </div>
            </ul>
          </div>
        </div>
      </section>

      {/* Cookie Duration */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">7. Cookie Duration & Storage</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-purple-50 border border-purple-300 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">⏱️</span>
              <h4 className="font-bold text-purple-700 text-lg">Session Cookies</h4>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Temporary cookies deleted automatically when you close your browser
            </p>
            <div className="bg-white p-3 rounded border border-purple-200">
              <p className="text-xs font-semibold text-gray-800 mb-1">Used For:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Shopping cart items</li>
                <li>• Login sessions</li>
                <li>• Navigation history</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-300 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">📅</span>
              <h4 className="font-bold text-blue-700 text-lg">Persistent Cookies</h4>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              Remain on your device for a set period or until manually deleted
            </p>
            <div className="bg-white p-3 rounded border border-blue-200">
              <p className="text-xs font-semibold text-gray-800 mb-1">Duration:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 30 days: Preferences</li>
                <li>• 90 days: Analytics</li>
                <li>• 1 year: Marketing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Compliance */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">8. Legal Compliance</h2>
        <p className="mb-4 text-gray-700">
          Our cookie practices comply with Indian data protection and e-commerce laws:
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border-l-4 border-blue-500">
          <ul className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-lg">⚖️</span>
              <div>
                <p className="font-semibold text-gray-900">Information Technology Act, 2000</p>
                <p className="text-sm text-gray-600">Governs electronic communication and data protection</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-lg">📜</span>
              <div>
                <p className="font-semibold text-gray-900">IT (Reasonable Security Practices) Rules, 2011</p>
                <p className="text-sm text-gray-600">Guidelines for handling sensitive personal data</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-lg">🛒</span>
              <div>
                <p className="font-semibold text-gray-900">Consumer Protection (E-Commerce) Rules, 2020</p>
                <p className="text-sm text-gray-600">Transparency requirements for online businesses</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold text-lg">🔐</span>
              <div>
                <p className="font-semibold text-gray-900">Digital Personal Data Protection Act, 2023</p>
                <p className="text-sm text-gray-600">User consent and data protection framework</p>
              </div>
            </div>
          </ul>
        </div>
      </section>

      {/* Opt-Out Options */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">9. Opt-Out of Third-Party Tracking</h2>
        <p className="mb-4 text-gray-700">
          Control advertising and analytics from specific providers:
        </p>

        <div className="space-y-3">
          <div className="bg-white border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Google Analytics Opt-Out</h4>
                <p className="text-sm text-gray-600">Browser add-on to prevent data collection</p>
              </div>
              <a 
                href="https://tools.google.com/dlpage/gaoptout" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Download →
              </a>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Google Ads Settings</h4>
                <p className="text-sm text-gray-600">Manage ad personalization preferences</p>
              </div>
              <a 
                href="https://adssettings.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Manage →
              </a>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Facebook Ad Preferences</h4>
                <p className="text-sm text-gray-600">Control Facebook and Instagram ads</p>
              </div>
              <a 
                href="https://www.facebook.com/ads/preferences" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Settings →
              </a>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> Opting out means you'll still see ads, but they won't be personalized based on your interests.
          </p>
        </div>
      </section>

      {/* Updates to Policy */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">10. Changes to This Policy</h2>
        <p className="mb-4 text-gray-700">
          We may update this Cookies Policy periodically to reflect changes in technology, legal requirements, or our practices.
        </p>
        
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-300">
          <h4 className="font-semibold text-gray-900 mb-3">How We'll Notify You:</h4>
          <ul className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span className="text-sm text-gray-700">Update "Last Updated" date at the top of this page</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span className="text-sm text-gray-700">Display prominent notice on website for significant changes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span className="text-sm text-gray-700">Send email notification to registered users</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span className="text-sm text-gray-700">Request renewed consent if required by law</span>
            </div>
          </ul>
        </div>

        <p className="text-sm text-gray-600 mt-4 italic">
          Continued use of our website after changes indicates acceptance of the updated policy.
        </p>
      </section>

      {/* More Information */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">11. Learn More About Cookies</h2>
        <p className="mb-4 text-gray-700">
          For additional information about cookies and online privacy:
        </p>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-white border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-700 mb-2">🌐 All About Cookies</h4>
            <a href="https://www.allaboutcookies.org" className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              www.allaboutcookies.org
            </a>
          </div>

          <div className="bg-white border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-700 mb-2">🇮🇳 MEITY (India)</h4>
            <a href="https://www.meity.gov.in" className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              www.meity.gov.in
            </a>
          </div>

          <div className="bg-white border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-700 mb-2">📢 Network Advertising Initiative</h4>
            <a href="https://www.networkadvertising.org" className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              www.networkadvertising.org
            </a>
          </div>

          <div className="bg-white border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-700 mb-2">🎯 Digital Advertising Alliance</h4>
            <a href="https://www.aboutads.info" className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              www.aboutads.info
            </a>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">12. Contact Us</h2>
        
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>📧</span> Questions About Cookies?
          </h3>
          <p className="text-purple-100 mb-6">
            If you have questions about our use of cookies or need assistance with cookie settings, please reach out:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold text-lg mb-3 border-b border-white border-opacity-30 pb-2">
                Customer Support
              </h4>
              <div className="space-y-2 text-sm">
                <p>📧 Email: shailesh2081994@gmail.com</p>
                <p>📞 Phone: +91-97178-32482</p>
                <p>💬 WhatsApp: +91-99900-21009</p>
                <p>⏰ Hours: Mon-Sat, 9 AM - 7 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Policies */}
      <section className="mb-10">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-3 text-lg">📚 Related Policies</h3>
          <p className="text-sm text-gray-700 mb-3">
            For comprehensive information about how we handle your data:
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span className="text-sm text-gray-700"><strong>Privacy Policy:</strong> How we collect and use your personal information</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span className="text-sm text-gray-700"><strong>Terms & Conditions:</strong> Rules for using our website and services</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">→</span>
              <span className="text-sm text-gray-700"><strong>Shipping & Returns:</strong> Delivery and return policies</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Quick Summary */}
      <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-purple-300 shadow-md">
        <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <span>📋</span> Quick Summary
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">We use cookies to improve your experience</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Essential cookies are always active</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">You control optional cookies</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Third-party services may use cookies</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Manage preferences anytime</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Browser settings give you control</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">We comply with Indian laws</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-sm text-gray-700">Transparency in data practices</span>
            </div>
          </div>
        </div>
      </div>

      {/* Consent Acknowledgment */}
      <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg mt-8">
        <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
          <span>✓</span> Your Consent
        </h4>
        <p className="text-sm text-gray-700">
          By clicking "Accept" on our cookie banner or continuing to use our website, you acknowledge that you have 
          read and understood this Cookies Policy and consent to our use of cookies as described. You can withdraw or 
          modify your consent at any time through the Cookie Preference Center above or by contacting us.
        </p>
      </div>
    </div>
  );
};

export default CookiesPolicy;