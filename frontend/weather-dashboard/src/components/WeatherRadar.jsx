import React, { useState, useEffect } from 'react';
import { Radar, Zap, Eye } from 'lucide-react';

const WeatherRadar = ({ city }) => {
  const [radarData, setRadarData] = useState([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (city) {
      simulateRadarScan();
    }
  }, [city]);

  const simulateRadarScan = () => {
    setScanning(true);
    setTimeout(() => {
      const mockData = Array.from({ length: 8 }, (_, i) => ({
        angle: i * 45,
        intensity: Math.random() * 100,
        distance: Math.random() * 200 + 50,
        type: ['rain', 'cloud', 'storm', 'clear'][Math.floor(Math.random() * 4)]
      }));
      setRadarData(mockData);
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="premium-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Radar className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">Weather Radar</h3>
        </div>
        <button
          onClick={simulateRadarScan}
          disabled={scanning}
          className="btn-glass flex items-center gap-2"
        >
          <Zap className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
          Scan
        </button>
      </div>

      <div className="relative w-full h-64 bg-black/30 rounded-xl overflow-hidden">
        {/* Radar Grid */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.3)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0)" />
            </radialGradient>
          </defs>
          
          {/* Grid circles */}
          {[25, 50, 75, 100].map(radius => (
            <circle
              key={radius}
              cx="50%"
              cy="50%"
              r={`${radius}%`}
              fill="none"
              stroke="rgba(16,185,129,0.3)"
              strokeWidth="1"
            />
          ))}
          
          {/* Grid lines */}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 45) * Math.PI / 180;
            const x2 = 50 + 50 * Math.cos(angle);
            const y2 = 50 + 50 * Math.sin(angle);
            return (
              <line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="rgba(16,185,129,0.3)"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Scanning beam */}
          {scanning && (
            <line
              x1="50%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="rgba(16,185,129,0.8)"
              strokeWidth="2"
              className="animate-spin"
              style={{ transformOrigin: '50% 50%' }}
            />
          )}
          
          {/* Weather data points */}
          {radarData.map((point, i) => {
            const angle = point.angle * Math.PI / 180;
            const distance = (point.distance / 250) * 50;
            const x = 50 + distance * Math.cos(angle);
            const y = 50 + distance * Math.sin(angle);
            
            return (
              <circle
                key={i}
                cx={`${x}%`}
                cy={`${y}%`}
                r="3"
                fill={
                  point.type === 'storm' ? '#ef4444' :
                  point.type === 'rain' ? '#3b82f6' :
                  point.type === 'cloud' ? '#6b7280' : '#10b981'
                }
                className="animate-pulse"
              />
            );
          })}
        </svg>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full"></div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span className="text-gray-300">Storm</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-gray-300">Rain</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          <span className="text-gray-300">Cloud</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-gray-300">Clear</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherRadar;