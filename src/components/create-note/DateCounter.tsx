// src/components/create-note/DateCounter.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format, intervalToDuration } from "date-fns";
import { pt } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

interface DateCounterProps {
  specialDate: string;
  setSpecialDate: (date: string) => void;
  dateCounterColor: string;
  setDateCounterColor: (color: string) => void;
  showCounter?: boolean;
}

const DateCounter: React.FC<DateCounterProps> = ({
  specialDate,
  setSpecialDate,
  dateCounterColor,
  setDateCounterColor,
  showCounter = false,
}) => {
  const getTimeElapsed = () => {
    if (!specialDate) return null;

    try {
      const dateObj = new Date(specialDate);
      if (isNaN(dateObj.getTime())) return null;

      const now = new Date();
      const duration = intervalToDuration({ start: dateObj, end: now });

      return {
        years: duration.years || 0,
        months: duration.months || 0,
        days: duration.days || 0,
      };
    } catch (e) {
      console.error("Erro ao calcular tempo decorrido:", e);
      return null;
    }
  };

  const timeElapsed = getTimeElapsed();

  return (
    <div className="space-y-4 font-Poppins">
      <div>
        <Label htmlFor="specialDate" className="text-white mb-2 block">
          Data Especial
        </Label>
        <Input
          id="specialDate"
          type="date"
          value={specialDate}
          onChange={(e) => setSpecialDate(e.target.value)}
          className="bg-white/5 border-white/10 text-white"
        />
        <p className="text-white/60 text-xs mt-1">
          Por exemplo, o dia em que tudo começou.
        </p>
      </div>
      <div>
        <Label className="text-white mb-2 block">Cor do Contador</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full border border-white/20"
                  style={{ backgroundColor: dateCounterColor }}
                />
                <Palette className="mr-2 h-4 w-4" />
                Escolher cor
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border-none">
            <Input
              type="color"
              value={dateCounterColor}
              onChange={(e) => setDateCounterColor(e.target.value)}
              className="w-full h-16 p-1 bg-transparent border-none cursor-pointer"
            />
          </PopoverContent>
        </Popover>
      </div>
      {showCounter && specialDate && timeElapsed && (
        <div className="rounded-md bg-white/5 p-4 border border-white/10">
          <h4 className="text-white text-sm font-medium mb-2">Tempo juntos:</h4>
          <div className="flex gap-4 text-center">
            <div className="flex-1">
              <div
                className="text-2xl font-bold"
                style={{ color: dateCounterColor }}
              >
                {timeElapsed.years}
              </div>
              <div className="text-white/60 text-xs">anos</div>
            </div>
            <div className="flex-1">
              <div
                className="text-2xl font-bold"
                style={{ color: dateCounterColor }}
              >
                {timeElapsed.months}
              </div>
              <div className="text-white/60 text-xs">meses</div>
            </div>
            <div className="flex-1">
              <div
                className="text-2xl font-bold"
                style={{ color: dateCounterColor }}
              >
                {timeElapsed.days}
              </div>
              <div className="text-white/60 text-xs">dias</div>
            </div>
          </div>
          <p className="text-white/60 text-xs mt-2 text-center">
            {specialDate &&
              format(new Date(specialDate), "'Desde' d 'de' MMMM 'de' yyyy", {
                locale: pt,
              })}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateCounter;
