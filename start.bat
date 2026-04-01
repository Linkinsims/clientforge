@echo off
echo ========================================
echo    ClientForge - Website Builder SaaS
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo IMPORTANT: Edit .env file and add your DATABASE_URL
    echo.
)

echo Starting development server...
echo.
echo Open http://localhost:3000 in your browser
echo.
echo Demo account:
echo   Email: demo@clientforge.com
echo   Password: demo123
echo.

call npm run dev

pause
