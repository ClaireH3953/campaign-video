import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { OpeningScene } from "./OpeningScene";
import { PhotoScene } from "./PhotoScene";
import { ClosingScene } from "./ClosingScene";
import { CampaignVideoProps } from "./types";
import { useVideoConfig } from "remotion";

/**
 * 主競選影片組件
 * 使用 TransitionSeries 串接多個場景，並添加專業轉場效果
 */
export const CampaignVideo: React.FC<CampaignVideoProps> = ({
  candidateName,
  slogan,
  scenes,
}) => {
  const { fps } = useVideoConfig();

  return (
    <TransitionSeries>
      {/* 開場 */}
      <TransitionSeries.Sequence durationInFrames={4 * fps}>
        <OpeningScene candidateName={candidateName} slogan={slogan} />
      </TransitionSeries.Sequence>

      {/* 淡出轉場 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 照片場景 */}
      {scenes.map((scene, index) => (
        <div key={index}>
          <TransitionSeries.Sequence
            durationInFrames={scene.durationInSeconds * fps}
          >
            <PhotoScene
              imageSrc={scene.imagePath}
              title={scene.title}
              subtitle={scene.subtitle}
              titlePosition={scene.titlePosition}
            />
          </TransitionSeries.Sequence>

          {/* 場景間的轉場 - 交替使用不同效果 */}
          {index < scenes.length - 1 && (
            <TransitionSeries.Transition
              presentation={
                index % 2 === 0
                  ? slide({ direction: "from-right" })
                  : fade()
              }
              timing={linearTiming({ durationInFrames: 15 })}
            />
          )}
        </div>
      ))}

      {/* 淡入到結尾 */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 結尾 */}
      <TransitionSeries.Sequence durationInFrames={5 * fps}>
        <ClosingScene
          candidateName={candidateName}
          callToAction="投下神聖的一票"
        />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
