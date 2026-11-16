/**
 * 競選影片場景配置
 */
export interface SceneConfig {
  /** 場景圖片路徑 */
  imagePath: string;
  /** 場景標題 */
  title: string;
  /** 場景副標題/描述 */
  subtitle?: string;
  /** 場景持續時間（秒） */
  durationInSeconds: number;
  /** 標題位置 */
  titlePosition?: "top" | "bottom" | "center";
}

/**
 * 競選影片配置
 */
export interface CampaignVideoProps {
  /** 候選人姓名 */
  candidateName: string;
  /** 競選標語 */
  slogan: string;
  /** 場景配置列表 */
  scenes: SceneConfig[];
}
