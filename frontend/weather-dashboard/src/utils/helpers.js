// Format temperature with unit
export const formatTemperature = (temp, unit = 'C') => {
  return `${Math.round(temp)}°${unit}`;
};

// Format wind speed
export const formatWindSpeed = (speed) => {
  return `${Math.round(speed)} km/h`;
};

// Format humidity
export const formatHumidity = (humidity) => {
  return `${Math.round(humidity)}%`;
};

// Get weather icon based on condition
export const getWeatherIcon = (condition) => {
  if (!condition) return '🌤️';
  
  const normalizedCondition = condition.toLowerCase();
  
  if (normalizedCondition.includes('clear') || normalizedCondition.includes('sunny')) return '☀️';
  if (normalizedCondition.includes('partly cloudy') || normalizedCondition.includes('few clouds')) return '⛅';
  if (normalizedCondition.includes('cloudy') || normalizedCondition.includes('overcast') || normalizedCondition.includes('scattered clouds') || normalizedCondition.includes('broken clouds')) return '☁️';
  if (normalizedCondition.includes('rain') || normalizedCondition.includes('shower')) return '🌧️';
  if (normalizedCondition.includes('drizzle') || normalizedCondition.includes('light rain')) return '🌦️';
  if (normalizedCondition.includes('snow') || normalizedCondition.includes('blizzard')) return '❄️';
  if (normalizedCondition.includes('thunder') || normalizedCondition.includes('storm')) return '⛈️';
  if (normalizedCondition.includes('fog') || normalizedCondition.includes('mist') || normalizedCondition.includes('haze')) return '🌫️';
  if (normalizedCondition.includes('wind')) return '💨';
  
  return '🌤️';
};

// Format date for forecast
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Download file helper
export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};