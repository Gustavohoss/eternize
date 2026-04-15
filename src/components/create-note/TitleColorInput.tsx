// src/components/create-note/TitleColorInput.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

interface TitleColorInputProps {
  titleColor: string;
  setTitleColor: (color: string) => void;
}

const TitleColorInput: React.FC<TitleColorInputProps> = ({
  titleColor,
  setTitleColor,
}) => {
  const suggestedColors = [
    {
      value: "#FF0000",
      label: "Vermelho Intenso",
      className: "border-red-500 text-red-500",
    },
    {
      value: "#FF1493",
      label: "Rosa Vibrante",
      className: "border-pink-500 text-pink-500",
    },
    {
      value: "#FFD700",
      label: "Dourado",
      className: "border-yellow-400 text-yellow-400",
    },
    { value: "#ffffff", label: "Branco", className: "border-white text-white" },
  ];

  return (
    <div>
      <Label htmlFor="titleColor" className="text-white mb-2 block text-sm">
        Cor do Título
      </Label>

      <div className="flex flex-col space-y-4">
        <RadioGroup
          value={titleColor}
          onValueChange={setTitleColor}
          className="flex flex-wrap gap-4"
        >
          {suggestedColors.map((color) => (
            <div key={color.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={color.value}
                id={`title-color-${color.label}`}
                className={color.className}
              />
              <Label
                htmlFor={`title-color-${color.label}`}
                className={color.className}
              >
                {color.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Palette className="h-4 w-4 mr-2" />
                Escolher outra cor
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-none">
              <Input
                type="color"
                value={titleColor}
                onChange={(e) => setTitleColor(e.target.value)}
                className="w-full h-10 p-1 bg-transparent border-none cursor-pointer"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <p className="text-white/60 text-xs mt-2">
        Esta cor será aplicada ao título principal da sua mensagem.
      </p>
    </div>
  );
};

export default TitleColorInput;
