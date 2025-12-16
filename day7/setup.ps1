# setup.ps1
Write-Host "Setting up the project..." -ForegroundColor Cyan

# Create output directory if it doesn't exist
if (-not (Test-Path "output")) {
    Write-Host "Creating output directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "output" | Out-Null
}

# Copy processed_data.json to output directory if it exists in web folder
if ((Test-Path "web\processed_data.json") -and (-not (Test-Path "output\processed_data.json"))) {
    Write-Host "Copying processed_data.json to output directory..." -ForegroundColor Yellow
    Copy-Item "web\processed_data.json" "output\"
}

Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "To start the server, run: .\Simple-HTTP-Server.ps1" -ForegroundColor Cyan
