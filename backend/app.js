// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fetch = require('node-fetch');
const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000',
    'https://parth-weather-backend.vercel.app',
    /\.vercel\.app$/  // Allow all Vercel deployments
  ],
  credentials: true
}));

// Enable JSON body parsing for API requests
app.use(express.json());

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Route: Upload a simple text file to S3 (POST /upload)
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory for S3 upload

// Upload route: POST /upload (with a file)
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded!" });
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    res.status(200).json({ message: 'File uploaded to S3!', filename: req.file.originalname });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Download file from S3 (GET /download?filename=test.txt)
// Improved S3 Download: Forces file download in browser
app.get('/download', async (req, res) => {
  try {
    const filename = req.query.filename;
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename
    };
    const command = new GetObjectCommand(params);
    const data = await s3.send(command);

    // Set download headers to force download in browser
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    data.Body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Weather API proxy (GET /weather?city=Delhi)
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: 'City is required!' });
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const weatherData = await response.json();
    
    if (weatherData.cod !== 200) {
      return res.status(400).json({ error: weatherData.message || 'City not found' });
    }
    
    // Get 5-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    
    // Format current weather data
    const formattedData = {
      city: weatherData.name,
      country: weatherData.sys?.country,
      temperature: Math.round(weatherData.main.temp),
      feelsLike: Math.round(weatherData.main.feels_like),
      humidity: Math.round(weatherData.main.humidity),
      pressure: weatherData.main.pressure,
      windSpeed: Math.round(weatherData.wind?.speed * 3.6), // Convert m/s to km/h
      windDirection: weatherData.wind?.deg,
      visibility: Math.round(weatherData.visibility / 1000), // Convert to km
      condition: weatherData.weather[0]?.description || 'unknown',
      icon: weatherData.weather[0]?.icon,
      sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
      timezone: weatherData.timezone,
      coordinates: {
        lat: weatherData.coord.lat,
        lon: weatherData.coord.lon
      }
    };
    
    // Format forecast data (next 5 days)
    let forecast = [];
    if (forecastData.cod === '200') {
      const dailyData = {};
      
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyData[date]) {
          dailyData[date] = {
            date: item.dt_txt.split(' ')[0],
            temps: [],
            conditions: [],
            humidity: [],
            windSpeed: []
          };
        }
        dailyData[date].temps.push(item.main.temp);
        dailyData[date].conditions.push(item.weather[0].description);
        dailyData[date].humidity.push(item.main.humidity);
        dailyData[date].windSpeed.push(item.wind.speed * 3.6);
      });
      
      forecast = Object.values(dailyData).slice(0, 5).map(day => ({
        date: day.date,
        high: Math.round(Math.max(...day.temps)),
        low: Math.round(Math.min(...day.temps)),
        condition: day.conditions[0],
        humidity: Math.round(day.humidity.reduce((a, b) => a + b) / day.humidity.length),
        windSpeed: Math.round(day.windSpeed.reduce((a, b) => a + b) / day.windSpeed.length)
      }));
    }
    
    formattedData.forecast = forecast;
    res.json(formattedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Weather Dashboard API is running!');
});

module.exports = app; // Allows index.js to import this Express app