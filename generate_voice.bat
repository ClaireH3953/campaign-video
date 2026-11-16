@echo off
chcp 65001 > nul
echo ========================================
echo 語音旁白自動生成工具
echo ========================================
echo.

REM 檢查 Python 是否安裝
python --version >nul 2>&1
if errorlevel 1 (
    echo [錯誤] 未安裝 Python
    echo 請先安裝 Python: https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

REM 檢查 edge-tts 是否安裝
python -c "import edge_tts" >nul 2>&1
if errorlevel 1 (
    echo [提示] 正在安裝 edge-tts...
    python -m pip install edge-tts
    echo.
)

REM 執行語音生成腳本
echo 開始生成語音檔案...
echo.
python generate_voice.py

echo.
echo 按任意鍵關閉視窗...
pause >nul
