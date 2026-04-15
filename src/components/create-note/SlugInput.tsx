// ARQUIVO: src/components/create-note/SlugInput.tsx

import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "../../integrations/supabase/client";

interface SlugInputProps {
  slug: string;
  setSlug: (slug: string) => void;
}

const SlugInput: React.FC<SlugInputProps> = ({ slug, setSlug }) => {
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [debouncedSlug, setDebouncedSlug] = useState(slug);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSlug(slug);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    const checkSlugAvailability = async () => {
      if (!debouncedSlug || debouncedSlug.length < 3) {
        setIsAvailable(null);
        return;
      }

      setIsChecking(true);
      try {
        const { data: noteData } = await supabase
          .from("love_notes")
          .select("slug")
          .eq("slug", debouncedSlug)
          .maybeSingle();

        if (noteData) {
          setIsAvailable(false);
        } else {
          setIsAvailable(true);
        }
      } catch (error) {
        console.error("Erro ao verificar disponibilidade do slug:", error);
        setIsAvailable(true);
      } finally {
        setIsChecking(false);
      }
    };

    if (debouncedSlug && debouncedSlug.length >= 3) {
      checkSlugAvailability();
    }
  }, [debouncedSlug]);

  // --- LÓGICA DE FORMATAÇÃO ESTÁ AQUI ---
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Converte espaços para hífens e remove caracteres inválidos
    const newSlug = inputValue
      .toLowerCase()
      .replace(/\s+/g, "-") // ESTA LINHA CONVERTE ESPAÇOS EM HÍFENS
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Atualiza o estado no componente pai
    setSlug(newSlug);
  };

  return (
    <div>
      <Label htmlFor="slug" className="text-white mb-2 block">
        Escolha um nome para seu link
      </Label>
      <div className="flex">
        <div className="bg-white/5 px-3 py-2 border-l border-y border-white/10 rounded-l-md text-white/60 flex items-center">
          eternize.shop/
        </div>
        <div className="relative flex-1">
          <Input
            id="slug"
            placeholder="seu-link-aqui"
            value={slug}
            onChange={handleSlugChange}
            className="bg-white/5 border-white/10 text-white rounded-l-none"
            minLength={3}
            autoComplete="off"
          />
          {debouncedSlug && debouncedSlug.length >= 3 && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {isChecking ? (
                <Loader2 className="h-4 w-4 text-white/60 animate-spin" />
              ) : isAvailable === true ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : isAvailable === false ? (
                <AlertCircle className="h-4 w-4 text-red-500" />
              ) : null}
            </div>
          )}
        </div>
      </div>
      <p className="text-white/60 text-xs mt-1">
        Este será o endereço para acessar sua mensagem. Use apenas letras,
        números e hífens. Mínimo 3 caracteres.
      </p>

      {slug && slug.length < 3 && (
        <p className="text-yellow-400 text-xs mt-1">
          O link deve ter pelo menos 3 caracteres.
        </p>
      )}

      {isAvailable === false && slug.length >= 3 && (
        <p className="text-red-400 text-xs mt-1">
          Este link já está sendo usado. Por favor escolha outro.
        </p>
      )}

      {isAvailable === true && slug.length >= 3 && (
        <p className="text-green-400 text-xs mt-1">Link disponível!</p>
      )}
    </div>
  );
};

export default SlugInput;
