import React, { useState, useCallback } from 'react';
import { Cloud } from 'lucide-react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherImpact from './components/WeatherImpact';
import BestTimeRecommendation from './components/BestTimeRecommendation';
import WeatherComparison from './components/WeatherComparison';
import DetailedWeatherInfo from './components/DetailedWeatherInfo';
import HourlyForecast from './components/HourlyForecast';
import WeatherStats from './components/WeatherStats';
import ForecastChart from './components/ForecastChart';
import FileUpload from './components/FileUpload';
import WeatherBackground from './components/WeatherBackground';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { weatherAPI } from './services/api';
import { debounce } from './utils/helpers';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCity, setLastSearchedCity] = useState('');


  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (city) => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await weatherAPI.getWeather(city);
        setWeatherData(data);
        setLastSearchedCity(city);
        setForecastData(data.forecast || []);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
        setForecastData([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleSearch = (city) => {
    debouncedSearch(city);
  };

  const handleRefresh = () => {
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Weather Background */}
      <WeatherBackground 
        condition={weatherData?.condition}
        temperature={weatherData?.temperature}
        humidity={weatherData?.humidity}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">
              Weather Analytics Dashboard
            </h1>
          </div>
          <p className="text-white text-lg">
            Real-time weather data and analytics for any city worldwide
          </p>
        </header>

        {/* Search Bar */}
        <SearchBar 
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          loading={loading}
        />

        {/* Error Message */}
        {error && (
          <ErrorMessage 
            message={error}
            onClose={clearError}
          />
        )}

        {/* Loading State */}
        {loading && (
          <LoadingSpinner message="Fetching weather data..." />
        )}

        {/* Weather Content */}
        {!loading && weatherData && (
          <div className="space-y-6">
            {/* Main Weather Card */}
            <WeatherCard weatherData={weatherData} />
            
            {/* UNIQUE: How Weather Affects You */}
            <WeatherImpact weatherData={weatherData} />
            
            {/* UNIQUE: Best Time for Activities */}
            <BestTimeRecommendation weatherData={weatherData} />
            
            {/* UNIQUE: Weather Comparison with Yesterday */}
            <WeatherComparison weatherData={weatherData} />
            
            {/* Weather Statistics */}
            <WeatherStats weatherData={weatherData} />
            
            {/* Detailed Information */}
            <DetailedWeatherInfo weatherData={weatherData} />
            
            {/* Hourly Forecast */}
            <HourlyForecast weatherData={weatherData} />
            
            {/* 5-Day Forecast */}
            <ForecastChart forecastData={forecastData} />
            
            {/* File Upload */}
            <FileUpload />
          </div>
        )}

        {/* Welcome State */}
        {!loading && !weatherData && !error && (
          <div className="text-center py-16">
            <Cloud className="w-24 h-24 text-white mx-auto mb-6 opacity-80" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              Welcome to Weather Analytics
            </h2>
            <p className="text-white mb-8 max-w-md mx-auto">
              Search for any city to get real-time weather data, forecasts, and analytics.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-16 py-8 border-t border-white/20">
          <p className="text-white">
            Weather Analytics Dashboard
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;