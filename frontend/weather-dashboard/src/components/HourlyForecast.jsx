import React from 'react';
import { Clock } from 'lucide-react';

const HourlyForecast = ({ weatherData }) => {
  if (!weatherData) return null;

  const generateHourlyData = () => {
    const hours = [];
    const currentHour = new Date().getHours();
    const baseTemp = weatherData.temperature;
    
    for (let i = 0; i < 12; i++) {
      const hour = (currentHour + i) % 24;
      const tempVariation = Math.sin((hour - 14) / 24 * Math.PI * 2) * 5;
      hours.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        temp: Math.round(baseTemp + tempVariation),
        condition: weatherData.condition,
        icon: hour >= 6 && hour <= 18 ? '☀️' : '🌙'
      });
    }
    return hours;
  };

  const hourlyData = generateHourlyData();

  return (
    <div className="card mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-600" />
        <h3 className="text-xl font-bold text-gray-800">Hourly Forecast</h3>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {hourlyData.map((hour, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg text-center min-w-[80px]"
            >
              <div className="text-sm font-medium text-gray-600 mb-2">
                {hour.time}
              </div>
              <div className="text-2xl mb-2">
                {hour.icon}
              </div>
              <div className="text-lg font-bold text-blue-600">
                {hour.temp}°C
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;