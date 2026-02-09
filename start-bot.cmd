@echo off
cd /d "%~dp0"
set "LOG=%~dp0bot-log.txt"

echo [%date% %time%] Start > "%LOG%"
echo. >> "%LOG%"

set "NODE_DIR="
if exist "C:\Program Files\nodejs\node.exe" set "NODE_DIR=C:\Program Files\nodejs"
if exist "%LOCALAPPDATA%\Programs\node\node.exe" set "NODE_DIR=%LOCALAPPDATA%\Programs\node"
if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODE_DIR=%ProgramFiles(x86)%\nodejs"

if not defined NODE_DIR (
    echo Node.js не найден. Установите с https://nodejs.org >> "%LOG%"
    start notepad "%LOG%"
    exit /b 1
)

set "PATH=%NODE_DIR%;%PATH%"
echo Node: %NODE_DIR% >> "%LOG%"
echo Запуск бота... >> "%LOG%"
echo. >> "%LOG%"

npm run bot >> "%LOG%" 2>&1
echo. >> "%LOG%"
echo Exit code: %ERRORLEVEL% >> "%LOG%"
echo. >> "%LOG%"
echo Готово. Лог сохранён в bot-log.txt >> "%LOG%"

start notepad "%LOG%"
