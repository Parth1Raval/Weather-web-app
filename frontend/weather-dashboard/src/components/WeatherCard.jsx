import React from 'react';
import { MapPin, Thermometer, Droplets, Wind } from 'lucide-react';
import { formatTemperature, formatHumidity, formatWindSpeed, getWeatherIcon } from '../utils/helpers';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { city, temperature, humidity, windSpeed, condition, country, feelsLike } = weatherData;

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <h2 className="text-2xl font-bold text-gray-800">
            {city}{country && `, ${country}`}
          </h2>
        </div>
        <div className="text-4xl">
          {getWeatherIcon(condition)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium text-gray-600">Temperature</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {formatTemperature(temperature)}
          </div>
          {feelsLike && (
            <div className="text-xs text-gray-500 mt-1">Feels like {formatTemperature(feelsLike)}</div>
          )}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Humidity</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {formatHumidity(humidity)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600">Wind Speed</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {formatWindSpeed(windSpeed)}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{getWeatherIcon(condition)}</span>
            <span className="text-sm font-medium text-gray-600">Condition</span>
          </div>
          <div className="text-lg font-bold text-purple-600 capitalize">
            {condition}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;