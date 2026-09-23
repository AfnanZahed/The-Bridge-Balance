param(
  [string]$Timeline = "",
  [string]$Scenes = "",
  [double]$LeadIn = 12,
  [string]$ShotDir = "",
  [string]$LogFile = "",
  [string]$Session = "bridge-demo",
  [string]$FocusTitle = "Bridge Balance",
  [int]$ClickHoldMs = 70,
  [switch]$SelfTest
)

$ErrorActionPreference = "Stop"
$script:Aborted = $false
$script:LastCmdPos = $null
$script:AssertFailures = 0
$script:AssertCount = 0
$script:AgentBrowser = "agent-browser"

if (-not $ShotDir) { $ShotDir = Join-Path (Split-Path $PSScriptRoot -Parent) "demo-shots" }
if (-not $LogFile) { $LogFile = Join-Path $ShotDir "run.log" }
New-Item -ItemType Directory -Force -Path $ShotDir | Out-Null
if (Test-Path $LogFile) { Remove-Item $LogFile -Force }

Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

$code = @'
using System;
using System.Runtime.InteropServices;
using System.Text;
public class Io {
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern bool GetCursorPos(out POINT p);
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern short GetAsyncKeyState(int vKey);
  [DllImport("user32.dll", CharSet = CharSet.Unicode)] public static extern int GetWindowText(IntPtr hWnd, StringBuilder s, int n);
  [DllImport("user32.dll")] static extern uint SendInput(uint n, INPUT[] inputs, int cbSize);
  [DllImport("user32.dll")] static extern void mouse_event(uint f, int dx, int dy, uint d, IntPtr e);
  [StructLayout(LayoutKind.Sequential)] public struct POINT { public int X; public int Y; }
  [StructLayout(LayoutKind.Sequential)] public struct INPUT { public uint type; public Union U; }
  [StructLayout(LayoutKind.Explicit)] public struct Union { [FieldOffset(0)] public KI ki; [FieldOffset(0)] public MI mi; }
  [StructLayout(LayoutKind.Sequential)] public struct KI { public ushort wVk; public ushort wScan; public uint dwFlags; public uint time; public IntPtr extra; }
  [StructLayout(LayoutKind.Sequential)] public struct MI { public int dx; public int dy; public uint mouseData; public uint dwFlags; public uint time; public IntPtr extra; }
  static void Send(INPUT i) { INPUT[] a = new INPUT[] { i }; SendInput(1, a, Marshal.SizeOf(typeof(INPUT))); }
  public static void KeyDown(ushort vk) { INPUT i = new INPUT(); i.type = 1; i.U.ki.wVk = vk; Send(i); }
  public static void KeyUp(ushort vk) { INPUT i = new INPUT(); i.type = 1; i.U.ki.wVk = vk; i.U.ki.dwFlags = 2; Send(i); }
  public static void Key(ushort vk) { KeyDown(vk); System.Threading.Thread.Sleep(40); KeyUp(vk); }
  public static void Char(char c) { INPUT d = new INPUT(); d.type = 1; d.U.ki.wScan = c; d.U.ki.dwFlags = 4; Send(d); INPUT u = new INPUT(); u.type = 1; u.U.ki.wScan = c; u.U.ki.dwFlags = 6; Send(u); }
  public static void Click(int x, int y, int hold) { SetCursorPos(x, y); System.Threading.Thread.Sleep(60); mouse_event(0x0002, 0, 0, 0, IntPtr.Zero); System.Threading.Thread.Sleep(hold); mouse_event(0x0004, 0, 0, 0, IntPtr.Zero); }
  public static void Wheel(int delta) { mouse_event(0x0800, 0, 0, (uint)delta, IntPtr.Zero); }
  public static bool EscDown() { return (GetAsyncKeyState(0x1B) & 0x8000) != 0; }
  public static string ForegroundTitle() { StringBuilder sb = new StringBuilder(300); GetWindowText(GetForegroundWindow(), sb, 300); return sb.ToString(); }
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int cmd);
  [DllImport("user32.dll")] public static extern bool BringWindowToTop(IntPtr h);
  [DllImport("user32.dll")] public static extern IntPtr SetFocus(IntPtr h);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h, IntPtr pid);
  [DllImport("kernel32.dll")] public static extern uint GetCurrentThreadId();
  [DllImport("user32.dll")] public static extern bool AttachThreadInput(uint a, uint b, bool attach);
  public static bool Raise(IntPtr h) {
    if (h == IntPtr.Zero) return false;
    ShowWindow(h, 9);
    BringWindowToTop(h);
    SetForegroundWindow(h);
    if (GetForegroundWindow() == h) return true;
    uint fgThread = GetWindowThreadProcessId(GetForegroundWindow(), IntPtr.Zero);
    uint myThread = GetCurrentThreadId();
    AttachThreadInput(myThread, fgThread, true);
    BringWindowToTop(h);
    SetForegroundWindow(h);
    SetFocus(h);
    AttachThreadInput(myThread, fgThread, false);
    return (GetForegroundWindow() == h);
  }
}
'@
Add-Type -TypeDefinition $code
[Io]::SetProcessDPIAware() | Out-Null

