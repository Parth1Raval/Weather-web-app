// app-enhanced.js - Enhanced backend with frontend compatibility
require('dotenv').config();
const express = require('express');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fetch = require('node-fetch');
const multer = require('multer');
const corsConfig = require('./cors-config');
const { formatWeatherData, generateMockForecast } = require('./weather-formatter');

const app = express();

// Middleware
app.use(corsConfig); // Enable CORS for frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// S3 Configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Multer configuration for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow common file types
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'));
    }
  }
});

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Weather Dashboard API is running!',
    version: '1.0.0',
    endpoints: {
      weather: 'GET /weather?city=<cityname>',
      upload: 'POST /upload (multipart/form-data)',
      download: 'GET /download?filename=<filename>'
    }
  });
});

// Weather API with enhanced error handling
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  
  if (!city) {
    return res.status(400).json({ 
      error: 'City parameter is required',
      message: 'Please provide a city name in the query parameter'
    });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenWeather API key not configured');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const weatherData = await response.json();

    if (!response.ok) {
      throw new Error(weatherData.message || 'Failed to fetch weather data');
    }

    // Format data for frontend compatibility
    const formattedData = formatWeatherData(weatherData);
    
    // Add mock forecast for demo purposes
    const forecast = generateMockForecast(formattedData);
    
    res.json({
      ...formattedData,
      forecast
    });

  } catch (err) {
    console.error('Weather API Error:', err.message);
    res.status(500).json({ 
      error: 'Weather data unavailable',
      message: err.message.includes('city not found') 
        ? 'City not found. Please check the spelling and try again.'
        : 'Unable to fetch weather data. Please try again later.'
    });
  }
});

// File upload with enhanced error handling
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No file uploaded',
        message: 'Please select a file to upload'
      });
    }

    if (!process.env.S3_BUCKET_NAME) {
      throw new Error('S3 bucket not configured');
    }

    // Generate unique filename to prevent conflicts
    const timestamp = Date.now();
    const filename = `${timestamp}-${req.file.originalname}`;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      Metadata: {
        originalName: req.file.originalname,
        uploadDate: new Date().toISOString()
      }
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    res.status(200).json({ 
      message: 'File uploaded successfully!',
      filename: filename,
      originalName: req.file.originalname,
      size: req.file.size,
      uploadDate: new Date().toISOString()
    });

  } catch (err) {
    console.error('Upload Error:', err.message);
    res.status(500).json({ 
      error: 'Upload failed',
      message: err.message.includes('bucket') 
        ? 'S3 storage not available. Please try again later.'
        : 'Failed to upload file. Please try again.'
    });
  }
});

// File download with enhanced error handling
app.get('/download', async (req, res) => {
  try {
    const filename = req.query.filename;
    
    if (!filename) {
      return res.status(400).json({ 
        error: 'Filename required',
        message: 'Please provide a filename parameter'
      });
    }

    if (!process.env.S3_BUCKET_NAME) {
      throw new Error('S3 bucket not configured');
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename
    };

    const command = new GetObjectCommand(params);
    const data = await s3.send(command);

    // Set appropriate headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', data.ContentType || 'application/octet-stream');
    res.setHeader('Content-Length', data.ContentLength);

    // Stream the file data
    data.Body.pipe(res);

  } catch (err) {
    console.error('Download Error:', err.message);
    
    if (err.name === 'NoSuchKey') {
      res.status(404).json({ 
        error: 'File not found',
        message: 'The requested file does not exist'
      });
    } else {
      res.status(500).json({ 
        error: 'Download failed',
        message: 'Unable to download file. Please try again later.'
      });
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong. Please try again later.'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: 'The requested endpoint does not exist'
  });
});

module.exports = app;