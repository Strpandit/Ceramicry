import React from "react";
import { Utensils, Coffee, Soup, HandPlatter, Wine, ForkKnife, Sparkles, Palette, Truck, MessageCircle, User, PenTool} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  const productCategories = [
    {
      icon: <Utensils className="w-12 h-12 mx-auto text-blue-500 hover:scale-110 transition-transform duration-300" />,
      title: "Dinner Sets",
      description:
        "Complete dinnerware collections featuring plates, bowls, and serving pieces in coordinated designs. From classic white porcelain to contemporary patterns, perfect for everyday dining and special occasions.",
    },
    {
      icon: <Coffee className="w-12 h-12 mx-auto text-amber-500 hover:scale-110 transition-transform duration-300" />,
      title: "Tea & Coffee Mugs",
      description:
        "Elegant teapots, coffee mugs, and matching saucers crafted from fine china and ceramic. Create the perfect morning ritual or afternoon tea experience with our thoughtfully designed collections.",
    },
    {
      icon: <Soup className="w-12 h-12 mx-auto text-emerald-500 hover:scale-110 transition-transform duration-300" />,
      title: "Serving Bowls",
      description:
        "Versatile serving bowls in various sizes and styles, from rustic stoneware to sleek modern designs. Perfect for salads, pasta, fruits, and everything in between.",
    },
    {
      icon: <HandPlatter className="w-12 h-12 mx-auto text-pink-500 hover:scale-110 transition-transform duration-300" />,
      title: "Plates",
      description:
        "Beautiful vases, decorative bowls, and ornamental pieces that add character to your home. Each piece is selected for its artistic value and quality craftsmanship.",
    },
    {
      icon: <Wine className="w-12 h-12 mx-auto text-purple-500 hover:scale-110 transition-transform duration-300" />,
      title: "Glassware",
      description:
        "Crystal-clear glasses, wine sets, and specialty drinkware. From everyday tumblers to elegant wine glasses, enhance every beverage experience.",
    },
    {
      icon: <ForkKnife className="w-12 h-12 mx-auto text-red-500 hover:scale-110 transition-transform duration-300" />,
      title: "Cutlery & Accessories",
      description:
        "Premium stainless steel cutlery sets, serving utensils, and dining accessories. Complete your table setting with our carefully selected tools and accessories.",
    },
  ];

  const values = [
    {
      icon: <Sparkles className="w-10 h-10 mx-auto text-yellow-500 hover:scale-110 transition-transform duration-300" />,
      title: "Premium Quality",
      description:
        "Every piece is carefully selected from trusted manufacturers worldwide, ensuring durability and beauty that lasts for generations.",
    },
    {
      icon: <Palette className="w-10 h-10 mx-auto text-indigo-500 hover:scale-110 transition-transform duration-300" />,
      title: "Curated Selection",
      description:
        "Our expert team handpicks each item, focusing on timeless designs and contemporary trends that complement any home style.",
    },
    {
      icon: <Truck className="w-10 h-10 mx-auto text-green-500 hover:scale-110 transition-transform duration-300" />,
      title: "Fast & Safe Delivery",
      description:
        "Secure packaging and reliable shipping ensure your precious crockery arrives safely at your doorstep, ready to grace your table.",
    },
    {
      icon: <MessageCircle className="w-10 h-10 mx-auto text-pink-500 hover:scale-110 transition-transform duration-300" />,
      title: "Expert Support",
      description:
        "Our knowledgeable customer service team is always ready to help you choose the perfect pieces for your needs and lifestyle.",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers", color: "text-blue-500" },
    { number: "2,500+", label: "Product Varieties", color: "text-green-500" },
    { number: `${new Date().getFullYear() - 2017}+`, label: "Years of Excellence", color: "text-purple-500" },
    { number: "99.8%", label: "Satisfaction Rate", color: "text-pink-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in-up">
            Ceramicry
          </h1>
          <p className="text-xl max-w-2xl mx-auto animate-fade-in-up delay-300">
            Where timeless elegance meets everyday functionality. Discover the
            perfect pieces to make every meal memorable.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Our <span className="text-yellow-400">Story</span>
              <span className="block w-20 h-1 bg-yellow-400 mx-auto mt-4"></span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Born from a passion for bringing families together around beautiful
              tables
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-10">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                A Legacy of Excellence
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Founded in 2017, Ceramicry began as a small family business
                with a simple mission: to provide high-quality dinnerware that
                transforms ordinary meals into extraordinary experiences.
              </p>
              <p className="text-lg leading-relaxed text-gray-700">
                We believe that beautiful crockery is more than just
                tableware—it's the foundation of memorable moments, meaningful
                conversations, and cherished traditions.
              </p>
            </div>
            <div className="relative rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
              <img src="/img.png" alt="about-image" className="rounded-4xl"/>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              A Message from Our <span className="text-yellow-400">Founder</span>
              <span className="block w-20 h-1 bg-yellow-400 mx-auto mt-4"></span>
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-3">
              <div className="bg-gray-200 p-8 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-2xl">
                  <User className="w-20 h-20 text-white" />
                </div>
              </div>

              <div className="lg:col-span-2 p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Shailesh Kumar
                </h3>
                <p className="text-lg text-gray-700 font-medium">
                  Founder & CEO
                </p>

                <div className="space-y-6 text-gray-700 leading-relaxed mt-6">
                  <p className="text-lg italic">
                    "When I started Ceramicry {new Date().getFullYear() - 2017} years ago, I had a
                    simple dream: to help families create beautiful moments
                    around their dining tables."
                  </p>
                  <p>
                    Growing up in a family where Sunday dinners were sacred, I
                    learned early that the right tableware doesn't just serve
                    food—it serves memories.
                  </p>
                  <p>
                    Today, as we serve over 50,000 families worldwide, that same
                    passion drives everything we do.
                  </p>
                  <div className="pt-4 flex items-center space-x-4">
                    <PenTool className="w-8 h-8 text-indigo-600 rotate-360" />
                    <div className="text-2xl font-bold text-gray-900">
                      Shailesh kumar
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-12 py-8 border-t border-gray-300">
              <div className="text-center">
                <p className="text-xl font-medium text-gray-900 italic">
                  Every meal is an opportunity to create something beautiful.
                  Let us help you make it extraordinary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Products</h2>
            <p className="text-lg text-gray-600">
              Carefully curated collections to suit every style and occasion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="mb-4 text-center">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-16 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, idx) => (
                <div key={idx} className="text-center p-6">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 mb-12">
            Numbers that tell our story
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-6">
                <div className={`text-5xl font-bold mb-3 ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-lg text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 relative inline-block">
            Start <span className="text-red-600">Your Story</span> Today
            <span className="block w-20 h-1 bg-red-600 mx-auto mt-4"></span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our collection and discover the perfect pieces for your home
          </p>
          <button onClick={() => navigate("/product")} className="bg-gradient-to-r from-gray-800 to-black text-white px-10 py-4 rounded-full text-xl font-bold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Explore Our Collection
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;