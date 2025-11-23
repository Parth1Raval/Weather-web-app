# 🚀 Deployment Guide

## Step 1: Deploy Backend on Vercel
1. Go to https://vercel.com
2. Import your GitHub repo
3. Add environment variables (use your actual values):
   - OPENWEATHER_API_KEY
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_REGION
   - S3_BUCKET_NAME
4. Deploy

## Step 2: Deploy Frontend on Vercel
1. Import frontend folder
2. Add environment variable:
   - REACT_APP_API_BASE_URL = your_backend_url
3. Deploy

Done! Your app runs 24/7 automatically.