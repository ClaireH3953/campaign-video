import { Composition } from "remotion";
import { CampaignVideo } from "./CampaignVideo";
import { CampaignVideoProps, SceneConfig } from "./types";

/**
 * 競選影片場景配置 - 鹽埕區慈愛里專屬
 * 
 * 故事線：「守護慈愛里，延續我們的根」
 * 1. 村里身分認同 - 珍惜慈愛里的名字（面對村里合併）
 * 2. 銀髮關懷 - 關懷每一位長者（27.4%高齡化）
 * 3. 經濟振興 - 振興鹽埕商圈（在地經濟）
 * 4. 愛河守護 - 守護愛河美景（地方地標）
 * 5. 交通改善 - 改善交通動線（長者友善）
 * 6. 文化傳承 - 傳承鹽埕歷史（社區記憶）
 */
const campaignScenes: SceneConfig[] = [
  {
    imagePath: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1920&h=1080&fit=crop",
    title: "珍惜慈愛里的名字",
    subtitle: "村里合併，我們的聲音不能消失",
    durationInSeconds: 4,
    titlePosition: "bottom",
  },
  {
    imagePath: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=1920&h=1080&fit=crop",
    title: "關懷每一位長者",
    subtitle: "打造友善銀髮族的社區環境",
    durationInSeconds: 4,
    titlePosition: "bottom",
  },
  {
    imagePath: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop",
    title: "振興鹽埕商圈",
    subtitle: "支持在地商家，重現繁榮",
    durationInSeconds: 4,
    titlePosition: "bottom",
  },
  {
    imagePath: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    title: "守護愛河美景",
    subtitle: "提升河岸品質，打造宜居水岸",
    durationInSeconds: 4,
    titlePosition: "bottom",
  },
  {
    imagePath: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=1080&fit=crop",
    title: "改善交通動線",
    subtitle: "讓長輩出門更方便安全",
    durationInSeconds: 4,
    titlePosition: "bottom",
  },
  {
    imagePath: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1920&h=1080&fit=crop",
    title: "傳承鹽埕歷史",
    subtitle: "保存文化記憶，創造新希望",
    durationInSeconds: 4,
    titlePosition: "bottom",
  },
];

/**
 * 計算總影片長度
 * 
 * 根據 Remotion transitions 規則：
 * - 轉場會縮短總長度（兩個場景同時播放）
 * - 總長度 = 所有場景長度 - 所有轉場長度
 */
const calculateTotalDuration = (fps: number): number => {
  const openingDuration = 4 * fps;
  const closingDuration = 5 * fps;
  const scenesDuration = campaignScenes.reduce(
    (total, scene) => total + scene.durationInSeconds * fps,
    0
  );
  
  // 轉場數量：開場後1次 + 場景間5次 + 結尾前1次 = 7次
  const transitionCount = 1 + (campaignScenes.length - 1) + 1;
  const transitionDuration = 15 * transitionCount; // 每次15幀
  const fadeTransitionDuration = 20 * 2; // 開場和結尾的淡入淡出各20幀
  
  return openingDuration + scenesDuration + closingDuration - transitionDuration - fadeTransitionDuration;
};

export const RemotionRoot: React.FC = () => {
  const fps = 30; // 使用 30fps 以縮小檔案大小

  const campaignProps: CampaignVideoProps = {
    candidateName: "陳建志",
    slogan: "守護慈愛里，延續我們的根",
    scenes: campaignScenes,
  };

  return (
    <>
      <Composition
        id="CampaignVideo"
        component={CampaignVideo}
        durationInFrames={calculateTotalDuration(fps)}
        fps={fps}
        width={1920}
        height={1080}
        defaultProps={campaignProps}
      />
    </>
  );
};
