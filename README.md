# 競選影片專案 🎬

使用 Remotion 製作的專業競選影片，展示真實的照片故事。

## 📋 專案特色

### ✅ 遵循 Remotion 最佳實踐
- ✅ 所有動畫使用 `useCurrentFrame()` 驅動
- ✅ 時間計算使用 `秒 * fps` 
- ✅ 使用 `<Img>` 組件（而非 HTML `<img>`）
- ✅ 使用 `TransitionSeries` 處理專業轉場
- ❌ 零 CSS transitions/animations

### 🎥 影片結構

**總長度：約 35 秒**

```
開場 (4秒)
  ↓ [淡出轉場]
場景1: 傾聽民意 (4秒)
  ↓ [滑動轉場]
場景2: 走進基層 (4秒)
  ↓ [淡出轉場]
場景3: 關懷弱勢 (4秒)
  ↓ [滑動轉場]
場景4: 規劃城市 (4秒)
  ↓ [淡出轉場]
場景5: 投資教育 (4秒)
  ↓ [滑動轉場]
場景6: 團結向前 (4秒)
  ↓ [淡出轉場]
結尾 (5秒)
```

### 🎨 動畫效果

#### 開場畫面 (`OpeningScene.tsx`)
- 漸層背景動態移動
- 候選人姓名彈簧入場（帶彈跳）
- 標語延遲淡入
- 裝飾線條動畫

#### 照片場景 (`PhotoScene.tsx`)
- **Ken Burns 效果** - 照片緩慢放大（1 → 1.1）
- 整體淡入效果
- 標題彈簧動畫（平滑無彈跳）
- 副標題延遲出現
- 深色漸層遮罩（讓文字清晰）

#### 結尾畫面 (`ClosingScene.tsx`)
- 行動呼籲強力入場
- 候選人名字金色醒目
- 按鈕彈跳脈衝效果
- 底部資訊淡入

### 🔄 轉場效果

使用 `@remotion/transitions` 專業轉場：
- **淡出（fade）** - 柔和過渡
- **滑動（slide）** - 動態切換
- 轉場時長：15-20 幀

## 🚀 快速開始

### 安裝依賴

```bash
npm install
# 或
pnpm install
# 或
bun install
```

### 必須安裝轉場套件

```bash
npx remotion add @remotion/transitions
```

### 開發模式預覽

```bash
npm run dev
```

瀏覽器會開啟 Remotion Studio，可以即時預覽影片。

### 渲染影片

```bash
npm run build
```

輸出：`out/campaign.mp4`

## 📁 專案結構

```
campaign-video/
├── src/
│   ├── index.ts              # 入口文件
│   ├── Root.tsx              # Composition 配置 + 場景數據
│   ├── types.ts              # TypeScript 類型定義
│   ├── CampaignVideo.tsx     # 主影片組件（TransitionSeries）
│   ├── OpeningScene.tsx      # 開場畫面
│   ├── PhotoScene.tsx        # 照片場景（可重用）
│   └── ClosingScene.tsx      # 結尾畫面
├── package.json
└── README.md
```

## 🎯 技術亮點

### 1. Ken Burns 效果（經典照片動畫）

```tsx
const scale = interpolate(frame, [0, 3 * fps], [1, 1.1], {
  extrapolateRight: "clamp",
});
```

照片從原始大小緩慢放大到 110%，營造動態感。

### 2. 彈簧物理動畫

```tsx
// 平滑無彈跳
const smooth = spring({
  frame: frame - 0.3 * fps,
  fps,
  config: { damping: 200 },
});

// 有彈跳效果
const bouncy = spring({
  frame: frame - 1 * fps,
  fps,
  config: { damping: 8 },
});
```

### 3. 專業轉場系統

```tsx
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <Scene1 />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 15 })}
  />
  <TransitionSeries.Sequence durationInFrames={60}>
    <Scene2 />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

### 4. 照片來源

使用 Unsplash 的高品質照片（示範用）：
- 真實的人物互動場景
- 城市建設規劃
- 教育與社區活動
- 避免 AI 生成的假照片

## 🔧 自訂配置

### 修改候選人資訊

編輯 `src/Root.tsx`：

```tsx
const campaignProps: CampaignVideoProps = {
  candidateName: "您的名字",  // 修改這裡
  slogan: "您的標語",         // 修改這裡
  scenes: campaignScenes,
};
```

### 修改場景內容

編輯 `src/Root.tsx` 中的 `campaignScenes` 陣列：

```tsx
const campaignScenes: SceneConfig[] = [
  {
    imagePath: "您的圖片URL",
    title: "場景標題",
    subtitle: "場景副標題",
    durationInSeconds: 4,
    titlePosition: "bottom", // "top" | "center" | "bottom"
  },
  // ... 更多場景
];
```

### 使用本地照片

1. 將照片放在 `public/` 資料夾
2. 使用 `staticFile()` 引用：

```tsx
import { staticFile } from "remotion";

const scene = {
  imagePath: staticFile("my-photo.jpg"),
  // ...
};
```

### 調整影片長度

- **場景長度**：修改 `durationInSeconds`
- **轉場長度**：修改 `durationInFrames`（建議 10-30 幀）
- **幀率**：修改 `Root.tsx` 中的 `fps`（30 或 60）

## 📝 Remotion 規則檢查清單

- [x] 使用 `useCurrentFrame()` 驅動所有動畫
- [x] 時間計算用 `秒 * fps`
- [x] 使用 `<Img>` 而非 `<img>`
- [x] 使用 `staticFile()` 引用本地資源
- [x] 使用 `spring()` 創建自然動畫
- [x] 使用 `interpolate()` 進行值映射
- [x] 使用 `TransitionSeries` 處理轉場
- [x] 禁止 CSS transitions/animations
- [x] 禁止 Tailwind 動畫類名

## 🎬 進階功能

### 添加背景音樂

參考 Remotion skill 中的 `rules/audio.md`：

```tsx
import { Audio } from "remotion";

<Audio src={staticFile("background-music.mp3")} volume={0.3} />
```

### 添加字幕

參考 `rules/subtitles.md` 創建字幕組件。

### 添加音訊可視化

參考 `rules/audio-visualization.md` 創建頻譜動畫。

## 🚀 部署與分享

### 渲染高品質影片

```bash
# 4K 解析度
npx remotion render src/index.ts CampaignVideo out/4k.mp4 --scale=2

# 調整品質（0-100）
npx remotion render src/index.ts CampaignVideo out/hq.mp4 --quality=90
```

### 渲染為 GIF

```bash
npx remotion render src/index.ts CampaignVideo out/preview.gif
```

## 💡 設計理念

這個競選影片的設計遵循以下原則：

1. **真實感** - 使用真實照片，避免 AI 生成的假人物
2. **故事性** - 從「傾聽」到「行動」的完整敘事
3. **專業度** - 使用電影級轉場和動畫效果
4. **情感連結** - 展示候選人與民眾的真實互動
5. **行動呼籲** - 清晰的投票號召

## 📚 延伸學習

查看更多 Remotion 技巧：
- [Remotion 官方文檔](https://remotion.dev/docs)
- [Transitions 套件](https://remotion.dev/docs/transitions)
- [Remotion Showcase](https://remotion.dev/showcase)

---

**使用 Remotion Skill 創建！** 🎉

完全遵循 `remotion-best-practices` 的所有規則。
