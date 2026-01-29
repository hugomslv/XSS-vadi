@echo off
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║           🔓 XSS VADI - Démonstration pédagogique 🔓          ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo 📡 Détection de votre IP...
echo.

REM Détecter l'IP IPv4
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"Adresse IPv4"') do (
    set IP=%%a
    goto :found
)

:found
echo ✅ IP détectée : %IP%
echo.
echo 🌐 URL pour vos élèves :
echo    http://%IP%:3000
echo.
echo 👨‍💼 URL admin (sur votre PC) :
echo    http://localhost:3000/admin
echo.
echo ⚠️  Assurez-vous que le firewall autorise le port 3000
echo.
echo 🚀 Démarrage du serveur...
echo.

node server.js

pause
