@echo off
REM  Rebuilds the GitHub backup as one clean commit, then removes git.
REM  Your local project files are NOT touched.
cd /d "C:\Users\Dell\Desktop\Book"

echo.
echo [1/6] Preparing a fresh, single-commit history...
git init -b main >nul
git config user.name "Afnan Zahed"
git config user.email "afnanzahed30@gmail.com"
git config core.autocrlf false
echo     done.

echo.
echo [2/6] Making the commit...
git add -A
git commit -m "The Bridge Balance - book, site, and authoring skills" --quiet
if errorlevel 1 (
  echo   *** COMMIT FAILED - stopping. Nothing deleted. Tell Claude. ***
  pause
  exit /b 1
)
echo     done.

echo.
echo [3/6] Connecting to GitHub...
git remote remove origin 2>nul
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
echo [6/6] Deleting git, the worktrees folder, and leftover scripts...
rd /s /q "C:\Users\Dell\Desktop\Book\.git" 2>nul
rd /s /q "C:\Users\Dell\Desktop\Book\.claude\worktrees" 2>nul
del /f /q "C:\Users\Dell\Desktop\Book\FIX-GITHUB-RUN-ME.bat" 2>nul
del /f /q "C:\Users\Dell\Desktop\Book\FINISH-RUN-ME.bat" 2>nul
del /f /q "C:\Users\Dell\Desktop\Book\CLEANUP-RUN-ME.bat" 2>nul
echo     done.

echo.
echo ==== DONE ====
echo GitHub holds one clean commit. Your project is plain files again.
echo Delete this .bat and you are finished.
pause
