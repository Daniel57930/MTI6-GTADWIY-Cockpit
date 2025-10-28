import { useState } from "react";

/**
 * GlobalSearchBar - Enhanced search with autocomplete and category filtering
 * Supports searching across assets, tokens, commands, and Brave integration features
 */
const GlobalSearchBar = ({ onSearch, onResultSelect, categories = [] }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() && typeof onSearch === "function") {
      onSearch(query.trim(), selectedCategory);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Trigger search callback for autocomplete
    if (value.trim() && typeof onSearch === "function") {
      onSearch(value.trim(), selectedCategory);
    }
  };

  const handleResultClick = (result) => {
    if (typeof onResultSelect === "function") {
      onResultSelect(result);
    }
    setQuery(result.name || result.symbol || "");
    setShowResults(false);
  };

  return (
    <div className="global-search-bar">
      <form onSubmit={handleSearch} className="global-search-bar__form">
        <div className="global-search-bar__controls">
          {categories.length > 0 && (
            <select
              className="global-search-bar__category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            className="global-search-bar__input"
            placeholder="Search assets, tokens, commands..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
          <button
            type="submit"
            className="global-search-bar__button"
            disabled={!query.trim()}
          >
            Search
          </button>
        </div>
      </form>
      
      {showResults && results.length > 0 && (
        <div className="global-search-bar__results">
          {results.map((result, index) => (
            <div
              key={index}
              className="global-search-bar__result-item"
              onClick={() => handleResultClick(result)}
            >
              <span className="result-item__name">{result.name || result.symbol}</span>
              {result.type && <span className="result-item__type">{result.type}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
