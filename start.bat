@echo off

REM Run test.py
start cmd /c "python test.py"
echo Started test.py, waiting 3 seconds...
timeout /t 3 /nobreak

REM Run backend
start cmd /c "cd backend && npm run dev"
echo Started backend, waiting 5 seconds...
timeout /t 5 /nobreak

REM Run frontend (this will stay open)
cd frontend
start cmd /c "npm run dev"
timeout /t 5 /nobreak
start "" "http://localhost:3000"