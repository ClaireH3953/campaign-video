# 語音旁白生成指南

## 📢 已整合語音系統

您的影片已經支援語音旁白功能！系統會自動：
- 在每個場景切換時播放對應的語音
- 語音播放時自動降低背景音樂音量
- 語音結束後恢復背景音樂音量

## 🎯 需要的語音檔案

請為以下10個場景準備語音檔案，放在 `audio/` 資料夾中：

### 場景1 - 開場
**檔案名稱**: `audio/voice_scene1.mp3`  
**旁白文字**: 北端里里長候選人，呂佳穎，三代人守護的家

### 場景2 - 第一代
**檔案名稱**: `audio/voice_scene2.mp3`  
**旁白文字**: 慈愛里，三代人的承諾。阿公陳朝見，慈愛里第一代里長

### 場景3 - 第一代的堅持
**檔案名稱**: `audio/voice_scene3.mp3`  
**旁白文字**: 用50年的歲月，守護每一條巷弄，照顧每一個鄰居

### 場景4 - 第二代接棒
**檔案名稱**: `audio/voice_scene4.mp3`  
**旁白文字**: 爸爸呂南風接下這份責任，他教我什麼是真心為里民服務

### 場景5 - 傳承的溫度
**檔案名稱**: `audio/voice_scene5.mp3`  
**旁白文字**: 他們用行動告訴我，服務不是口號，是一輩子的陪伴

### 場景6 - 傳承交棒
**檔案名稱**: `audio/voice_scene6.mp3`  
**旁白文字**: 從他手中，我接下這份使命，不只是延續，更是承諾

### 場景7 - 第三代延續
**檔案名稱**: `audio/voice_scene7.mp3`  
**旁白文字**: 現在，換我來延續這份承諾。颱風、髒亂、困難，我都會第一時間出現

### 場景8 - 颱風實戰（重點場景）
**檔案名稱**: `audio/voice_scene8.mp3`  
**旁白文字**: 颱風天，里民的安全是我的責任。無畏風雨，堅守家園

### 場景9 - 用心服務
**檔案名稱**: `audio/voice_scene9.mp3`  
**旁白文字**: 每個鄰居的需要，都是我最在乎的事

### 場景10 - 結尾
**檔案名稱**: `audio/voice_scene10.mp3`  
**旁白文字**: 北端里的未來，讓我繼續守護。推薦呂佳穎，2026年11月，里長選舉

---

## 🔧 語音生成方法

### 方法1: Edge TTS（免費，最簡單）

使用Microsoft Edge瀏覽器的語音引擎，完全免費！

#### 安裝步驟：
```bash
# 安裝edge-tts（需要Python）
pip install edge-tts

# 或使用線上工具：https://tts.travisgeis.com/
```

#### 生成語音命令：
```bash
# 列出可用的中文語音
edge-tts --list-voices | grep zh-TW

# 生成語音（推薦：zh-TW-HsiaoChenNeural 女聲）
edge-tts --voice zh-TW-HsiaoChenNeural --text "北端里里長候選人，呂佳穎" --write-media audio/voice_scene1.mp3

# 生成語音（推薦：zh-TW-YunJheNeural 男聲）
edge-tts --voice zh-TW-YunJheNeural --text "您的文字" --write-media audio/voice_scene1.mp3
```

### 方法2: Azure Text-to-Speech（高品質）

微軟官方服務，每月免費50萬字元。

1. 註冊Azure帳號：https://azure.microsoft.com/zh-tw/free/
2. 建立語音服務資源
3. 使用Speech Studio：https://speech.microsoft.com/portal

推薦語音：
- **女聲**: zh-TW-HsiaoChenNeural（溫暖親切）
- **男聲**: zh-TW-YunJheNeural（沉穩可靠）

### 方法3: ElevenLabs（最自然）

最自然的AI語音，但需要付費。

1. 註冊：https://elevenlabs.io/
2. 選擇中文語音模型
3. 輸入文字生成語音
4. 下載MP3檔案

### 方法4: 本地錄音

使用手機或電腦錄音：
1. 準備好旁白腳本
2. 找安靜環境錄音
3. 使用Audacity等軟體後製
4. 匯出為MP3格式

---

## 📁 檔案結構

請建立以下資料夾結構：

```
campaign-video/
├── audio/
│   ├── voice_scene1.mp3
│   ├── voice_scene2.mp3
│   ├── voice_scene3.mp3
│   ├── voice_scene4.mp3
│   ├── voice_scene5.mp3
│   ├── voice_scene6.mp3
│   ├── voice_scene7.mp3
│   ├── voice_scene8.mp3
│   ├── voice_scene9.mp3
│   └── voice_scene10.mp3
├── preview.html
└── jpg/
```

---

## 🎬 使用說明

1. **生成語音檔案**：使用上述任一方法生成10個語音檔案
2. **放置檔案**：將檔案放入 `audio/` 資料夾
3. **測試影片**：開啟 `preview.html`，語音會自動播放
4. **調整音量**：可在程式碼中調整 `voiceover.volume`（0.0-1.0）

---

## 💡 進階設定

### 調整音量
在 `preview.html` 中修改：
```javascript
bgMusic.volume = 0.3;      // 背景音樂音量
voiceover.volume = 0.9;    // 語音音量
```

### 停用語音
如果不需要某個場景的語音，將對應的陣列項目設為空字串：
```javascript
const sceneVoiceovers = [
    'audio/voice_scene1.mp3',
    '',  // 這個場景不播放語音
    'audio/voice_scene3.mp3',
    // ...
];
```

### Audio Ducking（音訊閃避）
系統已自動設定：語音播放時背景音樂降至15%，結束後恢復至30%。

---

## 🚀 快速開始（使用Edge TTS）

如果您的電腦有Python，可以使用以下腳本快速生成所有語音：

參考：`generate_voice.py`