$script:Bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$script:Master = [System.Diagnostics.Stopwatch]::StartNew()

function Log([string]$m) {
  $line = "[{0:HH:mm:ss.fff}] {1}" -f (Get-Date), $m
  Add-Content -Path $LogFile -Value $line
  Write-Host $line
}

function Grab([string]$name) {
  $b = $script:Bounds
  $bmp = New-Object System.Drawing.Bitmap($b.Width, $b.Height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.CopyFromScreen($b.X, $b.Y, 0, 0, $b.Size)
  $g.Dispose()
  $p = Join-Path $ShotDir ($name + ".jpg")
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]80)
  $bmp.Save($p, $enc, $ep)
  $bmp.Dispose()
}

function GetPos() {
  $pt = New-Object Io+POINT
  [Io]::GetCursorPos([ref]$pt) | Out-Null
  return @($pt.X, $pt.Y)
}

function Abort([string]$reason) {
  Log "ABORT: $reason"
  Grab "aborted"
  exit 2
}

function Check-Abort() {
  if ([Io]::EscDown()) { Abort "ESC pressed" }
  if ($script:LastCmdPos) {
    $p = GetPos
    $dx = [Math]::Abs($p[0] - $script:LastCmdPos[0])
    $dy = [Math]::Abs($p[1] - $script:LastCmdPos[1])
    if ($dx -gt 8 -or $dy -gt 8) { Abort "cursor moved by user (expected $($script:LastCmdPos -join ','), found $($p -join ','))" }
  }
}

function Glide([int]$x, [int]$y, [double]$dur) {
  $start = GetPos
  if ($dur -lt 0.05) {
    [Io]::SetCursorPos($x, $y) | Out-Null
    $script:LastCmdPos = @($x, $y)
    return
  }
  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  while ($sw.Elapsed.TotalSeconds -lt $dur) {
    $t = $sw.Elapsed.TotalSeconds / $dur
    $e = $t * $t * (3 - 2 * $t)
    $nx = [int]($start[0] + ($x - $start[0]) * $e)
    $ny = [int]($start[1] + ($y - $start[1]) * $e)
    [Io]::SetCursorPos($nx, $ny) | Out-Null
    Start-Sleep -Milliseconds 8
  }
  [Io]::SetCursorPos($x, $y) | Out-Null
  $script:LastCmdPos = @($x, $y)
}

function Wait-Until([double]$targetSec) {
  while ($script:Master.Elapsed.TotalSeconds -lt $targetSec) {
    Check-Abort
    Start-Sleep -Milliseconds 10
  }
}

function Wait-Sec([double]$dur) {
  $end = $script:Master.Elapsed.TotalSeconds + $dur
  while ($script:Master.Elapsed.TotalSeconds -lt $end) {
    Check-Abort
    Start-Sleep -Milliseconds 15
  }
}

function Ensure-Focus() {
  $fg = [Io]::ForegroundTitle()
  if ($fg -like "*$FocusTitle*") { return $true }
  Log "focus: foreground is '$fg', raising demo window"
  $proc = Get-Process | Where-Object { $_.MainWindowTitle -like "*$FocusTitle*" } | Select-Object -First 1
  if ($proc) {
    for ($i = 0; $i -lt 5; $i++) {
      if ([Io]::Raise([IntPtr]$proc.MainWindowHandle)) { Log "focus: raised via window handle"; return $true }
      Start-Sleep -Milliseconds 300
    }
  } else {
    Log "focus: no window matching '$FocusTitle' found in process list"
  }
  try {
    $ws = New-Object -ComObject WScript.Shell
    $ws.AppActivate("The $FocusTitle") | Out-Null
  } catch { }
  for ($i = 0; $i -lt 15; $i++) {
    Start-Sleep -Milliseconds 100
    if ([Io]::ForegroundTitle() -like "*$FocusTitle*") { Log "focus: raised via AppActivate"; return $true }
  }
  return $false
}

