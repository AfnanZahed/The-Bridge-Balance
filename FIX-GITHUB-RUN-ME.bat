@echo off
REM ============================================================
REM  Repairs the GitHub backup.
REM  Your local files are already correct - this does not touch
REM  them. It builds a brand-new one-commit history from what is
REM  on your disk right now and replaces GitHub with it.
REM ============================================================
cd /d "C:\Users\Dell\Desktop\Book"

echo.
echo [1/6] Removing the 3 empty worktree folders...
rd /s /q "C:\Users\Dell\Desktop\Book\.claude\worktrees\lesson-spine-intro-updates-13147a" 2>nul
rd /s /q "C:\Users\Dell\Desktop\Book\.claude\worktrees\localhost-3000-setup-442ee3" 2>nul
rd /s /q "C:\Users\Dell\Desktop\Book\.claude\worktrees\shared-component-import-6a0aee" 2>nul
rd /s /q "C:\Users\Dell\Desktop\Book\.claude\worktrees" 2>nul
echo     done.

echo.
echo [2/6] Creating a fresh, single-commit history...
git init -b main
git add -A
git commit -m "The Bridge Balance - book, site, and authoring skills" --quiet
if errorlevel 1 (
  echo   *** COMMIT FAILED - stopping. Tell Claude. ***
  pause
  exit /b 1
)
echo     done.

echo.
echo [3/6] Connecting to GitHub...
git remote add origin https://github.com/AfnanZahed/The-Bridge-Balance.git
echo     done.

echo.
echo [4/6] Replacing GitHub with the clean version...
git push --force origin main
if errorlevel 1 (
  echo   *** PUSH FAILED - stopping. Git NOT deleted. Tell Claude. ***
  pause
  exit /b 1
)
echo     done.

echo.
echo [5/6] Removing leftover branches from GitHub...
git push origin --delete 012-chapter-state-transparency
git push origin --delete claude/github-organization-setup-jg2ojv
echo     done.

echo.
echo [6/6] Deleting git again...
rd /s /q "C:\Users\Dell\Desktop\Book\.git" 2>nul
del /f /q "C:\Users\Dell\Desktop\Book\FINISH-RUN-ME.bat" 2>nul
del /f /q "C:\Users\Dell\Desktop\Book\CLEANUP-RUN-ME.bat" 2>nul
echo     done.

echo.
echo ==== DONE ====
echo GitHub now holds one clean commit and nothing else.
echo Your project is plain folders and files again.
echo You can delete this .bat file now.
pause
