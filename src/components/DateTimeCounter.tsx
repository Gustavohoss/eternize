// src/components/DateTimeCounter.tsx
import React, { useState, useEffect } from "react";
import {
  format,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  differenceInSeconds,
} from "date-fns";
import { pt } from "date-fns/locale";
import { Calendar } from "lucide-react";

interface DateTimeCounterProps {
  startDate: string;
  counterColor?: string;
}

// Sub-componente para cada unidade de tempo
const TimeUnit: React.FC<{ value: number; label: string; color: string }> = ({
  value,
  label,
  color,
}) => {
  const glowStyle = {
    color: color,
    textShadow: `0 0 12px ${color}`,
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="w-full aspect-square rounded-lg backdrop-blur-md bg-white/5 flex items-center justify-center border transition-all"
        style={{ borderColor: color }}
      >
        <span className="text-2xl sm:text-3xl font-bold" style={glowStyle}>
          {value}
        </span>
      </div>
      {/* TEXTO AGORA COM A COR ESCOLHIDA */}
      <span
        className="text-sm mt-2 font-semibold"
        style={{ color: color, opacity: 0.8 }}
      >
        {label}
      </span>
    </div>
  );
};

const DateTimeCounter: React.FC<DateTimeCounterProps> = ({
  startDate,
  counterColor = "#ea384c",
}) => {
  const [timeElapsed, setTimeElapsed] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (!startDate) return;

    const updateCounter = () => {
      try {
        const dateObj = new Date(startDate);
        if (isNaN(dateObj.getTime())) return;

        const now = new Date();

        const years = differenceInYears(now, dateObj);
        const months = differenceInMonths(now, dateObj) % 12;
        const days = differenceInDays(now, dateObj) % 30;

        const totalSeconds = Math.floor(
          (now.getTime() - dateObj.getTime()) / 1000
        );
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const seconds = totalSeconds % 60;

        setTimeElapsed({ years, months, days, hours, minutes, seconds });
      } catch (e) {
        console.error("Error calculating time difference:", e);
      }
    };

    updateCounter();

    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  if (!startDate || !timeElapsed) {
    return null;
  }

  const dateGlowStyle = {
    color: counterColor,
    textShadow: `0 0 8px ${counterColor}`,
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Calendar style={{ color: counterColor }} size={16} />
        <span style={dateGlowStyle}>
          {format(new Date(startDate), "'Desde' d 'de' MMMM 'de' yyyy", {
            locale: pt,
          })}
        </span>
      </div>

      <div className="grid grid-cols-6 gap-2 sm:gap-3 w-full max-w-md">
        <TimeUnit value={timeElapsed.years} label="anos" color={counterColor} />
        <TimeUnit
          value={timeElapsed.months}
          label="meses"
          color={counterColor}
        />
        <TimeUnit value={timeElapsed.days} label="dias" color={counterColor} />
        <TimeUnit
          value={timeElapsed.hours}
          label="horas"
          color={counterColor}
        />
        <TimeUnit
          value={timeElapsed.minutes}
          label="min"
          color={counterColor}
        />
        <TimeUnit
          value={timeElapsed.seconds}
          label="seg"
          color={counterColor}
        />
      </div>
    </div>
  );
};

export default DateTimeCounter;
