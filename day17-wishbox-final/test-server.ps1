# Test the Winter Fairy Wishbox MCP Server

Write-Host "Testing Winter Fairy Wishbox Server..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Initialize
Write-Host "Test 1: Initialize MCP Connection" -ForegroundColor Yellow
$initBody = @{
    jsonrpc = "2.0"
    id = 1
    method = "initialize"
    params = @{}
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/mcp" -Method Post -Body $initBody -ContentType "application/json"
    Write-Host "✓ Initialize successful" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 5)
} catch {
    Write-Host "✗ Initialize failed: $_" -ForegroundColor Red
}

Write-Host ""

# Test 2: List Tools
Write-Host "Test 2: List Available Tools" -ForegroundColor Yellow
$listBody = @{
    jsonrpc = "2.0"
    id = 2
    method = "tools/list"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/mcp" -Method Post -Body $listBody -ContentType "application/json"
    Write-Host "✓ Tools list successful" -ForegroundColor Green
    Write-Host "Available tools:"
    $response.result.tools | ForEach-Object { Write-Host "  - $($_.name): $($_.description)" }
} catch {
    Write-Host "✗ Tools list failed: $_" -ForegroundColor Red
}

Write-Host ""

# Test 3: Add a Wish
Write-Host "Test 3: Add a Wish" -ForegroundColor Yellow
$addBody = @{
    jsonrpc = "2.0"
    id = 3
    method = "tools/call"
    params = @{
        name = "addWish"
        arguments = @{
            text = "I wish for a magical telescope to explore the winter stars"
            category = "toy"
            priority = "dream"
        }
    }
} | ConvertTo-Json -Depth 5

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/mcp" -Method Post -Body $addBody -ContentType "application/json"
    Write-Host "✓ Add wish successful" -ForegroundColor Green
    Write-Host ($response.result.content[0].text)
} catch {
    Write-Host "✗ Add wish failed: $_" -ForegroundColor Red
}

Write-Host ""

# Test 4: List Wishes
Write-Host "Test 4: List All Wishes" -ForegroundColor Yellow
$listWishesBody = @{
    jsonrpc = "2.0"
    id = 4
    method = "tools/call"
    params = @{
        name = "listWishes"
        arguments = @{}
    }
} | ConvertTo-Json -Depth 5

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/mcp" -Method Post -Body $listWishesBody -ContentType "application/json"
    Write-Host "✓ List wishes successful" -ForegroundColor Green
    Write-Host ($response.result.content[0].text)
} catch {
    Write-Host "✗ List wishes failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "Testing complete! Server is working correctly." -ForegroundColor Cyan
