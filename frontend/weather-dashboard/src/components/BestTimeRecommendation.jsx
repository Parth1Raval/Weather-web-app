import React from 'react';
import { Sun, Moon, CloudRain, Wind, Activity, Coffee } from 'lucide-react';

const BestTimeRecommendation = ({ weatherData }) => {
  if (!weatherData) return null;

  const { temperature, humidity, windSpeed, condition, sunrise, sunset } = weatherData;

  const activities = [
    {
      name: 'Morning Walk/Jog',
      icon: Activity,
      bestTime: '6:00 AM - 8:00 AM',
      reason: 'Cool temperature, fresh air, less pollution',
      suitable: temperature < 30 && !condition.includes('rain'),
      color: 'green'
    },
    {
      name: 'Outdoor Exercise',
      icon: Activity,
      bestTime: '5:00 PM - 7:00 PM',
      reason: 'Temperature drops, good for cardio',
      suitable: temperature < 35 && windSpeed < 30,
      color: 'blue'
    },
    {
      name: 'Outdoor Dining',
      icon: Coffee,
      bestTime: '7:00 PM - 9:00 PM',
      reason: 'Pleasant evening weather',
      suitable: temperature > 15 && temperature < 30 && !condition.includes('rain'),
      color: 'orange'
    },
    {
      name: 'Photography',
      icon: Sun,
      bestTime: sunrise || '6:30 AM',
      reason: 'Golden hour - best natural lighting',
      suitable: !condition.includes('rain') && !condition.includes('fog'),
      color: 'yellow'
    },
    {
      name: 'Stargazing',
      icon: Moon,
      bestTime: '9:00 PM - 11:00 PM',
      reason: 'Clear skies, low light pollution',
      suitable: condition.includes('clear') && humidity < 70,
      color: 'purple'
    },
    {
      name: 'Indoor Activities',
      icon: CloudRain,
      bestTime: 'Anytime',
      reason: 'Weather not suitable for outdoor',
      suitable: condition.includes('rain') || temperature > 35 || temperature < 5,
      color: 'gray'
    }
  ];

  const colorClasses = {
    green: 'from-green-50 to-emerald-50 border-green-300',
    blue: 'from-blue-50 to-cyan-50 border-blue-300',
    orange: 'from-orange-50 to-amber-50 border-orange-300',
    yellow: 'from-yellow-50 to-amber-50 border-yellow-300',
    purple: 'from-purple-50 to-indigo-50 border-purple-300',
    gray: 'from-gray-50 to-slate-50 border-gray-300'
  };

  const suitableActivities = activities.filter(a => a.suitable);
  const notSuitableActivities = activities.filter(a => !a.suitable);

  return (
    <div className="card mb-6">
      <h3 className="text-xl font-bold mb-2 text-gray-800">Best Time for Activities</h3>
      <p className="text-sm text-gray-600 mb-4">Optimized schedule based on today's weather</p>
      
      {suitableActivities.length > 0 && (
        <>
          <h4 className="text-md font-semibold text-green-700 mb-3">✓ Recommended Today</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {suitableActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${colorClasses[activity.color]} border-2 p-4 rounded-lg hover:shadow-md transition-all`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-800">{activity.name}</h5>
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">IDEAL</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">⏰ {activity.bestTime}</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {activity.reason}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {notSuitableActivities.length > 0 && (
        <>
          <h4 className="text-md font-semibold text-red-700 mb-3">✗ Not Recommended</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notSuitableActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-100 border-2 border-gray-300 p-4 rounded-lg opacity-60"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-gray-500" />
                    <div>
                      <h5 className="font-bold text-gray-600">{activity.name}</h5>
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">AVOID</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Weather conditions not suitable
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default BestTimeRecommendation;