# Windows 語音生成腳本（使用系統內建TTS）
# 無需安裝任何軟體

Add-Type -AssemblyName System.Speech
$synthesizer = New-Object System.Speech.Synthesis.SpeechSynthesizer

# 設定輸出資料夾
$outputDir = "audio"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
}

# 場景旁白文字
$scenes = @(
    @{File="voice_scene1.mp3"; Text="北端里里長候選人，呂佳穎，三代人守護的家"}
    @{File="voice_scene2.mp3"; Text="慈愛里，三代人的承諾。阿公陳朝見，慈愛里第一代里長"}
    @{File="voice_scene3.mp3"; Text="用50年的歲月，守護每一條巷弄，照顧每一個鄰居"}
    @{File="voice_scene4.mp3"; Text="爸爸呂南風接下這份責任，他教我什麼是真心為里民服務"}
    @{File="voice_scene5.mp3"; Text="他們用行動告訴我，服務不是口號，是一輩子的陪伴"}
    @{File="voice_scene6.mp3"; Text="從他手中，我接下這份使命，不只是延續，更是承諾"}
    @{File="voice_scene7.mp3"; Text="現在，換我來延續這份承諾。颱風、髒亂、困難，我都會第一時間出現"}
    @{File="voice_scene8.mp3"; Text="颱風天，里民的安全是我的責任。無畏風雨，堅守家園"}
    @{File="voice_scene9.mp3"; Text="每個鄰居的需要，都是我最在乎的事"}
    @{File="voice_scene10.mp3"; Text="北端里的未來，讓我繼續守護。推薦呂佳穎，2026年11月，里長選舉"}
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "語音生成中..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 列出可用的語音
Write-Host "可用的中文語音：" -ForegroundColor Yellow
$voices = $synthesizer.GetInstalledVoices() | Where-Object { $_.VoiceInfo.Culture.Name -like "zh-*" }
if ($voices.Count -eq 0) {
    Write-Host "警告：未找到中文語音，將使用預設英文語音" -ForegroundColor Red
    Write-Host "建議使用線上AI工具：https://ttsmaker.com/zh-tw" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "按Enter鍵開啟語音生成工具頁面"
    Start-Process "voice-generator.html"
    exit
}

foreach ($voice in $voices) {
    Write-Host "  - $($voice.VoiceInfo.Name)" -ForegroundColor Green
}
Write-Host ""

# 生成語音檔案
$count = 0
foreach ($scene in $scenes) {
    $count++
    $outputPath = Join-Path $outputDir $scene.File
    
    Write-Host "[$count/10] 生成中: $($scene.File)..." -NoNewline
    
    try {
        $synthesizer.SetOutputToWaveFile($outputPath.Replace('.mp3', '.wav'))
        $synthesizer.Speak($scene.Text)
        $synthesizer.SetOutputToDefaultAudioDevice()
        
        Write-Host " ✓" -ForegroundColor Green
    } catch {
        Write-Host " ✗ (錯誤: $($_.Exception.Message))" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "注意：" -ForegroundColor Yellow
Write-Host "1. Windows內建TTS的中文語音品質較低" -ForegroundColor Yellow
Write-Host "2. 建議使用線上AI工具獲得更好的效果" -ForegroundColor Yellow
Write-Host "3. 檔案已儲存在 audio\ 資料夾（WAV格式）" -ForegroundColor Yellow
Write-Host ""
Write-Host "按Enter鍵開啟高品質語音生成工具..." -ForegroundColor Cyan
Read-Host
Start-Process "voice-generator.html"
