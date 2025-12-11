<#
.SYNOPSIS
    Wrapper script for Goose CLI to generate fortunes with different moods.

.DESCRIPTION
    Accepts a mood/personality argument and pipes the output to the Day 1 outputs folder.
    This is a placeholder scaffold for Goose to expand with full logic.
#>

param(
    [string]$Mood = "festive"
)

# Define output path
$OutputDir = "day1\outputs"
$OutputFile = Join-Path $OutputDir "fortune.txt"

# Ensure output directory exists
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

# Placeholder Goose CLI command
# Goose should replace this with the actual CLI invocation
Write-Output "Running Goose CLI with mood: $Mood" | Out-File -FilePath $OutputFile -Append