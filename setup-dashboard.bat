@echo off
echo ========================================
echo Weather Dashboard Setup Script
echo ========================================
echo.

echo Installing frontend dependencies...
cd frontend\weather-dashboard
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Installing backend dependencies...
cd ..\..\backend
call npm install cors
if %errorlevel% neq 0 (
    echo Error: Failed to install CORS package
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the dashboard:
echo 1. Start backend: cd backend && npm start
echo 2. Start frontend: cd frontend\weather-dashboard && npm start
echo.
echo Frontend will be available at: http://localhost:3001
echo Backend API will be available at: http://localhost:3000
echo.
pause