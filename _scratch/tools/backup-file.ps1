param([Parameter(Mandatory=$true, ValueFromRemainingArguments=$true)][string[]]$RelPath)
$root = 'C:/Users/Dell/Desktop/Book'
$dest = Join-Path $root '_scratch/backup-2026-09-22-agentic-inside-se-6'
foreach ($rel in $RelPath) {
  $r = $rel -replace '\\', '/'
  $src = Join-Path $root $r
  if (-not (Test-Path -LiteralPath $src)) { Write-Output "MISSING SOURCE: $r"; continue }
  $target = Join-Path $dest $r
  if (Test-Path -LiteralPath $target) { Write-Output "SKIP (backup exists): $r"; continue }
  $dir = Split-Path -Parent $target
  if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  Copy-Item -LiteralPath $src -Destination $target
  Write-Output "BACKED UP: $r"
}
