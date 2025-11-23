# ⚡ Quick Deployment Steps

## 🎯 Simple 5-Step Deployment

### STEP 1: Push Backend to GitHub
```bash
cd backend
git init
git add .
git commit -m "Backend ready"
git remote add origin https://github.com/YOUR_USERNAME/weather-backend.git
git push -u origin main
```

### STEP 2: Deploy Backend on Vercel
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import `weather-backend` repo
4. Add Environment Variables:
   - `OPENWEATHER_API_KEY`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `S3_BUCKET_NAME`
5. Click "Deploy"
6. **Copy your backend URL**: `https://your-backend.vercel.app`

### STEP 3: Update Frontend API URL
Edit `frontend/weather-dashboard/src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
```

Create `frontend/weather-dashboard/.env`:
```
REACT_APP_API_BASE_URL=https://your-backend.vercel.app
```

### STEP 4: Push Frontend to GitHub
```bash
cd frontend/weather-dashboard
git init
git add .
git commit -m "Frontend ready"
git remote add origin https://github.com/YOUR_USERNAME/weather-frontend.git
git push -u origin main
```

### STEP 5: Deploy Frontend on Vercel
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import `weather-frontend` repo
4. Framework: Create React App
5. Add Environment Variable:
   - `REACT_APP_API_BASE_URL` = `https://your-backend.vercel.app`
6. Click "Deploy"

### STEP 6: Update Backend CORS
Edit `backend/app.js`, add your frontend URL:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app'  // Add this
  ],
  credentials: true
}));
```

Push changes:
```bash
cd backend
git add .
git commit -m "Update CORS"
git push
```

## ✅ Done!

Your app is now live at:
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`

Both run continuously 24/7 automatically!