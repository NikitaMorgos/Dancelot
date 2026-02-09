# Запуск бота с полным путём к Node (если npm не в PATH)
$nodeDir = "C:\Program Files\nodejs"
if (-not (Test-Path "$nodeDir\node.exe")) {
    Write-Host "Node.js не найден в $nodeDir. Установите Node.js с https://nodejs.org" -ForegroundColor Red
    exit 1
}
$env:Path = "$nodeDir;$env:Path"
Set-Location $PSScriptRoot
& npm run bot
