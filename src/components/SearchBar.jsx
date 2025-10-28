import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import debounce from "lodash.debounce";

const SearchBar = ({ placeholder = "Search...", onSelect, fetchSuggestions, onEnter }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef();
  
  // Always auto-focus the search input when component mounts/clears
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  // Debounced suggestions fetch
  const fetchDebounced = useRef(
    debounce(async (q) => {
      if (!q) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const results = await fetchSuggestions(q);
        setSuggestions(Array.isArray(results) ? results : []);
      } catch (err) {
        setSuggestions([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500)
  ).current;

  // On query change, fetch new suggestions
  useEffect(() => {
    if (query) {
      fetchDebounced(query);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, fetchDebounced]);

  // On refresh (mount), clear everything just in case
  useEffect(() => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelect = (item) => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    if (onSelect) onSelect(item);
    inputRef.current && inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      if (onEnter && query) onEnter(query);
      setQuery("");
      setSuggestions([]);
    }
  };

  // Clicking clear X
  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current && inputRef.current.focus();
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
        onFocus={() => query && setShowSuggestions(true)}
        autoComplete="off"
      />
      {query && <X onClick={handleClear} className="absolute right-3 top-2.5 cursor-pointer text-gray-400" />}
      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />

      {showSuggestions && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <li className="px-4 py-2 text-gray-500">Searching...</li>
          ) : suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {item.name || item}
              </li>
            ))
          ) : (
            query && !loading && (
              <li className="px-4 py-2 text-gray-500">No products found</li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
