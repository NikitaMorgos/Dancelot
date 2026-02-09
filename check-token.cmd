@echo off
cd /d "%~dp0"
set "LOG=%~dp0token-check-log.txt"

set "NODE_DIR="
if exist "C:\Program Files\nodejs\node.exe" set "NODE_DIR=C:\Program Files\nodejs"
if exist "%LOCALAPPDATA%\Programs\node\node.exe" set "NODE_DIR=%LOCALAPPDATA%\Programs\node"
if not defined NODE_DIR (
    echo Node.js не найден. > "%LOG%"
    start notepad "%LOG%"
    exit /b 1
)
set "PATH=%NODE_DIR%;%PATH%"

node check-token.mjs > "%LOG%" 2>&1
start notepad "%LOG%"
