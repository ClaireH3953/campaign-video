@echo off
chcp 65001 > nul
echo ========================================
echo 🎙️ 競選影片語音自動生成工具
echo ========================================
echo.

REM 檢查 Python 是否安裝
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 找不到 Python，請先安裝 Python 3.7+
    echo 下載網址: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo ✅ Python 已安裝
echo.

REM 檢查並安裝 edge-tts
echo 📦 檢查 edge-tts 套件...
python -c "import edge_tts" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⏳ 正在安裝 edge-tts...
    pip install edge-tts
    if %errorlevel% neq 0 (
        echo ❌ 安裝失敗，請手動執行: pip install edge-tts
        pause
        exit /b 1
    )
    echo ✅ edge-tts 安裝完成
) else (
    echo ✅ edge-tts 已安裝
)
echo.

REM 切換到 WSL 路徑
cd /d \\wsl$\Ubuntu\home\clairehung\campaign-video

REM 執行生成腳本
echo 🚀 開始生成語音檔案...
echo.
python generate_voice_new.py

echo.
echo ========================================
echo ✅ 完成！
echo ========================================
echo.
echo 請開啟 preview.html 測試影片
echo.
pause
