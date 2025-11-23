// cors-config.js - CORS configuration for frontend compatibility
const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:3001',  // React dev server
    'http://localhost:3000',  // Alternative React port
    'https://your-frontend-domain.vercel.app',  // Production frontend
    'https://your-frontend-domain.netlify.app'  // Alternative production
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);