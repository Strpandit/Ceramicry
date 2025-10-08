import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import debounce from "lodash.debounce";

const SearchBar = ({ placeholder = "Search...", onSelect, fetchSuggestions, onEnter }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef();

  const fetchDebounced = useRef(
    debounce(async (q) => {
      if (!q) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const results = await fetchSuggestions(q);
        setSuggestions(results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500)
  ).current;

  useEffect(() => {
    fetchDebounced(query);
  }, [query, fetchDebounced]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelect = (item) => {
    setQuery(item.name || item);
    setShowSuggestions(false);
    if (onSelect) onSelect(item);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      if (onEnter) onEnter(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pr-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        onFocus={() => setShowSuggestions(true)}
      />
      {query && <X onClick={handleClear} className="absolute right-3 top-2.5 cursor-pointer text-gray-400" />}
      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {item.name || item}
            </li>
          ))}
        </ul>
      )}

      {loading && <div className="absolute right-10 top-2.5 text-gray-500 text-sm">Searching...</div>}
    </div>
  );
};

export default SearchBar;
