import React from 'react';

const WeatherBackground = ({ condition, temperature, humidity }) => {
  const getWeatherBackground = () => {
    const normalizedCondition = condition?.toLowerCase() || '';
    
    if (normalizedCondition.includes('rain') || normalizedCondition.includes('drizzle')) {
      return 'rainy';
    }
    if (normalizedCondition.includes('snow') || normalizedCondition.includes('blizzard')) {
      return 'snowy';
    }
    if (normalizedCondition.includes('cloud') || normalizedCondition.includes('overcast')) {
      return 'cloudy';
    }
    if (normalizedCondition.includes('clear') || normalizedCondition.includes('sunny')) {
      return temperature > 25 ? 'sunny' : 'clear';
    }
    if (normalizedCondition.includes('fog') || normalizedCondition.includes('mist') || humidity > 85) {
      return 'foggy';
    }
    if (normalizedCondition.includes('storm') || normalizedCondition.includes('thunder')) {
      return 'stormy';
    }
    
    return 'default';
  };

  const weatherType = getWeatherBackground();

  const backgrounds = {
    sunny: 'bg-gradient-to-br from-amber-300 via-orange-400 to-red-400',
    clear: 'bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500',
    cloudy: 'bg-gradient-to-br from-slate-300 via-gray-400 to-slate-500',
    rainy: 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800',
    snowy: 'bg-gradient-to-br from-slate-200 via-blue-100 to-slate-300',
    foggy: 'bg-gradient-to-br from-gray-200 via-slate-300 to-gray-400',
    stormy: 'bg-gradient-to-br from-slate-800 via-gray-900 to-black',
    default: 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800'
  };

  const animations = {
    sunny: (
      <>
        <div className="absolute top-4 right-4 md:top-10 md:right-10 w-16 h-16 md:w-32 md:h-32 bg-yellow-300/40 rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-8 md:top-20 md:right-20 w-8 h-8 md:w-16 md:h-16 bg-orange-400/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 left-10 w-12 h-12 md:w-24 md:h-24 bg-amber-300/20 rounded-full animate-pulse delay-1000"></div>
      </>
    ),
    rainy: (
      <>
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-4 md:h-8 bg-blue-200/70 opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `fall ${0.5 + Math.random() * 0.5}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        <style jsx>{`
          @keyframes fall {
            to { transform: translateY(100vh); }
          }
        `}</style>
      </>
    ),
    snowy: (
      <>
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-white rounded-full opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `snowfall ${2 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
        <style jsx>{`
          @keyframes snowfall {
            to { transform: translateY(100vh) rotate(360deg); }
          }
        `}</style>
      </>
    ),
    cloudy: (
      <>
        <div className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-gray-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 md:w-80 md:h-80 bg-gray-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-64 md:h-64 bg-slate-300/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </>
    ),
    stormy: (
      <>
        <div className="absolute top-1/4 left-1/4 w-1 h-10 md:w-2 md:h-20 bg-yellow-300 opacity-90" style={{ animation: 'lightning 0.1s infinite' }}></div>
        <div className="absolute top-3/4 right-1/3 w-0.5 h-8 md:w-1 md:h-16 bg-white opacity-80" style={{ animation: 'lightning 0.2s infinite', animationDelay: '0.5s' }}></div>
        <div className="absolute inset-0 bg-black/20 animate-pulse"></div>
        <style jsx>{`
          @keyframes lightning {
            0%, 90%, 100% { opacity: 0; }
            5%, 85% { opacity: 1; }
          }
        `}</style>
      </>
    ),
    foggy: (
      <>
        <div className="absolute inset-0 bg-gray-200/20 backdrop-blur-sm"></div>
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-gray-300/30 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-300/20 to-transparent"></div>
      </>
    ),
    clear: (
      <>
        <div className="absolute top-6 right-6 md:top-12 md:right-12 w-20 h-20 md:w-40 md:h-40 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 w-16 h-16 md:w-32 md:h-32 bg-indigo-200/20 rounded-full animate-pulse delay-1000"></div>
      </>
    )
  };

  return (
    <div className={`fixed inset-0 transition-all duration-1000 ${backgrounds[weatherType]} overflow-hidden`}>
      {animations[weatherType] || animations.default}
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  );
};

export default WeatherBackground;