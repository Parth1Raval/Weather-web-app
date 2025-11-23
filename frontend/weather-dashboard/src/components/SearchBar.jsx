import React, { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';

const SearchBar = ({ onSearch, onRefresh, loading }) => {
  const [city, setCity] = useState('');

  const popularCities = ['London', 'New York', 'Tokyo', 'Paris', 'Dubai', 'Mumbai'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleCityClick = (cityName) => {
    setCity(cityName);
    onSearch(cityName);
  };

  return (
    <div className="card mb-6">
      <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name (e.g., London, Paris, Tokyo)"
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !city.trim()}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </form>
      
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-500 self-center mr-2">Popular cities:</span>
        {popularCities.map((popularCity) => (
          <button
            key={popularCity}
            onClick={() => handleCityClick(popularCity)}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-lg transition-all"
            disabled={loading}
          >
            {popularCity}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;