import React from 'react';
import { Award, Shield, Truck, Heart, Leaf, Users, Clock, Gift, CheckCircle, Star} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WhyChooseUs = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Heart,
      title: "Handcrafted Excellence",
      description: "Each piece is lovingly handmade by skilled artisans using traditional techniques passed down through generations.",
      color: "bg-rose-100 text-rose-600"
    },
    {
      icon: Award,
      title: "Premium Quality Materials",
      description: "We use only the finest ceramic clay and non-toxic glazes to ensure durability and food safety for your family.",
      color: "bg-amber-100 text-amber-600"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Production",
      description: "Our sustainable manufacturing process minimizes environmental impact while creating beautiful, long-lasting products.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Shield,
      title: "100% Safe & Non-Toxic",
      description: "All our products are lead-free, microwave safe, and dishwasher friendly for your peace of mind.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Truck,
      title: "Free Shipping & Returns",
      description: "Enjoy complimentary shipping on orders over ₹1499 and hassle-free returns within 30 days.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Users,
      title: "Family Business Legacy",
      description: "Three generations of ceramic expertise, bringing you authentic craftsmanship and personalized service.",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: `${new Date().getFullYear() - 2017}+`, label: "Years of Excellence" },
    { number: "500+", label: "Unique Designs" },
    { number: "99%", label: "Customer Satisfaction" }
  ];

  const testimonials = [
    {
      text: "The quality is exceptional! These pieces have become the centerpiece of our dining room.",
      author: "Sarah M.",
      rating: 5
    },
    {
      text: "Beautiful craftsmanship and arrived perfectly packaged. Will definitely order again!",
      author: "Michael R.",
      rating: 5
    },
    {
      text: "Love the unique designs and eco-friendly approach. Highly recommend!",
      author: "Emma L.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600 ml-3">
              Ceramicry?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the difference that authentic craftsmanship, premium materials, and passionate dedication make in every piece we create.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={28} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Trusted by Thousands
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-gray-600 font-medium">
                  - {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Guarantee */}
        <div className="bg-gradient-to-r from-rose-600 to-amber-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle size={40} />
            </div>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Our Quality Promise
          </h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-95">
            We stand behind every piece with our lifetime craftsmanship guarantee. If you're not completely satisfied, we'll make it right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center bg-white/10 rounded-lg px-6 py-3">
              <Gift className="mr-3" size={20} />
              <span className="font-medium">30-Day Returns</span>
            </div>
            <div className="flex items-center justify-center bg-white/10 rounded-lg px-6 py-3">
              <Clock className="mr-3" size={20} />
              <span className="font-medium">Lifetime Support</span>
            </div>
            <div className="flex items-center justify-center bg-white/10 rounded-lg px-6 py-3">
              <Shield className="mr-3" size={20} />
              <span className="font-medium">Quality Guarantee</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button onClick={() => navigate("/product")} className="bg-gradient-to-r from-rose-600 to-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Shop Our Collection
          </button>
          <p className="text-gray-600 mt-4">
            Join thousands of satisfied customers who trust Ceramicry for their dinnerware needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;