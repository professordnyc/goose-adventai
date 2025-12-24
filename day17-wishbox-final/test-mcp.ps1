# Test MCP Server
$body = @{
    jsonrpc = "2.0"
    id = 1
    method = "initialize"
    params = @{}
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/mcp" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✅ Initialize Response:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

Write-Host "`n---`n"

# Test tools/list
$body2 = @{
    jsonrpc = "2.0"
    id = 2
    method = "tools/list"
    params = @{}
} | ConvertTo-Json

try {
    $response2 = Invoke-RestMethod -Uri "http://localhost:3000/mcp" -Method Post -Body $body2 -ContentType "application/json"
    Write-Host "✅ Tools List Response:" -ForegroundColor Green
    $response2 | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

Write-Host "`n---`n"

# Test addWish
$body3 = @{
    jsonrpc = "2.0"
    id = 3
    method = "tools/call"
    params = @{
        name = "addWish"
        arguments = @{
            text = "I wish for a white Christmas"
            category = "magic"
            priority = "dream"
        }
    }
} | ConvertTo-Json -Depth 10

try {
    $response3 = Invoke-RestMethod -Uri "http://localhost:3000/mcp" -Method Post -Body $body3 -ContentType "application/json"
    Write-Host "✅ Add Wish Response:" -ForegroundColor Green
    $response3 | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
