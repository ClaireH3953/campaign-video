# 🚀 快速啟動指南

## 第一步：安裝依賴

```bash
cd campaign-video
npm install
```

## 第二步：安裝轉場套件（必須）

```bash
npx remotion add @remotion/transitions
```

## 第三步：啟動預覽

```bash
npm run dev
```

瀏覽器會自動開啟 `http://localhost:3000`

## 第四步：預覽效果

在 Remotion Studio 中：
- ✅ 點擊播放按鈕查看完整影片
- ✅ 拖動時間軸查看各個場景
- ✅ 調整播放速度
- ✅ 即時修改程式碼會自動重新載入

## 第五步：渲染影片

```bash
npm run build
```

輸出位置：`out/campaign.mp4`

---

## 🎨 自訂您的影片

### 修改候選人資訊

編輯 `src/Root.tsx`：

```tsx
const campaignProps: CampaignVideoProps = {
  candidateName: "陳建志",  // 👈 改成您的名字
  slogan: "為民服務，改變未來",  // 👈 改成您的標語
  scenes: campaignScenes,
};
```

### 替換照片

有兩種方式：

**方式一：使用線上圖片（示範）**

直接在 `campaignScenes` 中使用圖片 URL：

```tsx
{
  imagePath: "https://example.com/your-photo.jpg",
  title: "您的標題",
  // ...
}
```

**方式二：使用本地照片（正式）**

1. 創建 `public/` 資料夾
2. 放入照片（例如：`photo1.jpg`）
3. 修改程式碼：

```tsx
import { staticFile } from "remotion";

{
  imagePath: staticFile("photo1.jpg"),
  title: "您的標題",
  // ...
}
```

### 調整場景時長

修改 `durationInSeconds`：

```tsx
{
  imagePath: "...",
  title: "...",
  durationInSeconds: 5,  // 👈 改成 5 秒
}
```

---

## 📱 影片規格

- **解析度**：1920x1080 (Full HD)
- **幀率**：30 fps
- **總長度**：約 35 秒
- **場景數**：6 個照片場景 + 開場 + 結尾

---

## ❓ 常見問題

### Q: 為什麼需要安裝 @remotion/transitions？

A: 轉場效果需要專門的套件支援。

### Q: 可以用自己的照片嗎？

A: 當然！放在 `public/` 資料夾並使用 `staticFile()` 引用。

### Q: 影片太長/太短怎麼辦？

A: 調整每個場景的 `durationInSeconds` 或增減場景數量。

### Q: 如何改變文字位置？

A: 修改 `titlePosition` 為 `"top"`、`"center"` 或 `"bottom"`。

### Q: 可以添加背景音樂嗎？

A: 可以！參考 README.md 的「進階功能」章節。

---

## 🎬 開始創作吧！

一切就緒，開始製作您的競選影片！
