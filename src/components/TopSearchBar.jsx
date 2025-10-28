import { useState } from "react";

/**
 * TopSearchBar - Global search component for asset lookup and navigation
 * Integrates with Brave BAT token search and asset registry
 */
const TopSearchBar = ({ onSearch, placeholder = "Search assets, tokens, or commands..." }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() && typeof onSearch === "function") {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className={`top-search-bar ${isFocused ? "top-search-bar--focused" : ""}`}>
      <form onSubmit={handleSearch} className="top-search-bar__form">
        <input
          type="text"
          className="top-search-bar__input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="submit"
          className="top-search-bar__button"
          disabled={!query.trim()}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default TopSearchBar;
