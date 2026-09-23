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
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
  [DllImport("user32.dll")] static extern uint SendInput(uint n, INPUT[] inputs, int cbSize);
  [DllImport("user32.dll")] static extern void mouse_event(uint f, int dx, int dy, uint d, IntPtr e);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int cmd);
  [DllImport("user32.dll")] public static extern bool BringWindowToTop(IntPtr h);
  [DllImport("user32.dll")] public static extern IntPtr SetFocus(IntPtr h);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h, IntPtr pid);
  [DllImport("kernel32.dll")] public static extern uint GetCurrentThreadId();
  [DllImport("user32.dll")] public static extern bool AttachThreadInput(uint a, uint b, bool attach);
  [StructLayout(LayoutKind.Sequential)] public struct POINT { public int X; public int Y; }
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int L; public int T; public int R; public int B; }
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

function Grab([string]$name, [string]$OutDir = "C:\Users\Dell\Desktop\Book\_scratch\demo-shots") {
  New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
  $b = $script:Bounds
  $bmp = New-Object System.Drawing.Bitmap($b.Width, $b.Height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.CopyFromScreen($b.X, $b.Y, 0, 0, $b.Size)
  $g.Dispose()
  $p = Join-Path $OutDir ($name + ".jpg")
  $enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]75)
  $bmp.Save($p, $enc, $ep)
  $bmp.Dispose()
  return $p
}

function GetPos {
  $pt = New-Object Io+POINT
  [Io]::GetCursorPos([ref]$pt) | Out-Null
  return @($pt.X, $pt.Y)
}

function Find-DemoWindow {
  Get-Process | Where-Object { $_.MainWindowTitle -like "*Bridge Balance*" } | Select-Object -First 1
}

function Get-WindowRect([IntPtr]$h) {
  $r = New-Object Io+RECT
  [Io]::GetWindowRect($h, [ref]$r) | Out-Null
  return @($r.L, $r.T, ($r.R - $r.L), ($r.B - $r.T))
}
