
import React from 'react';
import { Label } from '@/components/ui/label';

export type CarouselStyle = 'default' | 'coverflow' | 'cube' | 'cards' | 'flip' | 'fade' | 'stack';

interface CarouselStyleSelectorProps {
  value: CarouselStyle;
  onChange: (value: CarouselStyle) => void;
}

const CarouselStyleSelector: React.FC<CarouselStyleSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <Label className="text-white text-lg font-medium">
        Estilo do Carrossel de Fotos
      </Label>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StyleOption 
          id="default"
          label="Padrão"
          description="Deslize simples"
          isSelected={value === 'default'}
          onClick={() => onChange('default')}
        />
        
        <StyleOption 
          id="coverflow"
          label="Coverflow"
          description="Efeito em perspectiva 3D"
          isSelected={value === 'coverflow'}
          onClick={() => onChange('coverflow')}
        />
        
        <StyleOption 
          id="cube"
          label="Cubo"
          description="Gira como um cubo 3D"
          isSelected={value === 'cube'}
          onClick={() => onChange('cube')}
        />
        
        <StyleOption 
          id="cards"
          label="Cards"
          description="Como um baralho"
          isSelected={value === 'cards'}
          onClick={() => onChange('cards')}
        />
        
        <StyleOption 
          id="flip"
          label="Flip"
          description="Como páginas virando"
          isSelected={value === 'flip'}
          onClick={() => onChange('flip')}
        />
        
        <StyleOption 
          id="fade"
          label="Fade"
          description="Desaparece suavemente"
          isSelected={value === 'fade'}
          onClick={() => onChange('fade')}
        />
        
        <StyleOption 
          id="stack"
          label="Stack"
          description="Empilhamento de imagens"
          isSelected={value === 'stack'}
          onClick={() => onChange('stack')}
        />
      </div>
    </div>
  );
};

interface StyleOptionProps {
  id: string;
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const StyleOption: React.FC<StyleOptionProps> = ({ 
  id, 
  label, 
  description, 
  isSelected, 
  onClick 
}) => {
  return (
    <div 
      className={`rounded-lg border p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'bg-love-red/20 border-love-red' 
          : 'bg-black/20 border-white/10 hover:border-white/30'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-white">{label}</h4>
          <p className="text-xs text-white/60 mt-1">{description}</p>
        </div>
        <div className={`w-4 h-4 rounded-full ${isSelected ? 'bg-love-red' : 'bg-white/20'}`} />
      </div>
    </div>
  );
};

export default CarouselStyleSelector;
