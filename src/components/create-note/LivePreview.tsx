// ARQUIVO: src/components/create-note/LivePreview.tsx
import React from "react";
import BackgroundEffects from "../BackgroundEffects";
import ImageCarousel from "../ImageCarousel";
import MusicPlayer from "../MusicPlayer";
import DateTimeCounter from "../DateTimeCounter";
import { CarouselStyle } from "./CarouselStyleSelector";

type BackgroundEffectType =
  | "hearts"
  | "confetti"
  | "stars"
  | "sunset"
  | "rain"
  | "forest"
  | "none"
  | "aurora"
  | "vortex"
  | "starsAndComets";

interface LivePreviewProps {
  title: string;
  titleColor: string;
  imageUrls: string[];
  specialDate: string;
  message: string;
  messageColor: string;
  richMessage: string;
  backgroundEffect: BackgroundEffectType;
  backgroundColor?: string;
  customEmoji?: string;
  spotifyLink: string;
  dateCounterColor: string;
  carouselStyle: CarouselStyle;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  title,
  titleColor,
  imageUrls,
  specialDate,
  message,
  messageColor,
  richMessage,
  backgroundEffect,
  backgroundColor,
  customEmoji,
  spotifyLink,
  dateCounterColor,
  carouselStyle,
}) => {
  const finalRichMessage = richMessage || "";
  const finalMessage = message || "";

  // --- INÍCIO DA CORREÇÃO ---
  // Limpamos a mensagem, substituindo o código &nbsp; por um espaço normal.
  const cleanMessage = (finalRichMessage || finalMessage).replace(
    /&nbsp;/g,
    " "
  );
  const displayMessage = cleanMessage;
  // --- FIM DA CORREÇÃO ---

  const messageHasHtml = finalRichMessage.includes("<");
  const textShadowStyle = {
    textShadow: "1px 1px 5px rgba(0, 0, 0, 0.6)",
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center w-full">
        <h3 className="text-white text-lg font-medium mb-4">
          Pré-visualização
        </h3>
        <div
          className="w-full relative mx-auto"
          style={{ aspectRatio: "9 / 19.5" }}
        >
          <div className="absolute inset-0 bg-gray-900 rounded-[50px] p-2 shadow-2xl">
            <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-black">
              <div className="absolute inset-0 z-0">
                <BackgroundEffects
                  effect={backgroundEffect}
                  emoji={customEmoji}
                  backgroundColor={backgroundColor}
                  isPreview={true}
                />
              </div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-full z-30"></div>
              <div className="relative z-20 h-full overflow-y-auto overflow-x-hidden p-4 pt-12">
                <div className="flex flex-col justify-center items-center text-center min-h-full space-y-6">
                  {title && (
                    <h1
                      className="font-bold text-4xl tracking-wide px-2"
                      style={{
                        fontFamily: "serif",
                        color: titleColor || "#ffffff",
                        wordWrap: "break-word",
                        ...textShadowStyle,
                      }}
                    >
                      {title}
                    </h1>
                  )}
                  {imageUrls && imageUrls.length > 0 && (
                    <ImageCarousel
                      images={imageUrls}
                      style={carouselStyle}
                      className="w-full"
                    />
                  )}
                  {displayMessage && (
                    <div
                      className="text-base px-2 w-full"
                      style={{
                        fontFamily: "serif",
                        ...textShadowStyle,
                        color: "white",
                      }}
                    >
                      {messageHasHtml ? (
                        <div
                          className="prose prose-sm prose-invert"
                          dangerouslySetInnerHTML={{ __html: displayMessage }}
                        />
                      ) : (
                        <div style={{ color: messageColor }}>
                          {displayMessage}
                        </div>
                      )}
                    </div>
                  )}
                  {spotifyLink && (
                    <div className="w-full pt-4">
                      <MusicPlayer spotifyLink={spotifyLink} />
                    </div>
                  )}
                  {specialDate && (
                    <div className="pt-4">
                      <DateTimeCounter
                        startDate={specialDate}
                        counterColor={dateCounterColor}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