function Get-Target([string]$name) {
  $prop = $script:Spec.targets.PSObject.Properties[$name]
  if (-not $prop) { Abort "unknown target '$name'" }
  $v = $prop.Value
  return @([int]$v[0], [int]$v[1])
}

function Invoke-Action($a) {
  $type = "$($a.type)"
  switch ($type) {
    "move" {
      if ($a.target) { $t = Get-Target $a.target } else { $t = @([int]$a.to[0], [int]$a.to[1]) }
      $d = 0.7
      if ($a.dur) { $d = [double]$a.dur }
      Glide $t[0] $t[1] $d
      Log "move target=$($a.target) to=$($t -join ',') dur=$d"
    }
    "pause" {
      Wait-Sec ([double]$a.dur)
    }
    "click" {
      if (-not (Ensure-Focus)) { Abort "demo window lost focus before click" }
      if ($a.target) {
        $t = Get-Target $a.target
        if (-not $a.nomove) {
          $md = 0.6
          if ($a.movedur) { $md = [double]$a.movedur }
          Glide $t[0] $t[1] $md
        }
      } else { $t = $script:LastCmdPos }
      if (-not $t) { Abort "click without target or prior position" }
      [Io]::Click($t[0], $t[1], $ClickHoldMs)
      $script:LastCmdPos = @($t[0], $t[1])
      Log "click target=$($a.target) at=$($t -join ',')"
      Wait-Sec 0.15
    }
    "wheel" {
      if (-not (Ensure-Focus)) { Abort "demo window lost focus before wheel" }
      $ticks = [int]$a.ticks
      $iv = 0.12
      if ($a.interval) { $iv = [double]$a.interval }
      $deltaPerTick = 120
      if ($ticks -gt 0) { $deltaPerTick = -120 }
      for ($i = 0; $i -lt [Math]::Abs($ticks); $i++) {
        [Io]::Wheel($deltaPerTick)
        Start-Sleep -Milliseconds ([int]($iv * 1000))
      }
      Log "wheel ticks=$ticks interval=$iv"
    }
    "type" {
      if (-not (Ensure-Focus)) { Abort "demo window lost focus before typing" }
      $pk = 0.09
      if ($a.perKey) { $pk = [double]$a.perKey }
      foreach ($ch in $a.text.ToCharArray()) {
        [Io]::Char($ch)
        Start-Sleep -Milliseconds ([int]($pk * 1000))
      }
      Log "type '$($a.text)'"
    }
    "key" {
      if (-not (Ensure-Focus)) { Abort "demo window lost focus before key" }
      $keyMap = @{ F11 = 0x7A; ESC = 0x1B; ALT = 0x12; CTRL = 0x11; SHIFT = 0x10; LEFT = 0x25; RIGHT = 0x27; UP = 0x26; DOWN = 0x28; ENTER = 0x0D; TAB = 0x09; BACKSPACE = 0x08; SPACE = 0x20 }
      $vks = @()
      foreach ($k in $a.keys) {
        $kk = "$k".ToUpper()
        if ($keyMap.ContainsKey($kk)) { $vks += [uint16]$keyMap[$kk] } else { $vks += [uint16][int]$k }
      }
      foreach ($v in $vks) { [Io]::KeyDown($v) }
      Start-Sleep -Milliseconds 60
      for ($i = $vks.Count - 1; $i -ge 0; $i--) { [Io]::KeyUp($vks[$i]) }
      Log "key $($a.keys -join '+')"
    }
    "agent" {
      $out = & $script:AgentBrowser --session $Session @($a.cmd) 2>&1 | Out-String
      $trimmed = $out.Trim()
      if ($trimmed.Length -gt 160) { $trimmed = $trimmed.Substring(0, 160) }
      Log "agent $($a.cmd -join ' ') -> $trimmed"
    }
    "assert" {
      $out = (& $script:AgentBrowser --session $Session eval $a.js 2>&1 | Out-String).Trim()
      $val = ($out -split "`r?`n" | Where-Object { $_ -ne "" } | Select-Object -Last 1).Trim().Trim('"')
      $script:AssertCount++
      $want = "$($a.equals)"
      if ($val -eq $want) {
        Log "ASSERT PASS: $($a.label) = $val"
      } else {
        $script:AssertFailures++
        Log "ASSERT FAIL: $($a.label) expected '$want' got '$val'"
      }
    }
    "shot" {
      Grab "$($a.name)"
      Log "shot $($a.name)"
    }
    default {
      Log "WARN unknown action type '$type'"
    }
  }
}

