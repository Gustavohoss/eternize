// src/components/create-note/FloatingPlanButton.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface FloatingPlanButtonProps {
  onClick: () => void;
}

const FloatingPlanButton: React.FC<FloatingPlanButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-love-red/80 hover:bg-love-red text-white px-8 py-4
       text-lg font-medium shadow-lg backdrop-blur-md font-Poppins z-[9999]"
      size="lg"
    >
      <Crown className="mr-2" size={20} />
      Escolher Plano
    </Button>
  );
};

export default FloatingPlanButton;
