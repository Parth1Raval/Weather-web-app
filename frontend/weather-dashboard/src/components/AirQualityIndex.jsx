import React, { useState, useEffect } from 'react';
import { Leaf, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const AirQualityIndex = ({ city }) => {
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city) {
      fetchAQI();
    }
  }, [city]);

  const fetchAQI = () => {
    setLoading(true);
    // Simulate AQI data
    setTimeout(() => {
      const aqi = Math.floor(Math.random() * 300) + 1;
      setAqiData({
        aqi,
        level: getAQILevel(aqi),
        pollutants: {
          pm25: Math.floor(Math.random() * 100),
          pm10: Math.floor(Math.random() * 150),
          o3: Math.floor(Math.random() * 200),
          no2: Math.floor(Math.random() * 100),
          so2: Math.floor(Math.random() * 50),
          co: Math.floor(Math.random() * 10)
        }
      });
      setLoading(false);
    }, 1000);
  };

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { name: 'Good', color: 'emerald', icon: CheckCircle };
    if (aqi <= 100) return { name: 'Moderate', color: 'yellow', icon: AlertTriangle };
    if (aqi <= 150) return { name: 'Unhealthy for Sensitive', color: 'orange', icon: AlertTriangle };
    if (aqi <= 200) return { name: 'Unhealthy', color: 'red', icon: XCircle };
    if (aqi <= 300) return { name: 'Very Unhealthy', color: 'purple', icon: XCircle };
    return { name: 'Hazardous', color: 'red', icon: XCircle };
  };

  const getColorClass = (color) => {
    const colors = {
      emerald: 'from-emerald-500 to-green-600',
      yellow: 'from-yellow-400 to-orange-500',
      orange: 'from-orange-500 to-red-500',
      red: 'from-red-500 to-red-700',
      purple: 'from-purple-500 to-purple-700'
    };
    return colors[color] || colors.emerald;
  };

  if (loading) {
    return (
      <div className="premium-card">
        <div className="flex items-center gap-3 mb-4">
          <Leaf className="w-6 h-6 text-emerald-400 animate-pulse" />
          <h3 className="text-xl font-bold text-white">Air Quality Index</h3>
        </div>
        <div className="animate-pulse">
          <div className="h-20 bg-white/10 rounded-lg mb-4"></div>
          <div className="space-y-2">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-4 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!aqiData) return null;

  const IconComponent = aqiData.level.icon;

  return (
    <div className="premium-card">
      <div className="flex items-center gap-3 mb-6">
        <Leaf className="w-6 h-6 text-emerald-400" />
        <h3 className="text-xl font-bold text-white">Air Quality Index</h3>
      </div>

      {/* AQI Score */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br ${getColorClass(aqiData.level.color)} mb-3`}>
          <span className="text-2xl font-bold text-white">{aqiData.aqi}</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <IconComponent className={`w-5 h-5 text-${aqiData.level.color}-400`} />
          <span className="text-lg font-semibold text-white">{aqiData.level.name}</span>
        </div>
      </div>

      {/* Pollutants */}
      <div className="space-y-3">
        {Object.entries(aqiData.pollutants).map(([pollutant, value]) => (
          <div key={pollutant} className="flex items-center justify-between">
            <span className="text-gray-300 uppercase text-sm font-medium">
              {pollutant === 'pm25' ? 'PM2.5' : 
               pollutant === 'pm10' ? 'PM10' : 
               pollutant.toUpperCase()}
            </span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getColorClass(getAQILevel(value).color)} transition-all duration-500`}
                  style={{ width: `${Math.min(value / 2, 100)}%` }}
                ></div>
              </div>
              <span className="text-white text-sm font-medium w-8">{value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Health Recommendation */}
      <div className="mt-4 p-3 bg-white/10 rounded-lg">
        <p className="text-xs text-gray-300">
          {aqiData.aqi <= 50 ? 'Air quality is satisfactory. Enjoy outdoor activities!' :
           aqiData.aqi <= 100 ? 'Moderate air quality. Sensitive individuals should limit outdoor exposure.' :
           aqiData.aqi <= 150 ? 'Unhealthy for sensitive groups. Consider reducing outdoor activities.' :
           'Poor air quality. Limit outdoor exposure and wear a mask if necessary.'}
        </p>
      </div>
    </div>
  );
};

export default AirQualityIndex;