import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatDate } from '../utils/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ForecastChart = ({ forecastData }) => {
  if (!forecastData || !forecastData.length) {
    return (
      <div className="card">
        <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
        <div className="text-center py-8 text-gray-500">
          No forecast data available
        </div>
      </div>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '5-Day Temperature Forecast',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  const data = {
    labels: forecastData.map(item => formatDate(item.date)),
    datasets: [
      {
        label: 'High Temperature',
        data: forecastData.map(item => item.high || item.temperature),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Low Temperature',
        data: forecastData.map(item => item.low || item.temperature - 5),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
      <div className="h-80">
        <Line options={options} data={data} />
      </div>
      
      {/* Forecast cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
        {forecastData.slice(0, 5).map((day, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm font-medium text-gray-600 mb-1">
              {formatDate(day.date)}
            </div>
            <div className="text-2xl mb-1">
              {day.icon || '🌤️'}
            </div>
            <div className="text-sm text-gray-800">
              <div className="font-semibold">{Math.round(day.high || day.temperature)}°</div>
              <div className="text-gray-500">{Math.round(day.low || day.temperature - 5)}°</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastChart;