// NOVO ARQUIVO: src/components/create-note/EmailInput.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, setEmail }) => {
  return (
    <div className="space-y-2 text-center">
      <Label htmlFor="email" className="text-white text-lg font-medium">
        Seu Melhor E-mail <span className="text-love-red">*</span>
      </Label>
      <div className="relative max-w-sm mx-auto">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
        <Input
          id="email"
          type="email"
          placeholder="exemplo@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/5 border-white/10 text-white pl-10"
          required
        />
      </div>
      <p className="text-white/60 text-xs mt-1">
        Enviaremos o link da sua página e a confirmação da compra para este
        e-mail.
      </p>
    </div>
  );
};

export default EmailInput;
