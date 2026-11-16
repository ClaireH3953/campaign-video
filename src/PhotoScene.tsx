import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

interface PhotoSceneProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  titlePosition?: "top" | "bottom" | "center";
}

/**
 * 單一照片場景組件
 * 包含 Ken Burns 效果（緩慢縮放）和文字動畫
 */
export const PhotoScene: React.FC<PhotoSceneProps> = ({
  imageSrc,
  title,
  subtitle,
  titlePosition = "bottom",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ken Burns 效果 - 緩慢放大
  const scale = interpolate(frame, [0, 3 * fps], [1, 1.1], {
    extrapolateRight: "clamp",
  });

  // 淡入效果（前 0.5 秒）
  const fadeIn = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 標題彈簧動畫（從 0.3 秒開始）
  const titleSpring = spring({
    frame: frame - 0.3 * fps,
    fps,
    config: {
      damping: 200,
    },
  });

  // 副標題延遲出現（從 0.6 秒開始）
  const subtitleSpring = spring({
    frame: frame - 0.6 * fps,
    fps,
    config: {
      damping: 200,
    },
  });

  // 文字位置計算
  const getTextPosition = () => {
    switch (titlePosition) {
      case "top":
        return { top: "10%", justifyContent: "flex-start" };
      case "center":
        return { top: "50%", transform: "translateY(-50%)", justifyContent: "center" };
      case "bottom":
      default:
        return { bottom: "10%", justifyContent: "flex-end" };
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* 照片背景 - Ken Burns 效果 */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${scale})`,
          opacity: fadeIn,
        }}
      >
        {/* 深色漸層遮罩 - 讓文字更清晰 */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              titlePosition === "bottom"
                ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)"
                : titlePosition === "top"
                ? "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)"
                : "radial-gradient(circle, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* 文字內容 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          padding: "0 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          ...getTextPosition(),
        }}
      >
        {/* 主標題 */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "800",
            color: "#fff",
            margin: 0,
            textAlign: "center",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            transform: `translateY(${(1 - titleSpring) * 50}px)`,
            opacity: titleSpring,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>

        {/* 副標題 */}
        {subtitle && (
          <p
            style={{
              fontSize: "32px",
              fontWeight: "500",
              color: "#fff",
              margin: "20px 0 0 0",
              textAlign: "center",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              transform: `translateY(${(1 - subtitleSpring) * 30}px)`,
              opacity: subtitleSpring,
              maxWidth: "900px",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
