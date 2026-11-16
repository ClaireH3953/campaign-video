import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";

interface OpeningSceneProps {
  candidateName: string;
  slogan: string;
}

/**
 * 開場畫面
 * 純文字 + 漸層背景
 */
export const OpeningScene: React.FC<OpeningSceneProps> = ({ candidateName, slogan }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 背景漸層動畫
  const gradientShift = interpolate(frame, [0, 3 * fps], [0, 100], {
    extrapolateRight: "clamp",
  });

  // 候選人名字 - 彈簧動畫
  const nameSpring = spring({
    frame: frame - 0.2 * fps,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
    },
  });

  // 標語 - 延遲彈簧動畫
  const sloganSpring = spring({
    frame: frame - 1 * fps,
    fps,
    config: {
      damping: 200,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, 
          hsl(${20 + gradientShift * 0.2}, 85%, 55%) 0%, 
          hsl(${35 + gradientShift * 0.3}, 80%, 50%) 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 候選人姓名 */}
      <h1
        style={{
          fontSize: "120px",
          fontWeight: "900",
          color: "#fff",
          margin: 0,
          textAlign: "center",
          transform: `scale(${nameSpring})`,
          opacity: nameSpring,
          letterSpacing: "2px",
        }}
      >
        {candidateName}
      </h1>

      {/* 標語 */}
      <p
        style={{
          fontSize: "48px",
          fontWeight: "500",
          color: "rgba(255,255,255,0.95)",
          margin: "40px 0 0 0",
          textAlign: "center",
          transform: `translateY(${(1 - sloganSpring) * 40}px)`,
          opacity: sloganSpring,
        }}
      >
        {slogan}
      </p>

      {/* 裝飾線條 */}
      <div
        style={{
          width: `${sloganSpring * 300}px`,
          height: "4px",
          backgroundColor: "rgba(255,255,255,0.8)",
          marginTop: "30px",
          borderRadius: "2px",
        }}
      />
    </AbsoluteFill>
  );
};
