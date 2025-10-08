import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send,
  CheckCircle,
  User,
  MessageSquare,
  Headphones
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 (0) 73541-123", "+91 (0) 73541-124"],
      description: "Mon-Sat 9AM-7PM",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@ceramicry.com", "support@ceramicry.com"],
      description: "We'll respond within 24 hours",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Pottery Lane", "Artisan City, AC 12345"],
      description: "See our showroom collection",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["+91 98765-43210"],
      description: "Quick support & updates",
      color: "bg-green-100 text-green-600"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "12:00 PM - 5:00 PM" },
    { day: "Holidays", hours: "Closed" }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'product', label: 'Product Information' },
    { value: 'order', label: 'Order Support' },
    { value: 'wholesale', label: 'Wholesale/Bulk Orders' },
    { value: 'return', label: 'Returns & Exchange' },
    { value: 'custom', label: 'Custom Orders' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about our ceramic collections? We'd love to hear from you. 
            Get in touch and let us help you find the perfect pieces for your home.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className={`w-12 h-12 rounded-lg ${info.color} flex items-center justify-center mb-4`}>
                <info.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-700 font-medium">{detail}</p>
              ))}
              <p className="text-gray-500 text-sm mt-2">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <Send className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for contacting us. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User size={20} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={20} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone size={20} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare size={20} className="absolute left-3 top-3 text-gray-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="5"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Tell us more about your inquiry..."
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold text-gray-900">Business Hours</h3>
              </div>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700 font-medium">{schedule.day}</span>
                    <span className="text-gray-600">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="tel:+917354112345"
                  className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                >
                  <Phone className="text-blue-600 mr-3" size={20} />
                  <span className="text-blue-700 font-medium">Call Now</span>
                </a>
                
                <a
                  href="https://api.whatsapp.com/send/?phone=919876543210&amp;text=Hello!+Ceramicry,+I+want+to+know+more+about+your+products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                >
                  <MessageCircle className="text-green-600 mr-3" size={20} />
                  <span className="text-green-700 font-medium">WhatsApp</span>
                </a>
                
                <a
                  href="mailto:hello@ceramicry.com"
                  className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                >
                  <Mail className="text-purple-600 mr-3" size={20} />
                  <span className="text-purple-700 font-medium">Send Email</span>
                </a>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Headphones className="mr-3" size={24} />
                <h3 className="text-xl font-semibold">Need Quick Help?</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Check our FAQ section for instant answers to common questions about orders, shipping, and products.
              </p>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                Visit FAQ
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 border-b">
              <div className="flex items-center mb-4">
                <MapPin className="text-purple-600 mr-3" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Visit Our Showroom</h2>
              </div>
              <p className="text-gray-600">
                Come see our beautiful ceramic collection in person at our showroom. 
                Our experts are ready to help you find the perfect pieces for your home.
              </p>
            </div>
            
            {/* Placeholder for Map */}
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto text-gray-400 mb-2" size={48} />
                <p className="text-gray-500">Interactive Map</p>
                <p className="text-sm text-gray-400">123 Pottery Lane, Artisan City</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;