try {
  Log "engine start session=$Session leadIn=$LeadIn selftest=$SelfTest fg='$([Io]::ForegroundTitle())'"
  Log "screen bounds $($script:Bounds.Width)x$($script:Bounds.Height) (DPI aware)"
  $startPos = GetPos
  Log "cursor start $($startPos -join ',')"
  if (-not (Ensure-Focus)) { Abort "demo window '$FocusTitle' not found in foreground" }
  if (-not $SelfTest) {
    if (-not $Timeline) { Abort "no timeline provided" }
    $script:Spec = Get-Content $Timeline -Raw | ConvertFrom-Json
    $scenes = @($script:Spec.scenes)
    if ($Scenes) {
      $wanted = $Scenes -split "," | ForEach-Object { $_.Trim() }
      $scenes = @($scenes | Where-Object { $wanted -contains "$($_.id)" })
      if ($scenes.Count -eq 0) { Abort "no scenes matched '$Scenes'" }
      $offset = [double]$scenes[0].start
    } else {
      $offset = 0
    }
    $scenes = @($scenes | Sort-Object { [double]$_.start })
    Log "timeline loaded: $($scenes.Count) scenes"
  }
  for ($i = [int]$LeadIn; $i -gt 0; $i--) {
    Log "lead-in $i"
    Start-Sleep -Milliseconds 1000
    Check-Abort
  }
  $script:Master.Restart()
  Log "take clock started"
  if ($SelfTest) {
    Grab "selftest-01"
    if (-not (Ensure-Focus)) { Abort "lost focus before F11" }
    [Io]::Key(0x7A)
    Log "selftest: F11 sent"
    Wait-Sec 1.2
    Grab "selftest-02-fullscreen"
    $cx = [int]($script:Bounds.Width / 2)
    $cy = [int]($script:Bounds.Height / 2)
    Glide $cx $cy 0.9
    Log "selftest: glide to center"
    Wait-Sec 0.4
    Glide ([int]($script:Bounds.Width - 200)) 260 0.9
    Log "selftest: glide to upper right"
    Wait-Sec 0.3
    if (-not (Ensure-Focus)) { Abort "lost focus before wheel" }
    for ($i = 0; $i -lt 3; $i++) { [Io]::Wheel(-120); Start-Sleep -Milliseconds 130 }
    Log "selftest: wheel sent"
    Wait-Sec 0.4
    if (-not (Ensure-Focus)) { Abort "lost focus before click" }
    [Io]::Click(10, $cy, $ClickHoldMs)
    $script:LastCmdPos = @(10, $cy)
    Log "selftest: click sent"
    Wait-Sec 0.5
    Grab "selftest-03-done"
    Glide $startPos[0] $startPos[1] 0.7
    Log "selftest: complete"
    exit 0
  }
  if (-not $Timeline) { Abort "no timeline provided" }
  $script:Spec = Get-Content $Timeline -Raw | ConvertFrom-Json
  $scenes = @($script:Spec.scenes)
  if ($Scenes) {
    $wanted = $Scenes -split "," | ForEach-Object { $_.Trim() }
    $scenes = @($scenes | Where-Object { $wanted -contains "$($_.id)" })
    if ($scenes.Count -eq 0) { Abort "no scenes matched '$Scenes'" }
    $offset = [double]$scenes[0].start
  } else {
    $offset = 0
  }
  $scenes = @($scenes | Sort-Object { [double]$_.start })
  foreach ($sc in $scenes) {
    $sched = [double]$sc.start - $offset
    Wait-Until $sched
    $actual = $script:Master.Elapsed.TotalSeconds
    $drift = [Math]::Round($actual - $sched, 3)
    Log "scene $($sc.id) start scheduled=$sched actual=$([Math]::Round($actual, 3)) drift=$drift"
    if ($drift -gt 0.15) { Log "WARN scene $($sc.id) started $drift s late" }
    foreach ($act in $sc.actions) { Invoke-Action $act }
    Log "scene $($sc.id) end at $([Math]::Round($script:Master.Elapsed.TotalSeconds, 3))"
  }
  Log "engine done asserts=$($script:AssertCount) failures=$($script:AssertFailures)"
  if ($script:AssertFailures -gt 0) { exit 3 }
  exit 0
} catch {
  Log "ERROR: $($_.Exception.Message)"
  Grab "error"
  exit 1
}
