// ARQUIVO: src/components/create-note/PlanSelectionModal.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

type Plan = "yearly" | "lifetime";

interface PlanSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: Plan) => void;
}

const PlanSelectionModal: React.FC<PlanSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-black/90 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-white text-center">
            Escolha seu Plano
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card
            className="p-6 cursor-pointer hover:border-love-red/50 transition-all bg-white/5 border-white/10 relative"
            onClick={() => onSelectPlan("yearly")} // Este botão envia 'yearly'
          >
            <div className="space-y-4">
              <h4 className="font-medium text-white">Plano Anual</h4>
              <div className="text-3xl font-bold text-white">
                R$17
                <span className="text-lg text-white/60 ml-1">/ ano</span>
              </div>

              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-white/80">
                  <Check size={16} className="text-love-red" />
                  <span>4 imagens no carrossel</span>
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Check size={16} className="text-love-red" />
                  <span>QR Code simples</span>
                </li>
                <li className="flex items-center gap-2 text-white/50 line-through">
                  <Check size={16} />
                  <span>Música do Spotify</span>
                </li>
                <li className="flex items-center gap-2 text-white/50 line-through">
                  <Check size={16} />
                  <span>Fundos animados</span>
                </li>
              </ul>

              <Button className="w-full bg-love-red hover:bg-love-red/90">
                Escolher Plano Anual
              </Button>
            </div>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:border-love-red/50 transition-all bg-white/5 border-white/10 relative"
            onClick={() => onSelectPlan("lifetime")} // Este botão envia 'lifetime'
          >
            <div className="absolute -top-3 -right-3 bg-love-red rounded-full px-3 py-1 text-xs text-white">
              Recomendado
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-white flex items-center">
                Plano Vitalício
              </h4>
              <div className="text-3xl font-bold text-white">
                R$27
                <span className="text-lg text-white/60 ml-1">/ único</span>
              </div>

              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-white/80">
                  <Check size={16} className="text-love-red" />
                  <span>8 imagens no carrossel</span>
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Check size={16} className="text-love-red" />
                  <span>Música do Spotify</span>
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Check size={16} className="text-love-red" />
                  <span>Fundos animados exclusivos</span>
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <Check size={16} className="text-love-red" />
                  <span>QR Code personalizado</span>
                </li>
              </ul>

              <Button className="w-full bg-love-red hover:bg-love-red/90">
                Escolher Plano Vitalício
              </Button>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanSelectionModal;
