# start_server.ps1 - Robust server starter
param(
    [int]$Port = 8000
)

$webPath = Join-Path $PSScriptRoot "web"

if (-not (Test-Path $webPath)) {
    Write-Host "Error: web directory not found at $webPath" -ForegroundColor Red
    exit 1
}

Write-Host "Starting HTTP server on port $Port..." -ForegroundColor Cyan
Write-Host "Serving from: $webPath" -ForegroundColor Yellow
Write-Host "Access at: http://localhost:$Port" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

Set-Location $webPath
python -m http.server $Port
