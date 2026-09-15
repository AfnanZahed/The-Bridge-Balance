@echo off
title Bridge Balance - localhost:3000
cd /d "%~dp0"
echo Starting Docusaurus dev server on port 3000...
call npm start -- --port 3000
pause
