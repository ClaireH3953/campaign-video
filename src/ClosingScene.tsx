import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";

interface ClosingSceneProps {
  candidateName: string;
  callToAction: string;
}

/**
 * 結尾畫面
 * 行動呼籲 + 投票日期
 */
export const ClosingScene: React.FC<ClosingSceneProps> = ({
  candidateName,
  callToAction,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 整體淡入
  const fadeIn = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 行動呼籲彈簧動畫
  const ctaSpring = spring({
    frame: frame - 0.3 * fps,
    fps,
    config: {
      damping: 200,
    },
  });

  // 候選人名字延遲出現
  const nameSpring = spring({
    frame: frame - 0.8 * fps,
    fps,
    config: {
      damping: 200,
    },
  });

  // 按鈕脈衝效果
  const buttonPulse = spring({
    frame: frame - 1.5 * fps,
    fps,
    config: {
      damping: 8,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn,
      }}
    >
      {/* 主要行動呼籲 */}
      <h1
        style={{
          fontSize: "96px",
          fontWeight: "900",
          color: "#fff",
          margin: 0,
          textAlign: "center",
          transform: `translateY(${(1 - ctaSpring) * 50}px)`,
          opacity: ctaSpring,
        }}
      >
        {callToAction}
      </h1>

      {/* 候選人名字 */}
      <h2
        style={{
          fontSize: "72px",
          fontWeight: "700",
          color: "#fff",
          margin: "40px 0 0 0",
          textAlign: "center",
          transform: `translateY(${(1 - nameSpring) * 30}px)`,
          opacity: nameSpring,
        }}
      >
        {candidateName}
      </h2>

      {/* 投票按鈕樣式 */}
      {frame > 1.5 * fps && (
        <div
          style={{
            marginTop: "80px",
            padding: "30px 80px",
            backgroundColor: "#fff",
            borderRadius: "50px",
            transform: `scale(${buttonPulse})`,
            boxShadow: "0 10px 40px rgba(255, 255, 255, 0.4)",
          }}
        >
          <p
            style={{
              fontSize: "42px",
              fontWeight: "800",
              color: "#d97706",
              margin: 0,
            }}
          >
            一起守護慈愛里的未來
          </p>
        </div>
      )}

      {/* 底部資訊 */}
      <p
        style={{
          position: "absolute",
          bottom: "60px",
          fontSize: "28px",
          color: "rgba(255,255,255,0.8)",
          margin: 0,
          opacity: nameSpring,
        }}
      >
        投票日期：2026年11月
      </p>
    </AbsoluteFill>
  );
};
