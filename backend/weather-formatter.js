// weather-formatter.js - Format OpenWeather API response for frontend compatibility

const formatWeatherData = (openWeatherResponse) => {
  if (!openWeatherResponse || openWeatherResponse.cod !== 200) {
    throw new Error(openWeatherResponse?.message || 'Weather data not found');
  }

  const { main, weather, wind, name, sys } = openWeatherResponse;
  
  return {
    city: name,
    country: sys?.country,
    temperature: Math.round(main.temp),
    humidity: Math.round(main.humidity),
    windSpeed: Math.round(wind?.speed * 3.6), // Convert m/s to km/h
    condition: weather[0]?.description || 'unknown',
    icon: weather[0]?.icon,
    pressure: main.pressure,
    feelsLike: Math.round(main.feels_like),
    visibility: openWeatherResponse.visibility / 1000, // Convert to km
    timestamp: new Date().toISOString()
  };
};

const generateMockForecast = (currentWeather) => {
  const forecast = [];
  const baseTemp = currentWeather.temperature;
  
  for (let i = 1; i <= 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    forecast.push({
      date: date.toISOString(),
      high: baseTemp + Math.random() * 10 - 5,
      low: baseTemp - Math.random() * 10 - 5,
      condition: currentWeather.condition,
      icon: currentWeather.icon,
      humidity: currentWeather.humidity + Math.random() * 20 - 10,
      windSpeed: currentWeather.windSpeed + Math.random() * 10 - 5
    });
  }
  
  return forecast;
};

module.exports = {
  formatWeatherData,
  generateMockForecast
};