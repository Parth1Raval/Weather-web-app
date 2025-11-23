import React from 'react';
import { AlertCircle, Shirt, Coffee, Umbrella, Car, Heart, Brain, Zap } from 'lucide-react';

const WeatherImpact = ({ weatherData }) => {
  if (!weatherData) return null;

  const { temperature, humidity, windSpeed, condition } = weatherData;

  const getPersonalizedAdvice = () => {
    const advice = [];

    // Clothing recommendation
    if (temperature < 10) {
      advice.push({
        icon: Shirt,
        title: 'Wear Heavy Jacket',
        description: 'Layer up with warm clothes, scarf, and gloves',
        color: 'blue',
        priority: 'high'
      });
    } else if (temperature < 20) {
      advice.push({
        icon: Shirt,
        title: 'Light Jacket Recommended',
        description: 'A sweater or light jacket will keep you comfortable',
        color: 'cyan',
        priority: 'medium'
      });
    } else if (temperature > 30) {
      advice.push({
        icon: Shirt,
        title: 'Wear Light Clothes',
        description: 'Cotton, breathable fabrics recommended',
        color: 'orange',
        priority: 'high'
      });
    }

    // Health impact
    if (temperature > 35 || (temperature > 30 && humidity > 70)) {
      advice.push({
        icon: Heart,
        title: 'Heat Stress Risk',
        description: 'Stay hydrated, avoid outdoor activities 12-4 PM',
        color: 'red',
        priority: 'critical'
      });
    }

    if (temperature < 5) {
      advice.push({
        icon: Heart,
        title: 'Cold Weather Alert',
        description: 'Risk of hypothermia, limit outdoor exposure',
        color: 'blue',
        priority: 'critical'
      });
    }

    // Activity recommendations
    if (condition.includes('rain')) {
      advice.push({
        icon: Umbrella,
        title: 'Carry Umbrella',
        description: 'Rain expected, keep waterproof gear handy',
        color: 'blue',
        priority: 'high'
      });
    }

    if (windSpeed > 40) {
      advice.push({
        icon: Car,
        title: 'Drive Carefully',
        description: 'Strong winds may affect vehicle control',
        color: 'orange',
        priority: 'high'
      });
    }

    // Productivity impact
    if (temperature >= 20 && temperature <= 25 && humidity < 60) {
      advice.push({
        icon: Brain,
        title: 'Perfect for Productivity',
        description: 'Ideal conditions for focus and mental work',
        color: 'green',
        priority: 'low'
      });
    }

    // Energy levels
    if (humidity > 80) {
      advice.push({
        icon: Zap,
        title: 'Low Energy Expected',
        description: 'High humidity may cause fatigue, take breaks',
        color: 'yellow',
        priority: 'medium'
      });
    }

    // Morning routine
    const hour = new Date().getHours();
    if (hour >= 6 && hour <= 10 && temperature > 15) {
      advice.push({
        icon: Coffee,
        title: 'Great Morning Weather',
        description: 'Perfect for morning walk or outdoor breakfast',
        color: 'green',
        priority: 'low'
      });
    }

    return advice;
  };

  const advice = getPersonalizedAdvice();

  const colorClasses = {
    red: 'from-red-50 to-pink-50 border-red-300 text-red-700',
    orange: 'from-orange-50 to-amber-50 border-orange-300 text-orange-700',
    yellow: 'from-yellow-50 to-amber-50 border-yellow-300 text-yellow-700',
    green: 'from-green-50 to-emerald-50 border-green-300 text-green-700',
    blue: 'from-blue-50 to-cyan-50 border-blue-300 text-blue-700',
    cyan: 'from-cyan-50 to-blue-50 border-cyan-300 text-cyan-700'
  };

  const priorityBadge = {
    critical: 'bg-red-500 text-white',
    high: 'bg-orange-500 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-green-500 text-white'
  };

  return (
    <div className="card mb-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">How This Weather Affects You</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">Personalized recommendations based on current conditions</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {advice.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className={`bg-gradient-to-br ${colorClasses[item.color]} border-2 p-4 rounded-lg hover:shadow-lg transition-all`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${priorityBadge[item.priority]}`}>
                      {item.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm mt-2">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherImpact;