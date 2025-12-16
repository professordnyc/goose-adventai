# Simple-HTTP-Server.ps1
$port = 8080
$rootDir = $PSScriptRoot

# Create a simple HTTP server
$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add("http://localhost:$port/")
$http.Start()

Write-Host "Serving at http://localhost:$port" -ForegroundColor Green
Write-Host "Web app: http://localhost:$port/web/" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow

try {
    while ($http.IsListening) {
        $context = $http.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        try {
            $path = $request.Url.LocalPath.Trim('/')
            
            # Map URLs to files
            if ($path -eq "" -or $path -eq "web") {
                $filePath = Join-Path $rootDir "web\index.html"
            }
            elseif ($path.StartsWith("web/")) {
                $filePath = Join-Path $rootDir $path.Replace("/", "\")
            }
            elseif ($path.StartsWith("output/")) {
                $filePath = Join-Path $rootDir $path.Replace("/", "\")
            }
            else {
                $filePath = Join-Path $rootDir "web" $path
            }

            # Normalize path
            $filePath = [System.IO.Path]::GetFullPath($filePath)
            
            # Check if file exists
            if (Test-Path $filePath -PathType Leaf) {
                $content = [System.IO.File]::ReadAllBytes($filePath)
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                
                $contentType = switch ($ext) {
                    ".html" { "text/html" }
                    ".css"  { "text/css" }
                    ".js"   { "application/javascript" }
                    ".json" { "application/json" }
                    default { "application/octet-stream" }
                }
                
                $response.ContentType = $contentType
                $response.OutputStream.Write($content, 0, $content.Length)
            }
            else {
                $response.StatusCode = 404
                $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
                $response.OutputStream.Write($notFound, 0, $notFound.Length)
            }
        }
        catch {
            $response.StatusCode = 500
            $errorMsg = [System.Text.Encoding]::UTF8.GetBytes("500 Internal Server Error: $_")
            $response.OutputStream.Write($errorMsg, 0, $errorMsg.Length)
        }
        finally {
            $response.Close()
        }
    }
}
finally {
    $http.Stop()
}
