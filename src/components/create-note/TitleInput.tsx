
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => {
  return (
    <div>
      <Label htmlFor="title" className="text-white mb-2 block">
        Título da Mensagem <span className="text-love-red">*</span>
      </Label>
      <Input
        id="title"
        placeholder="Ex: Para o amor da minha vida"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white/5 border-white/10 text-white"
      />
      <p className="text-white/60 text-xs mt-1">
        Este título será exibido em destaque no topo da mensagem.
      </p>
    </div>
  );
};

export default TitleInput;

