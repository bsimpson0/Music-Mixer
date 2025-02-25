import React, { useState } from 'react';

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-bar"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
        />
        <span className="search-icon" onClick={handleSubmit}>🔍</span>
      </form>
    </div>
  );
};

export default SearchBar;