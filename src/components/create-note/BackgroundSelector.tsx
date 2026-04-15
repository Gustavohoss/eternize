// src/components/create-note/BackgroundSelector.tsx
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Stars,
  Sparkles,
  CloudSun,
  Cloud,
  Droplets,
  SunMoon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
// CAMINHO DE IMPORTAÇÃO CORRIGIDO AQUI
import EmojiPicker from "@/components/create-note/EmojiPicker";

interface BackgroundSelectorProps {
  backgroundEffect: string;
  setBackgroundEffect: (effect: string) => void;
  customEmoji: string;
  setCustomEmoji: (emoji: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  backgroundEffect,
  setBackgroundEffect,
  customEmoji,
  setCustomEmoji,
  backgroundColor,
  setBackgroundColor,
}) => {
  const [selectedTab, setSelectedTab] = useState(
    backgroundColor ? "color" : customEmoji ? "emoji" : "effect"
  );

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className="space-y-4">
      <Label className="text-white text-lg font-medium">Plano de Fundo</Label>

      <Tabs
        value={selectedTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4 bg-black/20">
          <TabsTrigger value="effect">Efeitos</TabsTrigger>
          <TabsTrigger value="emoji">Emojis</TabsTrigger>
          <TabsTrigger value="color">Cor Sólida</TabsTrigger>
        </TabsList>

        <TabsContent value="effect" className="mt-0 space-y-4">
          <RadioGroup
            value={backgroundEffect}
            onValueChange={setBackgroundEffect}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            <div>
              <RadioGroupItem
                value="none"
                id="effect-none"
                className="peer sr-only"
              />
              <Label
                htmlFor="effect-none"
                className={cn(
                  "flex flex-col items-center justify-center border border-white/10 rounded-md p-4 hover:bg-white/5 cursor-pointer transition-colors",
                  backgroundEffect === "none"
                    ? "bg-white/10 border-white/30"
                    : "bg-black/30"
                )}
              >
                <div className="w-8 h-8 flex items-center justify-center text-white">
                  <div className="w-4 h-4 rounded-full border border-white/30" />
                </div>
                <span className="mt-2 text-white text-sm">Nenhum</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="hearts"
                id="effect-hearts"
                className="peer sr-only"
              />
              <Label
                htmlFor="effect-hearts"
                className={cn(
                  "flex flex-col items-center justify-center border border-white/10 rounded-md p-4 hover:bg-white/5 cursor-pointer transition-colors",
                  backgroundEffect === "hearts"
                    ? "bg-white/10 border-white/30"
                    : "bg-black/30"
                )}
              >
                <Heart className="w-8 h-8 text-love-red" />
                <span className="mt-2 text-white text-sm">Corações</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="confetti"
                id="effect-confetti"
                className="peer sr-only"
              />
              <Label
                htmlFor="effect-confetti"
                className={cn(
                  "flex flex-col items-center justify-center border border-white/10 rounded-md p-4 hover:bg-white/5 cursor-pointer transition-colors",
                  backgroundEffect === "confetti"
                    ? "bg-white/10 border-white/30"
                    : "bg-black/30"
                )}
              >
                <Sparkles className="w-8 h-8 text-love-pink" />
                <span className="mt-2 text-white text-sm">Confete</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="stars"
                id="effect-stars"
                className="peer sr-only"
              />
              <Label
                htmlFor="effect-stars"
                className={cn(
                  "flex flex-col items-center justify-center border border-white/10 rounded-md p-4 hover:bg-white/5 cursor-pointer transition-colors",
                  backgroundEffect === "stars"
                    ? "bg-white/10 border-white/30"
                    : "bg-black/30"
                )}
              >
                <Stars className="w-8 h-8 text-white" />
                <span className="mt-2 text-white text-sm">Estrelas</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="sunset"
                id="effect-sunset"
                className="peer sr-only"
              />
              <Label
                htmlFor="effect-sunset"
                className={cn(
                  "flex flex-col items-center justify-center border border-white/10 rounded-md p-4 hover:bg-white/5 cursor-pointer transition-colors",
                  backgroundEffect === "sunset"
                    ? "bg-white/10 border-white/30"
                    : "bg-black/30"
                )}
              >
                <CloudSun className="w-8 h-8 text-amber-500" />
                <span className="mt-2 text-white text-sm">Pôr do Sol</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem
                value="rain"
                id="effect-rain"
                className="peer sr-only"
              />
              <Label
                htmlFor="effect-rain"
                className={cn(
                  "flex flex-col items-center justify-center border border-white/10 rounded-md p-4 hover:bg-white/5 cursor-pointer transition-colors",
                  backgroundEffect === "rain"
                    ? "bg-white/10 border-white/30"
                    : "bg-black/30"
                )}
              >
                <Droplets className="w-8 h-8 text-blue-300" />
                <span className="mt-2 text-white text-sm">Chuva</span>
              </Label>
            </div>
          </RadioGroup>
        </TabsContent>

        <TabsContent value="emoji" className="mt-0 space-y-4">
          <div>
            <p className="text-white/70 text-sm mb-4">
              Escolha emojis que cairão pelo fundo da sua mensagem
            </p>

            <EmojiPicker
              onEmojiSelect={setCustomEmoji}
              currentEmojis={customEmoji}
            />
          </div>
        </TabsContent>

        <TabsContent value="color" className="mt-0 space-y-4">
          <div>
            <p className="text-white/70 text-sm mb-4">
              Escolha uma cor sólida para o fundo da sua mensagem
            </p>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                "#1f1f1f",
                "#2e026d",
                "#0f766e",
                "#7e22ce",
                "#831843",
                "#b91c1c",
                "#0284c7",
                "#15803d",
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => setBackgroundColor(color)}
                  className={cn(
                    "w-full h-12 rounded-md transition-all hover:scale-105",
                    backgroundColor === color
                      ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                      : ""
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div className="flex gap-2 items-center">
              <Input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-12 h-10 p-1 bg-transparent border border-white/20 cursor-pointer"
              />
              <Input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="bg-black/40 border-white/10 text-white"
                placeholder="#000000"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundSelector;
