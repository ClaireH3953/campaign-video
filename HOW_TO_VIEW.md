# 🎬 競選影片 - 立即預覽！

## ⚡ 快速預覽（不需安裝）

直接用瀏覽器打開：

```bash
campaign-video/preview.html
```

或在專案目錄執行：

```bash
# Windows
start preview.html

# Mac
open preview.html

# Linux
xdg-open preview.html
```

### 🎮 操作方式

- **空白鍵** - 播放/暫停
- **→ 右箭頭** - 下一個場景
- **← 左箭頭** - 上一個場景
- **R 鍵** - 重新開始
- **滑鼠** - 點擊底部按鈕控制

---

## 🎥 完整 Remotion 版本（需安裝）

### 1. 安裝依賴

```bash
cd campaign-video
npm install
```

### 2. 開發預覽

```bash
npm run dev
```

瀏覽器會開啟 `http://localhost:3000` 顯示 Remotion Studio

### 3. 渲染影片

```bash
npm run build
```

輸出：`out/campaign.mp4`

---

## 📦 兩個版本的差異

| 功能 | HTML 預覽版 | Remotion 完整版 |
|------|-------------|----------------|
| 無需安裝 | ✅ | ❌ 需要 npm install |
| 即時查看 | ✅ 打開瀏覽器即可 | ✅ 開發模式預覽 |
| 動畫效果 | ✅ CSS 動畫 | ✅ Frame-based 動畫 |
| Ken Burns | ✅ CSS transform | ✅ Remotion interpolate |
| 轉場效果 | ⚠️ 簡易淡入淡出 | ✅ 專業轉場系統 |
| 渲染影片 | ❌ | ✅ 輸出 MP4 |
| 程式化控制 | ❌ | ✅ 完全程式化 |
| 添加音訊 | ❌ | ✅ 支援 |

---

## 🎯 推薦使用方式

### 快速展示效果
👉 **使用 HTML 預覽版**
- 不需要安裝任何東西
- 立即看到效果
- 適合快速展示給他人看

### 正式製作影片
👉 **使用 Remotion 完整版**
- 專業級轉場效果
- 可以渲染成 MP4 檔案
- 完全程式化控制
- 可以添加音訊、字幕等進階功能

---

## 💡 提示

HTML 預覽版已經展示了：
- ✅ 8 個場景（開場 + 6 張照片 + 結尾）
- ✅ Ken Burns 效果（照片縮放）
- ✅ 文字動畫（滑入、淡入）
- ✅ 真實的照片（來自 Unsplash）
- ✅ 專業的漸層背景

這已經是一個完整可用的競選影片原型！

---

## 🚀 現在就打開看看！

```bash
start preview.html
```

**或雙擊 `preview.html` 檔案！**
