import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {

  const footerLinks = {
    "Quick Links": [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns", href: "/return" },
    ],
    Categories: [
      { name: "Dinnerware", href: "/product?category=dinnerware" },
      { name: "Serveware", href: "/product?category=serveware" },
      { name: "Drinkware", href: "/product?category=drinkware" },
      { name: "Complete Sets", href: "/product?category=sets" },
    ],
  };

  return (
    <footer className="bg-gray-50 text-gray-700 pt-12 pb-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ceramicry</h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Crafting beautiful ceramic items for your home since 2017. Each piece is handmade with love and attention to detail.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" 
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-gray-900 mb-4">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stay Connected Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Stay Connected</h4>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={16} className="mr-3 flex-shrink-0" />
                support@ceramicry.com
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={16} className="mr-3 flex-shrink-0" />
                (0) 73541-123
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-3 flex-shrink-0" />
                123 New Delhi, Shahdara Delhi
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-6 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} Ceramicry. All Rights Reserved.</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <a href="#privacy" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#cookies" className="hover:text-gray-900 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;