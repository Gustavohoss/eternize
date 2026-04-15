import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmilePlus } from "lucide-react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  currentEmojis: string;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  currentEmojis,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emoji: any) => {
    onEmojiSelect(emoji.native);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-black/30 border-white/10 text-white hover:bg-white/10"
            >
              <SmilePlus size={16} />
              <span>Escolher Emojis</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 border-white/10 bg-black/80 backdrop-blur-lg w-[320px]"
            side="top"
          >
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="dark"
              set="native"
              previewPosition="none"
              skinTonePosition="none"
            />
          </PopoverContent>
        </Popover>
      </div>

      {currentEmojis && (
        <div className="bg-black/20 rounded p-3 border border-white/10 mb-4">
          <div className="flex flex-wrap gap-2">
            {Array.from(currentEmojis).map((emoji, index) => (
              <div
                key={`${emoji}-${index}`}
                className="text-2xl cursor-pointer hover:scale-110 transition-transform"
                onClick={() => {
                  // Remove o emoji do conjunto atual
                  const newEmojis = Array.from(currentEmojis)
                    .filter((_, i) => i !== index)
                    .join("");
                  onEmojiSelect(newEmojis);
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-xs text-white/60 mt-2">
            Clique em um emoji para removê-lo
          </p>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
