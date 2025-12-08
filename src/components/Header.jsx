import React, {useState, useEffect, useContext} from "react";
import { ShoppingCart, User, Menu, X, ChevronDown, Plus, Minus } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import api from "../components/Api";
import SearchBar from "../components/SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [openCategories, setOpenCategories] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("categories");
        setCategories(res.data.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const fetchSubcategories = async (slug) => {
    if (subcategories[slug]) return;

    try {
      const res = await api.get(`categories/${slug}/subcategories`);
      setSubcategories((prev) => ({
        ...prev,
        [slug]: res.data.data || [],
      }));
    } catch (err) {
      console.error(`Error fetching subcategories for ${slug}:`, err);
    }
  };

  const toggleCategory = (slug) => {
    setOpenCategories((prev) => ({ ...prev, [slug]: !prev[slug] }));
    if (!openCategories[slug]) {
      fetchSubcategories(slug);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="flex justify-between items-center px-6 py-2 text-sm text-gray-600 border-b bg-white">
        <span>Free shipping on orders above ₹10000</span>
        <div className="flex items-center space-x-4">
          <span>Customer Service: +91 99900-21009</span>
          <button
            onClick={() => user ? navigate('/user-profile') :  navigate('/login')}
            className="hidden lg:flex items-center space-x-1 hover:text-black"
          >
            <User size={16} />
            <span>Account</span>
          </button>
        </div>
      </div>

      {/* Main navbar */}
      <div className="flex justify-between items-center px-6 py-3 bg-white">
        {/* Logo */}
        <NavLink to="/" className="cursor-pointer">
          <img src="/logo.png" alt="Ceramicry" className="h-12 w-auto object-contain"/>
        </NavLink>

        {/* Navigation Links */}
        <nav className="hidden lg:flex space-x-6 ml-10 relative">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative"
              onMouseEnter={() => {
                setActiveCategory(cat.slug);
                fetchSubcategories(cat.slug);
              }}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <span className="cursor-pointer flex items-center space-x-1 text-gray-700 hover:text-black transition-colors duration-200">
                {cat.name} <ChevronDown className="w-4 h-4" />
              </span>

              {/* Subcategories dropdown */}
              {activeCategory === cat.slug && subcategories[cat.slug]?.length > 0 && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded border border-gray-200 z-50">
                  {subcategories[cat.slug].map((sub) => (
                    <a
                      key={sub.id}
                      href={`/product?category=${cat.slug}&subcategory=${sub.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search & Cart */}
        <div className="flex items-center space-x-4">
          <div className="relative w-full ml-8">
            <SearchBar
              placeholder="Search products..."
              fetchSuggestions={async (search) => {
                try {
                  const res = await api.get(`products?search=${search}`);
                  return res.data?.data || [];
                } catch (err) {
                  return [];
                }
              }}
              onSelect={(item) => navigate(`/product?search=${encodeURIComponent(item.name || item)}`)}
              onEnter={(query) => navigate(`/product?search=${encodeURIComponent(query)}`)}
            />
          </div>
          <a href="/cart" className="relative">
            <ShoppingCart size={20} className="text-gray-700 hover:text-black transition-colors duration-200" />
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-800 p-1 hover:bg-gray-100 rounded"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Mobile Search */}
        <nav className="flex flex-col p-4 space-y-1">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col">
              <button
                onClick={() => toggleCategory(cat.slug)}
                className="flex justify-between items-center py-3 px-2 w-full text-left border-b border-gray-100 text-gray-700 hover:text-black hover:bg-gray-50 transition-colors duration-200"
              >
                <span>{cat.name}</span>
                {openCategories[cat.slug] ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>

              {openCategories[cat.slug] && subcategories[cat.slug]?.length > 0 && (
                <div className="flex flex-col ml-4 mt-1 space-y-1">
                  {subcategories[cat.slug].map((sub) => (
                    <a
                      key={sub.id}
                      href={`/product?category=${cat.slug}&subcategory=${sub.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="py-2 px-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded"
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Account Link */}
        <div className="p-4 border-t mt-auto">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              user ? navigate('/user-profile') :  navigate('/login')
            }}
            className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors duration-200"
          >
            <User size={20} />
            <span>My Account</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;