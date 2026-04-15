
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

type Plan = 'yearly' | 'lifetime';

interface PlanSelectorProps {
  selectedPlan: Plan;
  setSelectedPlan: (plan: Plan) => void;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({ selectedPlan, setSelectedPlan }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl text-white font-medium">Escolha seu plano</h3>
      <p className="text-white/70">
        Selecione o plano que melhor atende suas necessidades.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className={`p-6 cursor-pointer hover:border-love-red/50 transition-all ${
            selectedPlan === 'yearly' ? 'border-love-red bg-white/10' : 'bg-white/5 border-white/10'
          }`}
          onClick={() => setSelectedPlan('yearly')}
        >
          {selectedPlan === 'yearly' && (
            <div className="absolute -top-3 -right-3 bg-love-red rounded-full p-1">
              <Check size={16} />
            </div>
          )}
          
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
          </div>
        </Card>
        
        <Card 
          className={`p-6 cursor-pointer hover:border-love-red/50 transition-all ${
            selectedPlan === 'lifetime' ? 'border-love-red bg-white/10' : 'bg-white/5 border-white/10'
          }`}
          onClick={() => setSelectedPlan('lifetime')}
        >
          {selectedPlan === 'lifetime' && (
            <div className="absolute -top-3 -right-3 bg-love-red rounded-full p-1">
              <Check size={16} />
            </div>
          )}
          
          <div className="space-y-4">
            <h4 className="font-medium text-white flex items-center">
              Plano Vitalício
              <span className="ml-2 px-2 py-1 bg-love-red/20 text-love-red rounded-full text-xs">Recomendado</span>
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
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlanSelector;
