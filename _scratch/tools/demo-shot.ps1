param([string]$Name = "shot")
. (Join-Path $PSScriptRoot "demo-lib.ps1")
$p = Grab $Name
"$p ($([math]::Round((Get-Item $p).Length/1KB)) KB, $($script:Bounds.Width)x$($script:Bounds.Height))"
