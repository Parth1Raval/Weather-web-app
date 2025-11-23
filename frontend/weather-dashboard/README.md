# Weather Analytics Dashboard

A professional, real-time weather analytics dashboard built with React.js, TailwindCSS, and Chart.js. Features city weather search, 5-day forecasts, and S3 file management integration.

## 🚀 Features

- **Real-time Weather Data**: Search any city for current weather conditions
- **Interactive Forecasts**: 5-day weather forecast with Chart.js visualizations
- **File Management**: Upload weather reports/images to S3 and download files
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Error Handling**: Comprehensive error states and loading indicators
- **Professional UI**: Modern, clean interface optimized for demos

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running backend API at `http://localhost:3000`

## 🛠️ Installation & Setup

### 1. Install Dependencies
```bash
cd frontend/weather-dashboard
npm install
```

### 2. Environment Configuration
```bash
# Copy environment template
copy .env.example .env

# Update .env with your backend URL if different from localhost:3000
REACT_APP_API_BASE_URL=http://localhost:3000
```

### 3. Start Development Server
```bash
npm start
```

The dashboard will open at `http://localhost:3001` (or next available port).

## 🔧 Backend API Requirements

Your backend should provide these endpoints:

### Weather API
- `GET /weather?city=<cityname>` - Returns weather data
  ```json
  {
    "city": "London",
    "country": "UK",
    "temperature": 22,
    "humidity": 65,
    "windSpeed": 15,
    "condition": "partly cloudy"
  }
  ```

### File Upload API
- `POST /upload` - Upload file (multipart/form-data, key="file")
- `GET /download?filename=<filename>` - Download file from S3

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# REACT_APP_API_BASE_URL=https://your-backend-url.com
```

### Netlify Deployment
```bash
# Build the project
npm run build

# Deploy build folder to Netlify
# Set environment variable: REACT_APP_API_BASE_URL=https://your-backend-url.com
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── SearchBar.jsx   # City search functionality
│   ├── WeatherCard.jsx # Current weather display
│   ├── ForecastChart.jsx # 5-day forecast chart
│   ├── FileUpload.jsx  # S3 file management
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
├── services/
│   └── api.js          # API service layer
├── utils/
│   └── helpers.js      # Utility functions
├── App.jsx             # Main application
├── index.js            # Entry point
└── index.css           # Global styles
```

## 🔧 Configuration

### CORS Setup
Ensure your backend allows requests from your frontend domain:
```javascript
// Backend CORS configuration
app.use(cors({
  origin: ['http://localhost:3001', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

### API Error Handling
The dashboard handles common API errors:
- Network connectivity issues
- Invalid city names
- File upload failures
- CORS errors

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for global styles
- Component styles use TailwindCSS utility classes

### API Integration
- Update `src/services/api.js` for different backend endpoints
- Modify data transformation in utility functions

## 📊 Chart Configuration

The forecast chart uses Chart.js with these features:
- Responsive design
- Temperature trend lines
- Interactive tooltips
- Mobile-optimized controls

## 🔒 Security Best Practices

- Environment variables for API URLs
- Input validation and sanitization
- Error message sanitization
- File upload restrictions
- HTTPS enforcement in production

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured correctly
   - Check API base URL in environment variables

2. **API Connection Failed**
   - Verify backend is running on correct port
   - Check network connectivity
   - Validate API endpoint URLs

3. **File Upload Issues**
   - Confirm backend accepts multipart/form-data
   - Check file size limits
   - Verify S3 configuration on backend

### Debug Mode
Enable detailed logging by adding to `.env`:
```
REACT_APP_DEBUG=true
```

## 📝 License

MIT License - feel free to use for personal and commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

**Ready for Production**: This dashboard is optimized for live demos and production deployment with professional UI/UX and robust error handling.