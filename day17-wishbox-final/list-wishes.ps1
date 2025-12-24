# List all wishes in the wishbox
$body = @{
    jsonrpc = "2.0"
    id = 4
    method = "tools/call"
    params = @{
        name = "listWishes"
        arguments = @{}
    }
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/mcp" -Method Post -Body $body -ContentType "application/json"
    
    Write-Host "`n✨ ==============================================" -ForegroundColor Cyan
    Write-Host "   WINTER FAIRY WISHBOX - All Wishes" -ForegroundColor Yellow
    Write-Host "   ==============================================" -ForegroundColor Cyan
    
    # Extract text summary
    $textContent = $response.result.content | Where-Object { $_.type -eq "text" }
    Write-Host "`n$($textContent.text)" -ForegroundColor Green
    
    # Save HTML to file for viewing
    $htmlContent = $response.result.content | Where-Object { $_.type -eq "html" }
    if ($htmlContent) {
        $htmlPath = "wishbox-ui.html"
        $htmlContent.html | Out-File -FilePath $htmlPath -Encoding utf8
        Write-Host "`n💫 Beautiful UI saved to: $htmlPath" -ForegroundColor Magenta
        Write-Host "   Open this file in a browser to see the magical interface!" -ForegroundColor White
    }
    
    Write-Host "`n✨ =============================================`n" -ForegroundColor Cyan
    
} catch {
    Write-Host "❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
